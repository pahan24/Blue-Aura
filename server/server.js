/**
 * BLUE AURA BACKEND SERVER - EXPRESS + NODEMAILER + PDFKIT
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');

// Load environmental variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Sim (JSON storage file)
const ORDERS_DB_PATH = path.join(__dirname, 'orders.json');
if (!fs.existsSync(ORDERS_DB_PATH)) {
  fs.writeFileSync(ORDERS_DB_PATH, JSON.stringify([]));
}

// Database Integration: Supabase Cloud Database option
let supabase = null;
if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    console.log('[Database System] Supabase client initialized successfully.');
  } catch (err) {
    console.error('[Database System] Failed to load Supabase module:', err.message);
  }
} else {
  console.log('[Database System] Running with local JSON database fallback.');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Save order endpoint
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const orders = JSON.parse(fs.readFileSync(ORDERS_DB_PATH, 'utf8'));
    
    // Check if order already exists to update or insert
    const idx = orders.findIndex(o => o.id === orderData.id);
    if (idx > -1) {
      orders[idx] = orderData;
    } else {
      orders.unshift(orderData);
    }
    
    fs.writeFileSync(ORDERS_DB_PATH, JSON.stringify(orders, null, 2));

    // Supabase Cloud Sync
    if (supabase) {
      const { error } = await supabase
        .from('orders')
        .upsert({
          id: orderData.id,
          customer_name: orderData.customerName,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.address,
          payment_method: orderData.paymentMethod,
          items: orderData.items, // JSONB
          subtotal: orderData.subtotal,
          shipping_fee: orderData.shippingFee,
          discount: orderData.discount,
          promo_code_used: orderData.promoCodeUsed,
          total: orderData.total,
          status: orderData.status,
          tracking_number: orderData.trackingNumber,
          created_at: orderData.date
        });
      
      if (error) {
        console.error('[Supabase Sync Error]', error.message);
      } else {
        console.log(`[Supabase Sync] Order ${orderData.id} synced successfully.`);
      }
    }

    res.status(200).json({ success: true, message: 'Order successfully saved to database.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all orders endpoint
app.get('/api/orders', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Convert database columns back to camelCase frontend schema
      const formatted = data.map(o => ({
        id: o.id,
        customerName: o.customer_name,
        email: o.email,
        phone: o.phone,
        address: o.address,
        paymentMethod: o.payment_method,
        items: o.items,
        subtotal: o.subtotal,
        shippingFee: o.shipping_fee,
        discount: o.discount,
        promoCodeUsed: o.promo_code_used,
        total: o.total,
        status: o.status,
        trackingNumber: o.tracking_number,
        date: o.created_at
      }));
      return res.status(200).json(formatted);
    } else {
      const orders = JSON.parse(fs.readFileSync(ORDERS_DB_PATH, 'utf8'));
      return res.status(200).json(orders);
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete order endpoint
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    let orders = JSON.parse(fs.readFileSync(ORDERS_DB_PATH, 'utf8'));
    const initialLength = orders.length;
    orders = orders.filter(o => o.id !== orderId);
    
    fs.writeFileSync(ORDERS_DB_PATH, JSON.stringify(orders, null, 2));

    // Supabase Cloud Sync
    if (supabase) {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);
      
      if (error) {
        console.error('[Supabase Sync Error]', error.message);
      } else {
        console.log(`[Supabase Sync] Order ${orderId} deleted from cloud.`);
      }
    }

    if (orders.length < initialLength) {
      res.status(200).json({ success: true, message: `Order ${orderId} successfully deleted.` });
    } else {
      res.status(404).json({ success: false, message: `Order ${orderId} not found.` });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Live SMTP Email dispatch endpoint
app.post('/api/email/send', async (req, res) => {
  const { to, subject, actionType, order } = req.body;

  // Retrieve SMTP credentials from environment
  const smtpUser = process.env.SMTP_EMAIL || 'smtp.blueaura.auth@gmail.com';
  const smtpPass = process.env.SMTP_PASSWORD || 'your-gmail-app-password';

  // Setup Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  // Verify connection config
  transporter.verify(function(error, success) {
    if (error) {
      console.log('SMTP verification failed. Running in log mode:', error.message);
    } else {
      console.log('SMTP server is ready to deliver messages.');
    }
  });

  try {
    // Generate Invoice HTML template
    const emailHtml = buildEmailTemplate(order, actionType);

    // Setup attachments array
    const attachments = [];

    // Generate PDF invoice on the fly if action is 'confirmed'
    if (actionType === 'confirmed') {
      const pdfBuffer = await generateInvoicePDFBuffer(order);
      attachments.push({
        filename: `Invoice_${order.id}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      });
    }

    const mailOptions = {
      from: `"Blue Aura Care" <${smtpUser}>`,
      to: to,
      subject: subject,
      html: emailHtml,
      attachments: attachments
    };

    // Dispatch email
    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP System] Mail delivered: ${info.messageId}`);
    res.status(200).json({ success: true, messageId: info.messageId });

  } catch (err) {
    console.error('[SMTP Error] Failed sending live email:', err.message);
    // Return mock success to client to prevent crashing if credentials are not configured yet
    res.status(200).json({ 
      success: false, 
      warning: 'Live SMTP credentials not configured. Email logged successfully.',
      error: err.message 
    });
  }
});

// Helper: Format price currency
function formatPrice(num) {
  return "Rs. " + parseFloat(num).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// PDF Invoice Generator
function generateInvoicePDFBuffer(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];

    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    // Design Header Banner
    doc.fillColor('#0d0d0d').rect(0, 0, 612, 100).fill();

    doc.fillColor('#8db9ff')
       .fontSize(24)
       .font('Helvetica-Bold')
       .text('BLUE AURA', 50, 40);

    doc.fillColor('#a0aec0')
       .fontSize(10)
       .font('Helvetica')
       .text('PREMIUM CLOTHING BRAND', 195, 43);

    doc.fillColor('#ffffff')
       .fontSize(14)
       .text('ORDER INVOICE', 430, 40);

    // Metadata details
    doc.fillColor('#333333').fontSize(10);
    doc.text(`Invoice ID: INV-${order.id}`, 50, 130);
    doc.text(`Date: ${new Date(order.date).toLocaleDateString()}`, 50, 145);
    doc.text(`Payment method: ${order.paymentMethod}`, 50, 160);
    
    // Highlight order status
    doc.fillColor('#22c55e').font('Helvetica-Bold');
    doc.text('ORDER STATUS: CONFIRMED', 50, 175);
    doc.fillColor('#333333').font('Helvetica');

    doc.text('Billed To:', 350, 130);
    doc.font('Helvetica-Bold').text(order.customerName, 350, 145);
    doc.font('Helvetica').text(order.address, 350, 160, { width: 200 });
    doc.text(`Phone: ${order.phone}`, 350, 200);

    // Table header grid
    const tableTop = 240;
    doc.fillColor('#f8fafc').rect(50, tableTop, 512, 20).fill();
    doc.fillColor('#0f172a').font('Helvetica-Bold');
    doc.text('Description', 60, tableTop + 6);
    doc.text('Qty', 330, tableTop + 6);
    doc.text('Unit Price', 380, tableTop + 6);
    doc.text('Amount', 480, tableTop + 6);

    doc.moveTo(50, tableTop + 20).lineTo(562, tableTop + 20).strokeColor('#e2e8f0').stroke();
    doc.font('Helvetica');

    let y = tableTop + 30;
    order.items.forEach(item => {
      // In a real database, query product titles, or fallback
      const desc = `Garment item (Size: ${item.size} / Color: ${item.color})`;
      
      doc.text(desc, 60, y, { width: 250 });
      doc.text(item.quantity.toString(), 330, y);
      doc.text(formatPrice(order.subtotal / item.quantity), 380, y); // mock unit price
      doc.text(formatPrice((order.subtotal / item.quantity) * item.quantity), 480, y);
      
      y += 20;
    });

    doc.moveTo(50, y - 5).lineTo(562, y - 5).strokeColor('#cbd5e1').stroke();

    // Sum details
    const totX = 350;
    doc.text('Subtotal:', totX, y);
    doc.text(formatPrice(order.subtotal), 480, y);

    doc.text('Courier shipping fee:', totX, y + 15);
    doc.text(formatPrice(order.shippingFee), 480, y + 15);

    if (order.discount > 0) {
      doc.fillColor('#ef4444');
      doc.text(`Discount (${order.promoCodeUsed || 'PROMO'}):`, totX, y + 30);
      doc.text(`-${formatPrice(order.discount)}`, 480, y + 30);
      doc.fillColor('#333333');
    }

    const finalY = order.discount > 0 ? y + 45 : y + 30;
    doc.font('Helvetica-Bold');
    doc.text('Grand Total:', totX, finalY);
    doc.text(formatPrice(order.total), 480, finalY);

    // Footer lines
    doc.font('Helvetica-Oblique').fontSize(8).fillColor('#a0aec0');
    doc.text('Thank you for shopping at Blue Aura Clothing. This document serves as an official transaction record.', 50, 720);

    doc.end();
  });
}

// Formatted Email Templates
function buildEmailTemplate(order, actionType) {
  let headline = "";
  let bodyText = "";

  if (actionType === "login") {
    headline = "New Account Login Detected";
    bodyText = `We detected a successful login to your Blue Aura account (${order.email}) on ${new Date().toLocaleString()}. If this was you, no action is required. If you do not recognize this activity, please change your password or contact our support team immediately.`;

    return `
      <div style="font-family:sans-serif; max-width:600px; margin:0 auto; border:1px solid #e2e8f0; padding:30px; border-radius:4px; color:#0f172a;">
        <div style="text-align:center; border-bottom:1px solid #f1f5f9; padding-bottom:20px; margin-bottom:25px;">
          <h2 style="text-transform:uppercase; letter-spacing:1px; margin:0; font-size:24px; color:#0d0d0d;">BLUE AURA</h2>
          <span style="font-size:10px; color:#64748b; letter-spacing:1.5px; text-transform:uppercase;">Clean Luxury Clothing</span>
        </div>
        
        <h3 style="font-size:18px; margin-bottom:15px; color:#0d0d0d;">${headline}</h3>
        <p style="font-size:14px; line-height:1.6; color:#475569; margin-bottom:25px;">
          Dear ${order.customerName},<br><br>
          ${bodyText}
        </p>
        
        <div style="background-color:#f8fafc; padding:20px; border-radius:4px; margin-bottom:25px;">
          <h4 style="margin:0 0 10px 0; font-size:13px; text-transform:uppercase; color:#0f172a;">Session Properties</h4>
          <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">Logged Account: <strong>${order.email}</strong></p>
          <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">IP Address: 127.0.0.1 (Local Host)</p>
          <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">Status: Successful Handshake</p>
        </div>
        
        <div style="text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #f1f5f9; padding-top:20px; margin-top:30px;">
          Need support? Contact us at care@blue-aura-fashion.com or chat on WhatsApp +94 77 123 4567.<br>
          Colombo, Sri Lanka.
        </div>
      </div>
    `;
  }

  if (actionType === "placed") {
    headline = "Thank You For Your Order!";
    bodyText = "We have received your order details and are preparing it for verification. Below are your order details. You will receive an invoice as soon as the order is officially confirmed by our admin team.";
  } else if (actionType === "confirmed") {
    headline = "Your Order is Confirmed!";
    bodyText = "We have verified your details and payment. Attached you will find your official transactional PDF Invoice. Our warehouse team is currently packaging your items.";
  } else if (actionType === "shipped") {
    headline = "Your Order has Shipped!";
    bodyText = `Great news! Your package has been handed over to our courier partner. You can track your shipment using tracking code: <strong>${order.trackingNumber}</strong> on our tracking portal.`;
  } else if (actionType === "delivered") {
    headline = "Order Delivered!";
    bodyText = `Your package for Order ID ${order.id} has been delivered and signed off. We hope you love your new premium garments! Tell us about your experience on Instagram by tagging @BlueAura.`;
  } else if (actionType === "cancelled") {
    headline = "Order Cancellation Notification";
    bodyText = "This email is to notify you that your order has been cancelled in our system. Any payment holds will be released within 5 business days. Please contact customer support if you need further details.";
  }

  return `
    <div style="font-family:sans-serif; max-width:600px; margin:0 auto; border:1px solid #e2e8f0; padding:30px; border-radius:4px; color:#0f172a;">
      <div style="text-align:center; border-bottom:1px solid #f1f5f9; padding-bottom:20px; margin-bottom:25px;">
        <h2 style="text-transform:uppercase; letter-spacing:1px; margin:0; font-size:24px; color:#0d0d0d;">BLUE AURA</h2>
        <span style="font-size:10px; color:#64748b; letter-spacing:1.5px; text-transform:uppercase;">Clean Luxury Clothing</span>
      </div>
      
      <h3 style="font-size:18px; margin-bottom:15px; color:#0d0d0d;">${headline}</h3>
      <p style="font-size:14px; line-height:1.6; color:#475569; margin-bottom:25px;">
        Dear ${order.customerName},<br><br>
        ${bodyText}
      </p>
      
      <div style="background-color:#f8fafc; padding:20px; border-radius:4px; margin-bottom:25px;">
        <h4 style="margin:0 0 10px 0; font-size:13px; text-transform:uppercase; color:#0f172a;">Order Summary</h4>
        <p style="margin:0 0 5px 0; font-size:12px; color:#64748b;">Order ID: <strong>${order.id}</strong></p>
        <p style="margin:0 0 15px 0; font-size:12px; color:#64748b;">Date: ${new Date(order.date).toLocaleDateString()}</p>
        
        <div style="border-top:1px solid #cbd5e1; margin-top:10px; padding-top:10px; text-align:right; font-size:12px; color:#475569;">
          Subtotal: ${formatPrice(order.subtotal)}<br>
          Courier shipping: ${formatPrice(order.shippingFee)}<br>
          ${order.discount > 0 ? `Discount: -${formatPrice(order.discount)}<br>` : ''}
          <strong style="font-size:14px; color:#0f172a;">Grand Total: ${formatPrice(order.total)}</strong>
        </div>
      </div>
      
      <div style="text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #f1f5f9; padding-top:20px; margin-top:30px;">
        Need support? Contact us at care@blue-aura-fashion.com or chat on WhatsApp +94 77 123 4567.<br>
        Colombo, Sri Lanka.
      </div>
    </div>
  `;
}

// Start Server
app.listen(PORT, () => {
  console.log(`Blue Aura backend server listening on http://localhost:${PORT}`);
});
