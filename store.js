/* ═══════════════════════════════════════════════════════════
   BLUE AURA STORE ENGINE v3.1
   All functions attached to window — safe across all pages
═══════════════════════════════════════════════════════════ */

/* ── CONFIG ── */
var CFG = {
  emailjs: {
    publicKey:       'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId:       'service_blueaura_gmail',
    tplContact:      'template_ba_contact',
    tplOrderConfirm: 'template_ba_order',
    tplShipping:     'template_ba_shipped',
    tplWelcome:      'template_ba_welcome',
  },
  google: {
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  },
  store: {
    name:             'Blue Aura',
    currency:         'LKR',
    freeShippingMin:  5000,
    defaultShipping:  350,
    expressShipping:  800,
    whatsapp:         '94777123456',
    email:            'hello@blueaura.lk',
    phone:            '+94 777 123 456',
    address:          '123 Fashion Street, Colombo 03, Sri Lanka',
    adminPass:        'blueaura2025',
  }
};

/* ── PRODUCTS DATA ── */
var PRODUCTS = [
  /* WOMEN */
  {id:1,name:'Silk Flow Midi Dress',slug:'silk-flow-midi-dress',cat:'women',type:'dress',
   price:8900,comparePrice:12900,shippingFee:0,stock:12,isNew:true,isBest:true,isSale:false,rating:4.8,reviews:48,
   material:'100% Pure Silk',
   desc:'A beautifully flowing midi dress crafted from the finest pure silk. The gentle drape and soft sheen create an effortlessly elegant silhouette perfect for any occasion.',
   care:'Dry clean recommended. Store in breathable garment bag.',
   sizes:['XS','S','M','L','XL'],
   colors:[
     {hex:'#F5E6D3',name:'Champagne',imgs:['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85','https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85','https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85','https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=85','https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=85','https://images.unsplash.com/photo-1566479179817-d5d5d8b04f4c?w=800&q=85','https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85']},
     {hex:'#8DB9FF',name:'Sky Blue',imgs:['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=85','https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85','https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&q=85','https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85']},
   ]},
  {id:2,name:'Linen Wide-Leg Trousers',slug:'linen-trousers',cat:'women',type:'pants',
   price:6500,comparePrice:9500,shippingFee:350,stock:8,isNew:true,isBest:false,isSale:false,rating:4.6,reviews:32,
   material:'100% Premium Linen',
   desc:'Elegant wide-leg trousers in breathable linen. A perfect blend of comfort and sophistication for everyday luxury.',
   care:'Machine wash 30°C. Iron on medium heat.',
   sizes:['XS','S','M','L','XL','XXL'],
   colors:[
     {hex:'#FFFFFF',name:'White',imgs:['https://images.unsplash.com/photo-1594938298603-c8148c4b4a8e?w=800&q=85','https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=800&q=85','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85','https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85']},
     {hex:'#C4B9A8',name:'Sand',imgs:['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85','https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=85','https://images.unsplash.com/photo-1594938298603-c8148c4b4a8e?w=800&q=85','https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=800&q=85']},
     {hex:'#2C3E50',name:'Navy',imgs:['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85','https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&q=85','https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85','https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=85']},
   ]},
  {id:3,name:'Oversized Cashmere Blazer',slug:'cashmere-blazer',cat:'women',type:'jacket',
   price:15900,comparePrice:22000,shippingFee:0,stock:5,isNew:false,isBest:true,isSale:false,rating:4.9,reviews:61,
   material:'90% Cashmere, 10% Silk',
   desc:'A statement piece in pure cashmere. Oversized fit with structured shoulders for an effortlessly chic look that elevates any outfit.',
   care:'Dry clean only. Store folded to maintain shape.',
   sizes:['S','M','L','XL'],
   colors:[
     {hex:'#ECECEC',name:'Ivory',imgs:['https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&q=85','https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85','https://images.unsplash.com/photo-1594938298603-c8148c4b4a8e?w=800&q=85','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=85','https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=85','https://images.unsplash.com/photo-1566479179817-d5d5d8b04f4c?w=800&q=85','https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85']},
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=85','https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85','https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&q=85','https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85']},
   ]},
  {id:4,name:'Modal Wrap Blouse',slug:'modal-wrap-blouse',cat:'women',type:'shirt',
   price:4200,comparePrice:null,shippingFee:350,stock:20,isNew:true,isBest:false,isSale:false,rating:4.5,reviews:29,
   material:'100% Modal',
   desc:'Ultra-soft modal wrap blouse that flatters every silhouette. The adjustable wrap tie lets you customize the fit perfectly.',
   care:'Machine wash cold. Hang dry.',
   sizes:['XS','S','M','L','XL'],
   colors:[
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=85','https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85','https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85','https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&q=85']},
     {hex:'#FFFFFF',name:'White',imgs:['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85','https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85','https://images.unsplash.com/photo-1594938298603-c8148c4b4a8e?w=800&q=85','https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=85']},
     {hex:'#F4A6A6',name:'Rose',imgs:['https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=85','https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85','https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85']},
   ]},
  {id:5,name:'Satin Slip Dress',slug:'satin-slip-dress',cat:'women',type:'dress',
   price:5900,comparePrice:14500,shippingFee:0,stock:6,isNew:false,isBest:false,isSale:true,rating:4.8,reviews:22,
   material:'100% Satin',
   desc:'Luxurious satin slip dress with adjustable straps. Versatile enough for day or night.',
   care:'Dry clean recommended. Handle with care.',
   sizes:['XS','S','M','L'],
   colors:[
     {hex:'#F5E6D3',name:'Champagne',imgs:['https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=85','https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85','https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=85','https://images.unsplash.com/photo-1566479179817-d5d5d8b04f4c?w=800&q=85','https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=85','https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85']},
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=85','https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=85','https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&q=85','https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=85']},
   ]},
  /* MEN */
  {id:6,name:'Oxford Slim-Fit Shirt',slug:'oxford-shirt',cat:'men',type:'shirt',
   price:5800,comparePrice:7500,shippingFee:350,stock:18,isNew:true,isBest:true,isSale:false,rating:4.7,reviews:55,
   material:'100% Egyptian Cotton',
   desc:'The perfect everyday shirt, tailored in premium Egyptian cotton. Slim fit that moves with you from boardroom to weekend.',
   care:'Machine wash 40°C. Iron on high heat while damp.',
   sizes:['S','M','L','XL','XXL'],
   colors:[
     {hex:'#FFFFFF',name:'White',imgs:['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85','https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1594938374182-a55b0a58d40c?w=800&q=85','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85']},
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85','https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85','https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85','https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85']},
   ]},
  {id:7,name:'Technical Jogger Pants',slug:'technical-jogger',cat:'men',type:'pants',
   price:7200,comparePrice:null,shippingFee:350,stock:14,isNew:false,isBest:true,isSale:false,rating:4.6,reviews:41,
   material:'80% Cotton, 20% Polyester',
   desc:'Performance meets style. Technical joggers with tapered fit and moisture-wicking fabric for all-day comfort.',
   care:'Machine wash 30°C. Tumble dry low.',
   sizes:['S','M','L','XL','XXL'],
   colors:[
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85','https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=85','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85','https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=85']},
     {hex:'#888888',name:'Grey',imgs:['https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=85','https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85','https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85']},
     {hex:'#2C3E50',name:'Navy',imgs:['https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85']},
   ]},
  {id:8,name:'Premium Denim Jacket',slug:'denim-jacket',cat:'men',type:'jacket',
   price:11500,comparePrice:15000,shippingFee:0,stock:7,isNew:false,isBest:true,isSale:false,rating:4.8,reviews:73,
   material:'100% Selvedge Denim',
   desc:'Classic selvedge denim jacket with a modern silhouette. Built to last and only get better with time.',
   care:'Machine wash cold. Do not tumble dry. Air dry only.',
   sizes:['S','M','L','XL','XXL'],
   colors:[
     {hex:'#5A7FA8',name:'Mid Blue',imgs:['https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=85','https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85','https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85','https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85','https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=85']},
     {hex:'#ECECEC',name:'Light Wash',imgs:['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85','https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85','https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85']},
   ]},
  {id:9,name:'Essential Crew Tee',slug:'crew-tee',cat:'men',type:'tshirt',
   price:2800,comparePrice:3500,shippingFee:350,stock:50,isNew:false,isBest:true,isSale:false,rating:4.4,reviews:112,
   material:'180gsm Combed Cotton',
   desc:'The ultimate essential tee. 180gsm combed cotton stays soft wash after wash. Relaxed fit, universally flattering.',
   care:'Machine wash 30°C. Tumble dry low.',
   sizes:['XS','S','M','L','XL','XXL'],
   colors:[
     {hex:'#FFFFFF',name:'White',imgs:['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85','https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=85','https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85']},
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85','https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85']},
     {hex:'#888888',name:'Grey',imgs:['https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=85','https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85','https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=85']},
   ]},
  {id:10,name:'Classic Polo Shirt',slug:'polo-shirt',cat:'men',type:'shirt',
   price:3500,comparePrice:5500,shippingFee:350,stock:35,isNew:false,isBest:false,isSale:true,rating:4.5,reviews:52,
   material:'Pique Cotton',
   desc:'A timeless polo in breathable pique cotton. Clean collar, subtle branding — a wardrobe essential.',
   care:'Machine wash 40°C. Iron on medium.',
   sizes:['S','M','L','XL','XXL'],
   colors:[
     {hex:'#FFFFFF',name:'White',imgs:['https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85','https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=85','https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85']},
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=85','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=85','https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85','https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=85']},
   ]},
  /* UNISEX */
  {id:11,name:'Aura Zip Hoodie',slug:'aura-zip-hoodie',cat:'unisex',type:'hoodie',
   price:9500,comparePrice:13000,shippingFee:0,stock:22,isNew:true,isBest:true,isSale:false,rating:4.9,reviews:89,
   material:'Brushed Fleece 320gsm',
   desc:'Heavyweight brushed fleece zip hoodie with iconic Blue Aura tone-on-tone embroidery. Premium YKK zipper and kangaroo pocket.',
   care:'Machine wash 30°C. Do not tumble dry.',
   sizes:['XS','S','M','L','XL','XXL'],
   colors:[
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85','https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85','https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85']},
     {hex:'#ECECEC',name:'Ivory',imgs:['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85','https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85','https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85','https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85']},
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85','https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85','https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85']},
   ]},
  {id:12,name:'Organic Cotton Hoodie',slug:'organic-hoodie',cat:'unisex',type:'hoodie',
   price:7800,comparePrice:null,shippingFee:350,stock:30,isNew:true,isBest:false,isSale:false,rating:4.7,reviews:44,
   material:'100% Organic Cotton',
   desc:'Sustainably sourced GOTS certified organic cotton hoodie. Soft, responsible, and infinitely stylish.',
   care:'Machine wash 30°C cold. Hang dry.',
   sizes:['XS','S','M','L','XL','XXL'],
   colors:[
     {hex:'#F5E6D3',name:'Sand',imgs:['https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85','https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85','https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85']},
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85','https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=85','https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85','https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85','https://images.unsplash.com/photo-1584464491033-06828f3a6b7b?w=800&q=85']},
     {hex:'#888888',name:'Grey',imgs:['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85','https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85','https://images.unsplash.com/photo-1584464491033-06828f3a6b7b?w=800&q=85','https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85']},
   ]},
  {id:13,name:'Classic Straight Jeans',slug:'straight-jeans',cat:'unisex',type:'jeans',
   price:7500,comparePrice:9900,shippingFee:350,stock:25,isNew:false,isBest:true,isSale:false,rating:4.6,reviews:67,
   material:'98% Cotton, 2% Elastane',
   desc:'The go-to straight-leg jean. Medium-weight denim with just enough stretch for all-day comfort.',
   care:'Machine wash cold inside out. Air dry.',
   sizes:['XS','S','M','L','XL','XXL'],
   colors:[
     {hex:'#2C3E50',name:'Indigo',imgs:['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=85','https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&q=85','https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&q=85','https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&q=85','https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=85','https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=85','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85']},
     {hex:'#5A7FA8',name:'Mid Wash',imgs:['https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&q=85','https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=85','https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&q=85','https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=85']},
   ]},
  {id:14,name:'Merino Crew Sweater',slug:'merino-sweater',cat:'unisex',type:'hoodie',
   price:6200,comparePrice:13800,shippingFee:0,stock:9,isNew:false,isBest:false,isSale:true,rating:4.7,reviews:36,
   material:'100% Merino Wool',
   desc:'Supersoft merino wool crew neck sweater. Naturally temperature-regulating and machine washable.',
   care:'Machine wash 30°C wool cycle. Lay flat to dry.',
   sizes:['S','M','L','XL','XXL'],
   colors:[
     {hex:'#ECECEC',name:'Light Grey',imgs:['https://images.unsplash.com/photo-1584464491033-06828f3a6b7b?w=800&q=85','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85','https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85','https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85']},
     {hex:'#1A1A1A',name:'Black',imgs:['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85','https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85','https://images.unsplash.com/photo-1584464491033-06828f3a6b7b?w=800&q=85']},
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=800&q=85','https://images.unsplash.com/photo-1584464491033-06828f3a6b7b?w=800&q=85','https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=85','https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=85']},
   ]},
  /* KIDS */
  {id:15,name:'Mini Aura Set',slug:'mini-aura-set',cat:'kids',type:'set',
   price:3200,comparePrice:4500,shippingFee:350,stock:18,isNew:true,isBest:true,isSale:false,rating:4.9,reviews:34,
   material:'100% Organic Cotton',
   desc:'Adorable matching set for kids. Super soft GOTS certified organic cotton, free from harmful chemicals.',
   care:'Machine wash 40°C. Tumble dry low.',
   sizes:['2Y','4Y','6Y','8Y','10Y'],
   colors:[
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85','https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85','https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=85','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85']},
     {hex:'#F4A6A6',name:'Pink',imgs:['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85','https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85','https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=85','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85']},
     {hex:'#ECECEC',name:'White',imgs:['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=85','https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85','https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85']},
   ]},
  {id:16,name:'Kids Graphic Tee',slug:'kids-graphic-tee',cat:'kids',type:'tshirt',
   price:1800,comparePrice:2500,shippingFee:350,stock:28,isNew:true,isBest:false,isSale:false,rating:4.7,reviews:19,
   material:'100% Cotton',
   desc:'Fun, comfortable kids graphic tee. Machine washable and built for playtime. Tagless for maximum comfort.',
   care:'Machine wash 40°C. Tumble dry.',
   sizes:['2Y','4Y','6Y','8Y','10Y','12Y'],
   colors:[
     {hex:'#8DB9FF',name:'Blue',imgs:['https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=85','https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85','https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85']},
     {hex:'#FFFFFF',name:'White',imgs:['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85','https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=85','https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85']},
     {hex:'#F4A6A6',name:'Pink',imgs:['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85','https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85','https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=85','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85']},
   ]},
  {id:17,name:'Kids Denim Joggers',slug:'kids-denim-joggers',cat:'kids',type:'pants',
   price:2900,comparePrice:null,shippingFee:350,stock:22,isNew:false,isBest:true,isSale:false,rating:4.5,reviews:27,
   material:'90% Cotton Denim, 10% Elastane',
   desc:'Comfortable denim-look joggers for active kids. Elasticated waist for all-day comfort.',
   care:'Machine wash 40°C. Tumble dry low.',
   sizes:['2Y','4Y','6Y','8Y','10Y','12Y'],
   colors:[
     {hex:'#2C3E50',name:'Indigo',imgs:['https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85','https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85','https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=85','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85']},
     {hex:'#5A7FA8',name:'Mid Blue',imgs:['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=85','https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=85','https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&q=85','https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85']},
   ]},
];

/* ── COUPONS ── */
var COUPONS = {
  'BLUE20':    {discount:20,  type:'percent', minOrder:3000, desc:'20% off — orders over LKR 3,000'},
  'AURA15':    {discount:15,  type:'percent', minOrder:0,    desc:'15% off — no minimum spend'},
  'WELCOME10': {discount:10,  type:'percent', minOrder:0,    desc:'10% off — welcome offer'},
  'FLAT500':   {discount:500, type:'fixed',   minOrder:5000, desc:'LKR 500 off — orders over LKR 5,000'},
};

/* ── STATE ── */
function _get(k){try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;}}
function _set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}

var State = {
  get cart()    {return _get('ba_cart')||[];},
  set cart(v)   {_set('ba_cart',v);},
  get wish()    {return _get('ba_wish')||[];},
  set wish(v)   {_set('ba_wish',v);},
  get user()    {return _get('ba_user');},
  set user(v)   {_set('ba_user',v);},
  get orders()  {return _get('ba_orders')||[];},
  set orders(v) {_set('ba_orders',v);},
  get products(){return _get('ba_products')||PRODUCTS;},
  set products(v){_set('ba_products',v);},
};

/* ── PRODUCT HELPERS ── */
function getProducts(){return State.products;}
function getProduct(id){return getProducts().find(function(p){return p.id===+id;});}
function getDiscount(p){return p.comparePrice?Math.round((1-p.price/p.comparePrice)*100):0;}
function getThumb(p){return (p.colors&&p.colors[0]&&p.colors[0].imgs)?p.colors[0].imgs[0]:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=70';}

/* ── URL PARAM ── */
function param(key){return new URLSearchParams(window.location.search).get(key);}

/* ── NAVIGATION ── */
function goTo(path){window.location.href=path;}

/* ── AUTH ── */
function isLoggedIn(){return !!State.user;}
function login(name,email){State.user={name:name,email:email,createdAt:new Date().toISOString()};updateUserUI();}
function logout(){State.user=null;updateUserUI();}

/* ── CART ── */
function cartSubtotal(){return State.cart.reduce(function(s,x){return s+x.price*x.qty;},0);}
function cartShipping(couponDiscount){
  var sub=cartSubtotal()-(couponDiscount||0);
  if(sub>=CFG.store.freeShippingMin)return 0;
  var maxFee=State.cart.reduce(function(mx,x){return Math.max(mx,x.shippingFee||0);},0);
  return maxFee>0?maxFee:CFG.store.defaultShipping;
}
function cartAdd(pid,size,colorHex,qty){
  qty=qty||1;
  if(!isLoggedIn()){goTo('login.html?redirect='+encodeURIComponent(window.location.pathname+window.location.search));return;}
  if(!size){toast('Please select a size','info');return;}
  var p=getProduct(pid);if(!p)return;
  var cv=p.colors.find(function(c){return c.hex===colorHex;})||p.colors[0];
  var key=pid+'::'+size+'::'+colorHex;
  var cart=State.cart;
  var ex=cart.find(function(x){return x.key===key;});
  if(ex){ex.qty+=qty;}else{cart.push({key:key,pid:pid,size:size,colorHex:colorHex,colorName:cv.name,qty:qty,price:p.price,shippingFee:p.shippingFee,name:p.name,img:cv.imgs[0]});}
  State.cart=cart;
  updateCartBadge();
  renderCartSidebar();
  document.dispatchEvent(new CustomEvent('ba:cart-updated'));
}
function cartRemove(key){State.cart=State.cart.filter(function(x){return x.key!==key;});updateCartBadge();renderCartSidebar();}
function cartQty(key,d){
  var cart=State.cart;
  var item=cart.find(function(x){return x.key===key;});
  if(item){item.qty=Math.max(1,item.qty+d);State.cart=cart;}
  updateCartBadge();renderCartSidebar();
}
function cartClear(){State.cart=[];updateCartBadge();renderCartSidebar();}
function applyCoupon(code){
  var c=COUPONS[code?code.toUpperCase():''];
  if(!c)return null;
  if(cartSubtotal()<c.minOrder)return null;
  return c;
}
function quickAdd(pid){
  if(!isLoggedIn()){goTo('login.html?redirect='+encodeURIComponent(window.location.pathname+window.location.search));return;}
  var p=getProduct(pid);if(!p)return;
  cartAdd(pid,p.sizes[1]||p.sizes[0],p.colors[0].hex,1);
  toast(p.name+' added to bag ✓');
  openCart();
}

/* ── WISHLIST ── */
function wishToggle(pid){
  if(!isLoggedIn()){goTo('login.html?redirect='+encodeURIComponent(window.location.pathname+window.location.search));return;}
  var w=State.wish;
  var i=w.indexOf(+pid);
  if(i===-1){w.push(+pid);}else{w.splice(i,1);}
  State.wish=w;
  updateWishBadge();
}
function isWished(pid){return State.wish.indexOf(+pid)!==-1;}
function handleWish(pid,btn){
  wishToggle(pid);
  if(!isLoggedIn())return;
  var on=isWished(pid);
  document.querySelectorAll('[data-wid="'+pid+'"]').forEach(function(b){
    b.textContent=on?'♥':'♡';
    b.classList.toggle('ba-wished',on);
  });
  toast(on?'Added to wishlist ♥':'Removed from wishlist');
}

/* ── ORDERS ── */
function placeOrder(data){
  var orders=State.orders;
  var order={
    id:'BA-'+Date.now().toString(36).toUpperCase(),
    date:new Date().toISOString(),
    status:'confirmed',
    items:[].concat(State.cart),
    subtotal:cartSubtotal(),
    shipping:data.shipping,
    discount:data.discount||0,
    total:data.total,
    customer:data.customer,
    address:data.address,
    payment:data.payment,
    delivery:data.delivery,
  };
  orders.push(order);
  State.orders=orders;
  cartClear();
  return order;
}

/* ── EMAILJS ── */
function emailjsReady(){return typeof emailjs!=='undefined'&&CFG.emailjs.publicKey!=='YOUR_EMAILJS_PUBLIC_KEY';}
function initEmailJS(){if(typeof emailjs!=='undefined'){try{emailjs.init(CFG.emailjs.publicKey);}catch(e){}}}
function sendOrderEmail(order){
  if(!emailjsReady())return Promise.resolve();
  var items=order.items.map(function(i){return i.name+' x'+i.qty+' ('+i.colorName+', '+i.size+') — LKR '+(i.price*i.qty).toLocaleString();}).join('\n');
  return emailjs.send(CFG.emailjs.serviceId,CFG.emailjs.tplOrderConfirm,{
    to_email:order.customer.email,to_name:order.customer.name,
    order_id:order.id,order_date:new Date(order.date).toLocaleDateString(),
    order_items:items,subtotal:'LKR '+order.subtotal.toLocaleString(),
    shipping:order.shipping===0?'Free':'LKR '+order.shipping.toLocaleString(),
    total:'LKR '+order.total.toLocaleString(),
    payment:order.payment,address:order.address.line1+', '+order.address.city+', '+order.address.province,
    store_name:CFG.store.name,
  });
}
function sendContactEmail(params){
  if(!emailjsReady())return Promise.resolve();
  return emailjs.send(CFG.emailjs.serviceId,CFG.emailjs.tplContact,{
    from_name:params.name,from_email:params.email,
    subject:params.subject,message:params.message,
    store_email:CFG.store.email,
  });
}

/* ── TOAST ── */
function toast(msg,type){
  type=type||'success';
  var box=document.getElementById('ba-toasts');
  if(!box){box=document.createElement('div');box.id='ba-toasts';document.body.appendChild(box);}
  var icons={success:'✓',error:'✗',info:'ℹ',warning:'⚠'};
  var t=document.createElement('div');
  t.className='ba-toast ba-toast-'+type;
  t.innerHTML='<span class="ba-toast-ico">'+(icons[type]||'✓')+'</span><span class="ba-toast-msg">'+msg+'</span><span class="ba-toast-x" onclick="this.closest(\'.ba-toast\').remove()">×</span>';
  box.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .4s';setTimeout(function(){if(t.parentNode)t.remove();},400);},3800);
}

/* ── BADGE UPDATES ── */
function updateCartBadge(){
  var n=State.cart.reduce(function(s,x){return s+x.qty;},0);
  document.querySelectorAll('.ba-cart-badge').forEach(function(el){el.textContent=n;el.style.display=n?'flex':'none';});
  document.querySelectorAll('.ba-cart-count').forEach(function(el){el.textContent=n?'('+n+')':'';});
}
function updateWishBadge(){
  var n=State.wish.length;
  document.querySelectorAll('.ba-wish-badge').forEach(function(el){el.textContent=n;el.style.display=n?'flex':'none';});
}
function updateUserUI(){
  var user=State.user;
  document.querySelectorAll('.ba-user-name').forEach(function(el){el.textContent=user?user.name:'';});
  document.querySelectorAll('.ba-login-show').forEach(function(el){el.style.display=user?'none':'';});
  document.querySelectorAll('.ba-logout-show').forEach(function(el){el.style.display=user?'':'none';});
}

/* ── SEARCH ── */
function searchProducts(q){
  if(!q||!q.trim())return[];
  var lq=q.toLowerCase();
  return getProducts().filter(function(p){
    return p.name.toLowerCase().indexOf(lq)!==-1||p.cat.indexOf(lq)!==-1||p.type.indexOf(lq)!==-1||(p.material&&p.material.toLowerCase().indexOf(lq)!==-1);
  }).slice(0,8);
}

/* ── CART SIDEBAR ── */
function openCart(){
  injectCartSidebar();
  var c=document.getElementById('ba-cart');
  var ov=document.getElementById('ba-cart-ov');
  if(c)c.style.transform='translateX(0)';
  if(ov){ov.style.opacity='1';ov.style.pointerEvents='all';}
  renderCartSidebar();
}
function closeCart(){
  var c=document.getElementById('ba-cart');
  var ov=document.getElementById('ba-cart-ov');
  if(c)c.style.transform='translateX(110%)';
  if(ov){ov.style.opacity='0';ov.style.pointerEvents='none';}
}
function injectCartSidebar(){
  if(document.getElementById('ba-cart'))return;
  var el=document.createElement('div');
  el.id='ba-cart-wrap';
  el.innerHTML='<div id="ba-cart-ov" onclick="closeCart()" style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:865;opacity:0;pointer-events:none;transition:opacity .28s"></div>'
  +'<div id="ba-cart" style="position:fixed;right:0;top:0;bottom:0;width:428px;max-width:100%;background:#fff;z-index:870;transform:translateX(110%);transition:transform .34s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.2)">'
  +'<div style="padding:20px 24px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;flex-shrink:0">'
  +'<div style="font-family:\'Cormorant Garamond\',Georgia,serif;font-size:22px;font-weight:400">Shopping Bag <span class="ba-cart-count" style="font-family:\'DM Sans\',sans-serif;font-size:14px;color:#888;font-weight:400"></span></div>'
  +'<button onclick="closeCart()" style="width:38px;height:38px;border-radius:8px;border:none;background:none;cursor:pointer;font-size:20px;color:#888">✕</button>'
  +'</div>'
  +'<div id="ba-cart-body" style="flex:1;overflow-y:auto;padding:20px 24px"></div>'
  +'<div id="ba-cart-ft" style="flex-shrink:0"></div>'
  +'</div>';
  document.body.appendChild(el);
  document.addEventListener('ba:cart-updated',renderCartSidebar);
}
function renderCartSidebar(){
  var body=document.getElementById('ba-cart-body');
  var ft=document.getElementById('ba-cart-ft');
  if(!body)return;
  var cart=State.cart;
  if(!cart.length){
    body.innerHTML='<div style="text-align:center;padding:60px 20px">'
    +'<div style="font-size:64px;margin-bottom:16px;opacity:.15">🛍</div>'
    +'<div style="font-size:18px;font-weight:400;margin-bottom:8px;font-family:\'Cormorant Garamond\',serif">Your bag is empty</div>'
    +'<p style="font-size:14px;color:#888;margin-bottom:20px">Add items to start shopping</p>'
    +'<button onclick="closeCart();goTo(\'new-in.html\')" style="background:#0a0a0a;color:#fff;border:none;padding:13px 28px;font-size:12px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;border-radius:6px;cursor:pointer;font-family:inherit">Start Shopping</button>'
    +'</div>';
    ft.innerHTML='';return;
  }
  body.innerHTML=cart.map(function(item){
    return '<div style="display:flex;gap:14px;padding:15px 0;border-bottom:1px solid #f0f0f0">'
    +'<img src="'+item.img+'" alt="'+item.name+'" style="width:76px;height:96px;object-fit:cover;border-radius:6px;background:#eee;flex-shrink:0" loading="lazy">'
    +'<div style="flex:1;min-width:0">'
    +'<div style="font-size:13.5px;font-weight:500;margin-bottom:4px;line-height:1.3">'+item.name+'</div>'
    +'<div style="font-size:12px;color:#888;margin-bottom:7px">'+item.colorName+' · Size '+item.size+(item.shippingFee===0?'<span style="color:#22c55e;font-weight:700;font-size:10px;margin-left:6px">FREE SHIP</span>':'')+'</div>'
    +'<div style="font-size:15px;font-weight:700">LKR '+(item.price*item.qty).toLocaleString()+'</div>'
    +'<div style="display:flex;align-items:center;gap:9px;margin-top:9px">'
    +'<button onclick="cartQty(\''+item.key+'\',-1)" style="width:28px;height:28px;border-radius:50%;border:1.5px solid #bbb;background:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;font-family:inherit">−</button>'
    +'<span style="font-size:14px;font-weight:700;min-width:22px;text-align:center">'+item.qty+'</span>'
    +'<button onclick="cartQty(\''+item.key+'\',1)" style="width:28px;height:28px;border-radius:50%;border:1.5px solid #bbb;background:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;font-family:inherit">+</button>'
    +'<button onclick="cartRemove(\''+item.key+'\')" style="margin-left:auto;color:#888;background:none;border:none;cursor:pointer;font-size:20px" title="Remove">🗑</button>'
    +'</div></div></div>';
  }).join('');
  var sub=cartSubtotal();
  var ship=cartShipping(0);
  ft.innerHTML='<div style="padding:18px 24px;border-top:1px solid #f0f0f0">'
  +'<div style="display:flex;gap:8px;margin-bottom:16px">'
  +'<input id="ba-cart-coup" placeholder="Promo code…" style="flex:1;border:1.5px solid #bbb;padding:10px 13px;border-radius:6px;font-size:13px;font-family:inherit;outline:none" onfocus="this.style.borderColor=\'#8DB9FF\'" onblur="this.style.borderColor=\'#bbb\'">'
  +'<button onclick="cartApplyCode()" style="background:#0a0a0a;color:#fff;border:none;padding:10px 16px;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:6px;cursor:pointer;font-family:inherit">Apply</button>'
  +'</div>'
  +'<div style="display:flex;justify-content:space-between;font-size:13px;padding:5px 0"><span>Subtotal</span><span>LKR '+sub.toLocaleString()+'</span></div>'
  +'<div style="display:flex;justify-content:space-between;font-size:13px;padding:5px 0"><span>Shipping</span><span>'+(ship===0?'<span style="color:#22c55e;font-weight:600">FREE</span>':'LKR '+ship.toLocaleString())+'</span></div>'
  +'<div style="display:flex;justify-content:space-between;font-size:17px;font-weight:700;padding:13px 0;border-top:1px solid #eee;margin-top:8px"><span>Total</span><span>LKR '+(sub+ship).toLocaleString()+'</span></div>'
  +'<button onclick="closeCart();checkoutGuard()" style="display:block;width:100%;background:#0a0a0a;color:#fff;border:none;padding:16px;font-size:13px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;border-radius:6px;cursor:pointer;margin-top:4px;font-family:inherit">Checkout →</button>'
  +'<button onclick="closeCart();goTo(\'new-in.html\')" style="display:block;width:100%;background:transparent;color:#0a0a0a;border:1.5px solid #0a0a0a;padding:13px;font-size:12px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;border-radius:6px;cursor:pointer;margin-top:9px;font-family:inherit">Continue Shopping</button>'
  +'</div>';
}
function cartApplyCode(){
  var code=document.getElementById('ba-cart-coup')?document.getElementById('ba-cart-coup').value:'';
  var c=applyCoupon(code);
  if(c){toast(c.desc+' ✓');}else{toast('Invalid or expired promo code','error');}
}
function checkoutGuard(){
  if(!isLoggedIn()){goTo('login.html?redirect=checkout.html');return;}
  goTo('checkout.html');
}

/* ── PRODUCT CARD ── */
function productCardHTML(p){
  var disc=getDiscount(p);
  var thumb=getThumb(p);
  var altImg=p.colors&&p.colors[1]?p.colors[1].imgs[0]:thumb;
  var wished=isWished(p.id);
  return '<div class="ba-pc" onclick="goTo(\'product.html?id='+p.id+'\')">'
  +'<div class="ba-pc-img">'
  +'<img class="ba-pc-main" src="'+thumb+'" alt="'+p.name+'" loading="lazy">'
  +'<img class="ba-pc-alt" src="'+altImg+'" alt="'+p.name+'" loading="lazy">'
  +'<div class="ba-pc-tags">'
  +(p.isNew?'<span class="ba-tag ba-tag-new">New</span>':'')
  +(p.isBest?'<span class="ba-tag ba-tag-best">Best</span>':'')
  +(disc>0?'<span class="ba-tag ba-tag-sale">-'+disc+'%</span>':'')
  +(p.shippingFee===0?'<span class="ba-tag ba-tag-ship">Free Ship</span>':'')
  +'</div>'
  +'<div class="ba-pc-acts" onclick="event.stopPropagation()">'
  +'<button class="ba-pc-ab'+(wished?' ba-wished':'')+'" data-wid="'+p.id+'" onclick="handleWish('+p.id+',this)" title="Wishlist">'+(wished?'♥':'♡')+'</button>'
  +'<button class="ba-pc-ab" onclick="goTo(\'product.html?id='+p.id+'\')" title="View">👁</button>'
  +'</div>'
  +'<div class="ba-qadd" onclick="event.stopPropagation();quickAdd('+p.id+')">Quick Add +</div>'
  +'</div>'
  +'<div class="ba-pc-info">'
  +'<div class="ba-pc-brand">Blue Aura</div>'
  +'<div class="ba-pc-name">'+p.name+'</div>'
  +'<div class="ba-pc-pr"><span class="ba-pc-now">LKR '+p.price.toLocaleString()+'</span>'+(p.comparePrice?'<span class="ba-pc-was">LKR '+p.comparePrice.toLocaleString()+'</span><span class="ba-pc-disc">-'+disc+'%</span>':'')+'</div>'
  +'<div class="ba-pc-cols">'+(p.colors||[]).map(function(c){return '<div class="ba-pc-c" style="background:'+c.hex+'" title="'+c.name+'"></div>';}).join('')+'</div>'
  +'<div class="ba-pc-rat">'+'★'.repeat(Math.floor(p.rating))+'☆'.repeat(5-Math.floor(p.rating))+' <span class="ba-pc-rc">('+p.reviews+')</span></div>'
  +'</div></div>';
}

/* ── PAGE HEADER ── */
function pageHeaderHTML(title,crumbs){
  return '<div class="ba-ph"><div class="ba-ctr"><div class="ba-ph-in"><div><h1 class="ba-ph-h">'+title+'</h1>'
  +'<nav class="ba-bc">'+crumbs.map(function(c,i){return i<crumbs.length-1?'<a href="'+c.href+'">'+c.label+'</a><span>›</span>':'<span>'+c.label+'</span>';}).join('')+'</nav>'
  +'</div></div></div></div>';
}

/* ── CATEGORY PAGE ── */
function renderCategoryPage(cat){
  var mc=document.getElementById('ba-main');
  if(!mc)return;
  var names={'new-in':'New In','women':'Women','men':'Men','unisex':'Unisex','kids':'Kids','offers':'Sale & Offers'};
  var name=names[cat]||cat;
  var prods=cat==='new-in'?getProducts().filter(function(p){return p.isNew;}):
             cat==='offers'?getProducts().filter(function(p){return p.isSale||p.comparePrice;}):
             getProducts().filter(function(p){return p.cat===cat;});
  var fs={size:'',type:'',pMin:0,pMax:999999,sort:'newest'};

  function sf(list){
    var r=list.filter(function(p){
      if(fs.size&&p.sizes.indexOf(fs.size)===-1)return false;
      if(fs.type&&p.type!==fs.type)return false;
      if(p.price<fs.pMin||p.price>fs.pMax)return false;
      return true;
    });
    if(fs.sort==='price-asc')r.sort(function(a,b){return a.price-b.price;});
    else if(fs.sort==='price-desc')r.sort(function(a,b){return b.price-a.price;});
    else if(fs.sort==='best')r.sort(function(a,b){return (b.isBest?1:0)-(a.isBest?1:0);});
    else r.sort(function(a,b){return (b.isNew?1:0)-(a.isNew?1:0);});
    return r;
  }
  function refresh(){
    var g=document.getElementById('ba-pg');
    var c=document.getElementById('ba-rc');
    var list=sf(prods);
    if(g)g.innerHTML=list.length?list.map(productCardHTML).join(''):'<div class="ba-empty" style="grid-column:1/-1"><div style="font-size:60px;margin-bottom:16px;opacity:.2">🔍</div><h3>No products found</h3><p>Try adjusting your filters</p><button onclick="clearCatFilters()" class="ba-btn ba-btn-k ba-btn-sm">Clear Filters</button></div>';
    if(c)c.textContent=list.length+' product'+(list.length!==1?'s':'');
  }

  mc.innerHTML=pageHeaderHTML(name,[{label:'Home',href:'index.html'},{label:name}])
  +'<div class="ba-fb"><div class="ba-ctr"><div class="ba-fb-in">'
  +'<button class="ba-fch" onclick="openFD()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>Filters</button>'
  +['S','M','L','XL'].map(function(s){return '<button class="ba-fch" id="fqs-'+s+'" onclick="qfSize(\''+s+'\',this)">'+s+'</button>';}).join('')
  +'<select class="ba-sort-s" onchange="fs.sort=this.value;refresh()"><option value="newest">Newest First</option><option value="price-asc">Price: Low → High</option><option value="price-desc">Price: High → Low</option><option value="best">Best Selling</option></select>'
  +'<span id="ba-rc" style="margin-left:8px;font-size:13px;color:#888;white-space:nowrap;flex-shrink:0">'+prods.length+' products</span>'
  +'</div></div></div>'
  +'<div id="ba-fov" onclick="closeFD()" style="position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:855;display:none"></div>'
  +'<div id="ba-fdraw" class="ba-fdraw">'
  +'<div class="ba-fd-hd"><span style="font-size:16px;font-weight:600">Filters</span><button onclick="closeFD()" style="width:34px;height:34px;border-radius:50%;border:none;background:#f0f0f0;cursor:pointer;font-size:15px">✕</button></div>'
  +'<div class="ba-fd-sec"><h4>Size</h4><div class="ba-fopts">'+['XS','S','M','L','XL','XXL'].map(function(s){return '<div class="ba-fopt" onclick="fSet(\'size\',\''+s+'\',this)">'+s+'</div>';}).join('')+'</div></div>'
  +'<div class="ba-fd-sec"><h4>Type</h4><div class="ba-fopts">'+['tshirt','shirt','dress','hoodie','pants','jeans','jacket','set'].map(function(t){return '<div class="ba-fopt" onclick="fSet(\'type\',\''+t+'\',this)">'+t.charAt(0).toUpperCase()+t.slice(1)+'</div>';}).join('')+'</div></div>'
  +'<div class="ba-fd-sec"><h4>Price Range (LKR)</h4>'
  +'<div style="display:flex;gap:10px;margin-top:12px;align-items:center"><input class="ba-pr-i" id="ba-pmin" type="number" placeholder="0" value="0"><span style="color:#888">—</span><input class="ba-pr-i" id="ba-pmax" type="number" placeholder="99999" value="99999"></div>'
  +'<button onclick="applyPr()" class="ba-btn ba-btn-ou ba-btn-sm" style="margin-top:12px">Apply Price</button></div>'
  +'<div style="padding:18px 26px;display:flex;flex-direction:column;gap:9px"><button onclick="closeFD()" class="ba-btn ba-btn-k ba-btn-full">View Results</button><button onclick="clearCatFilters()" class="ba-btn ba-btn-ou ba-btn-full">Clear All</button></div>'
  +'</div>'
  +'<section class="ba-sec"><div class="ba-ctr"><div class="ba-pgrid" id="ba-pg">'+sf(prods).map(productCardHTML).join('')+'</div></div></section>';

  /* expose filter fns to global */
  window.fs=fs;
  window.refresh=refresh;
  window.openFD=function(){document.getElementById('ba-fdraw').classList.add('open');document.getElementById('ba-fov').style.display='block';};
  window.closeFD=function(){document.getElementById('ba-fdraw').classList.remove('open');document.getElementById('ba-fov').style.display='none';};
  window.qfSize=function(s,btn){fs.size=fs.size===s?'':s;document.querySelectorAll('[id^="fqs-"]').forEach(function(b){b.classList.remove('on');});btn.classList.toggle('on',!!fs.size);refresh();};
  window.fSet=function(k,v,btn){document.querySelectorAll('#ba-fdraw .ba-fopt[onclick*="\''+k+'\'"]').forEach(function(x){x.classList.remove('on');});fs[k]=fs[k]===v?'':v;btn.classList.toggle('on',!!fs[k]);refresh();};
  window.applyPr=function(){var mn=document.getElementById('ba-pmin');var mx=document.getElementById('ba-pmax');fs.pMin=mn?parseInt(mn.value)||0:0;fs.pMax=mx?parseInt(mx.value)||999999:999999;refresh();};
  window.clearCatFilters=function(){Object.assign(fs,{size:'',type:'',pMin:0,pMax:999999});document.querySelectorAll('#ba-fdraw .ba-fopt').forEach(function(x){x.classList.remove('on');});refresh();};
}

/* ── HEADER INJECTION ── */
function injectHeader(activePage){
  var hdr=document.getElementById('ba-header');
  if(!hdr)return;
  var nav=[
    {l:'Home',h:'index.html',p:'home'},
    {l:'New In',h:'new-in.html',p:'new-in'},
    {l:'Women',h:'women.html',p:'women'},
    {l:'Men',h:'men.html',p:'men'},
    {l:'Unisex',h:'unisex.html',p:'unisex'},
    {l:'Kids',h:'kids.html',p:'kids'},
    {l:'Sale 🔥',h:'offers.html',p:'offers',cls:'sale'},
  ];
  hdr.innerHTML=
    '<div id="ba-topbar">'
    +'<div class="ba-tb-inner">'
    +'<span class="ba-tb-i">✦ FREE SHIPPING on orders over <strong>LKR 5,000</strong></span>'
    +'<span class="ba-tb-i">✦ NEW COLLECTION just dropped</span>'
    +'<span class="ba-tb-i">✦ Use code <strong>BLUE20</strong> — 20% off your first order</span>'
    +'<span class="ba-tb-i">✦ Express island-wide delivery available</span>'
    +'<span class="ba-tb-i">✦ Free 30-day returns — no questions asked</span>'
    +'<span class="ba-tb-i">✦ FREE SHIPPING on orders over <strong>LKR 5,000</strong></span>'
    +'<span class="ba-tb-i">✦ NEW COLLECTION just dropped</span>'
    +'<span class="ba-tb-i">✦ Use code <strong>BLUE20</strong> — 20% off first order</span>'
    +'</div></div>'
    +'<div id="ba-nav-bar"><div class="ba-ctr"><div class="ba-nav-in">'
    +'<a href="index.html" class="ba-logo" style="text-decoration:none">'
    +'<svg width="38" height="38" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="#8DB9FF" stroke-width=".5" opacity=".28"/><circle cx="20" cy="20" r="13" fill="none" stroke="#8DB9FF" stroke-width="1" opacity=".55"/><circle cx="20" cy="20" r="8" fill="none" stroke="#8DB9FF" stroke-width="1.5" opacity=".85"/><circle cx="20" cy="20" r="3.5" fill="#8DB9FF"/></svg>'
    +'<span class="ba-logo-txt">BLUE <em>AURA</em></span></a>'
    +'<nav class="ba-nav">'
    +nav.map(function(n){return '<a href="'+n.h+'" class="ba-nav-a '+(n.cls||'')+' '+(activePage===n.p?'on':'')+'" style="text-decoration:none">'+n.l+'</a>';}).join('')
    +'</nav>'
    +'<div class="ba-nav-acts">'
    +'<div class="ba-sw-wrap" style="position:relative">'
    +'<button class="ba-ib" onclick="toggleHeaderSearch()" title="Search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg></button>'
    +'<div id="ba-srch-box" style="display:none;position:absolute;right:0;top:calc(100% + 8px);width:320px;background:#fff;border:1px solid #eee;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.14);z-index:200;overflow:hidden">'
    +'<div style="padding:12px 16px;border-bottom:1px solid #f0f0f0;display:flex;align-items:center;gap:10px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>'
    +'<input id="ba-srch-inp" type="text" placeholder="Search products…" style="flex:1;border:none;font-size:14px;font-family:inherit;outline:none" oninput="doHeaderSearch(this.value)"></div>'
    +'<div id="ba-srch-results"></div></div></div>'
    +'<a href="wishlist.html" class="ba-ib wish-ico" title="Wishlist" style="position:relative;text-decoration:none">'
    +'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
    +'<span class="ba-wish-badge ba-badge" style="display:none">0</span></a>'
    +'<button class="ba-ib cart-ico" onclick="openCart()" title="Cart" style="position:relative">'
    +'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'
    +'<span class="ba-cart-badge ba-badge" style="display:none">0</span></button>'
    +'<a href="'+(isLoggedIn()?'account.html':'login.html')+'" class="ba-ib" title="Account" style="text-decoration:none">'
    +'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>'
    +'<button class="ba-ib ba-mob-btn" onclick="toggleMobNav()" style="display:none">'
    +'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>'
    +'</div></div></div></div>'
    +'<div id="ba-mob-ov" onclick="toggleMobNav()" style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:900;display:none;opacity:0;transition:opacity .28s"></div>'
    +'<div id="ba-mob-drawer" style="position:fixed;left:0;top:0;bottom:0;width:300px;background:#fff;z-index:910;transform:translateX(-100%);transition:transform .34s cubic-bezier(.4,0,.2,1);overflow-y:auto">'
    +'<div style="padding:20px 22px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between">'
    +'<a href="index.html" class="ba-logo" style="text-decoration:none"><svg width="32" height="32" viewBox="0 0 40 40"><circle cx="20" cy="20" r="11" fill="none" stroke="#8DB9FF" stroke-width="1.4" opacity=".75"/><circle cx="20" cy="20" r="5" fill="#8DB9FF"/></svg><span class="ba-logo-txt">BLUE <em>AURA</em></span></a>'
    +'<button onclick="toggleMobNav()" style="width:34px;height:34px;border-radius:50%;border:none;background:#f0f0f0;cursor:pointer;font-size:16px">✕</button></div>'
    +nav.map(function(n){return '<a href="'+n.h+'" style="display:flex;align-items:center;justify-content:space-between;padding:15px 22px;font-size:14px;font-weight:500;border-bottom:1px solid #f5f5f5;text-decoration:none;color:'+(n.cls==='sale'?'#e53e3e':'#1a1a1a')+'">'+n.l+'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></a>';}).join('')
    +'<a href="account.html" style="display:flex;align-items:center;justify-content:space-between;padding:15px 22px;font-size:14px;font-weight:500;border-bottom:1px solid #f5f5f5;text-decoration:none;color:#1a1a1a">My Account<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></a>'
    +'<a href="contact.html" style="display:flex;align-items:center;justify-content:space-between;padding:15px 22px;font-size:14px;font-weight:500;border-bottom:1px solid #f5f5f5;text-decoration:none;color:#1a1a1a">Contact Us<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></a>'
    +'</div>';

  window.addEventListener('scroll',function(){
    var nb=document.getElementById('ba-nav-bar');
    if(nb)nb.classList.toggle('scrolled',window.scrollY>50);
  });
}

function toggleMobNav(){
  var dr=document.getElementById('ba-mob-drawer');
  var ov=document.getElementById('ba-mob-ov');
  if(!dr||!ov)return;
  var open=dr.style.transform==='translateX(0px)'||dr.style.transform==='translateX(0)';
  if(open){dr.style.transform='translateX(-100%)';ov.style.opacity='0';setTimeout(function(){ov.style.display='none';},300);}
  else{ov.style.display='block';setTimeout(function(){ov.style.opacity='1';},10);dr.style.transform='translateX(0)';}
}

function toggleHeaderSearch(){
  var box=document.getElementById('ba-srch-box');
  if(!box)return;
  var visible=box.style.display!=='none';
  box.style.display=visible?'none':'block';
  if(!visible)setTimeout(function(){var i=document.getElementById('ba-srch-inp');if(i)i.focus();},50);
}
function doHeaderSearch(q){
  var res=document.getElementById('ba-srch-results');
  if(!res)return;
  if(!q||!q.trim()){res.innerHTML='';return;}
  var hits=searchProducts(q);
  if(!hits.length){res.innerHTML='<div style="padding:16px;font-size:13px;color:#888;text-align:center">No results found</div>';return;}
  res.innerHTML=hits.map(function(p){
    return '<a href="product.html?id='+p.id+'" style="display:flex;align-items:center;gap:12px;padding:11px 16px;text-decoration:none;color:#1a1a1a;border-bottom:1px solid #f5f5f5;transition:background .2s" onmouseover="this.style.background=\'#f8f8f8\'" onmouseout="this.style.background=\'\'">'
    +'<img src="'+getThumb(p)+'" alt="'+p.name+'" style="width:42px;height:52px;object-fit:cover;border-radius:4px;background:#eee;flex-shrink:0" loading="lazy">'
    +'<div><div style="font-size:13px;font-weight:500;line-height:1.3">'+p.name+'</div><div style="font-size:12px;color:#8DB9FF;margin-top:2px">LKR '+p.price.toLocaleString()+'</div></div></a>';
  }).join('');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('.ba-sw-wrap')){var b=document.getElementById('ba-srch-box');if(b)b.style.display='none';}
});

/* ── FOOTER INJECTION ── */
function injectFooter(){
  var ft=document.getElementById('ba-footer');
  if(!ft)return;
  ft.innerHTML='<div class="ba-ctr"><div class="ba-ft-grid">'
  +'<div><div class="ba-logo" style="margin-bottom:0;text-decoration:none"><svg width="32" height="32" viewBox="0 0 40 40"><circle cx="20" cy="20" r="11" fill="none" stroke="#8DB9FF" stroke-width="1.4" opacity=".75"/><circle cx="20" cy="20" r="5" fill="#8DB9FF"/></svg><span class="ba-logo-txt" style="color:#fff">BLUE <em>AURA</em></span></div>'
  +'<p style="font-size:13px;line-height:1.9;margin:16px 0 22px;color:rgba(255,255,255,.38)">Premium fashion for the modern individual. Crafted with love in Sri Lanka.</p>'
  +'<div style="display:flex;gap:10px">'
  +'<a href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);font-size:14px;transition:all .24s;text-decoration:none" onmouseover="this.style.background=\'#8DB9FF\'" onmouseout="this.style.background=\'rgba(255,255,255,.07)\'">ig</a>'
  +'<a href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);font-size:14px;transition:all .24s;text-decoration:none" onmouseover="this.style.background=\'#8DB9FF\'" onmouseout="this.style.background=\'rgba(255,255,255,.07)\'">fb</a>'
  +'<a href="#" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);font-size:14px;transition:all .24s;text-decoration:none" onmouseover="this.style.background=\'#8DB9FF\'" onmouseout="this.style.background=\'rgba(255,255,255,.07)\'">tt</a>'
  +'</div></div>'
  +'<div><h4 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fff;margin-bottom:16px">Shop</h4>'
  +[['New In','new-in.html'],['Women','women.html'],['Men','men.html'],['Unisex','unisex.html'],['Kids','kids.html'],['Sale & Offers','offers.html']].map(function(x){return '<a href="'+x[1]+'" style="display:block;font-size:13px;color:rgba(255,255,255,.4);margin-bottom:10px;text-decoration:none;transition:color .2s" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'rgba(255,255,255,.4)\'">'+x[0]+'</a>';}).join('')
  +'</div>'
  +'<div><h4 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fff;margin-bottom:16px">Help</h4>'
  +[['Contact Us','contact.html'],['Order Tracking','tracking.html'],['Returns & Refunds','returns.html'],['Shipping Policy','shipping.html'],['FAQ','faq.html'],['About Us','about.html']].map(function(x){return '<a href="'+x[1]+'" style="display:block;font-size:13px;color:rgba(255,255,255,.4);margin-bottom:10px;text-decoration:none;transition:color .2s" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'rgba(255,255,255,.4)\'">'+x[0]+'</a>';}).join('')
  +'</div>'
  +'<div><h4 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fff;margin-bottom:16px">Account</h4>'
  +[['My Account','account.html'],['Wishlist','wishlist.html'],['Privacy Policy','privacy.html'],['Terms & Conditions','terms.html']].map(function(x){return '<a href="'+x[1]+'" style="display:block;font-size:13px;color:rgba(255,255,255,.4);margin-bottom:10px;text-decoration:none;transition:color .2s" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'rgba(255,255,255,.4)\'">'+x[0]+'</a>';}).join('')
  +'<div style="margin-top:18px"><h4 style="font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#fff;margin-bottom:10px">We Accept</h4>'
  +'<div style="display:flex;gap:7px;flex-wrap:wrap">'+['Visa','Master','Amex','COD'].map(function(p){return '<span style="background:rgba(255,255,255,.08);border-radius:4px;padding:4px 9px;font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.42)">'+p+'</span>';}).join('')+'</div></div>'
  +'</div></div></div>'
  +'<div class="ba-ctr"><div style="border-top:1px solid rgba(255,255,255,.07);padding:20px 0;display:flex;align-items:center;justify-content:space-between;gap:20px;font-size:12px;color:rgba(255,255,255,.32);flex-wrap:wrap">'
  +'<span>© 2025 Blue Aura. All rights reserved. Made with ♥ in Sri Lanka.</span>'
  +'<div style="display:flex;gap:20px">'+[['Privacy','privacy.html'],['Terms','terms.html'],['Shipping','shipping.html'],['Returns','returns.html']].map(function(x){return '<a href="'+x[1]+'" style="color:rgba(255,255,255,.32);text-decoration:none;transition:color .2s" onmouseover="this.style.color=\'#fff\'" onmouseout="this.style.color=\'rgba(255,255,255,.32)\'">'+x[0]+'</a>';}).join('')+'</div>'
  +'</div></div>'
  +'<a href="https://wa.me/'+CFG.store.whatsapp+'" target="_blank" style="position:fixed;bottom:26px;right:26px;z-index:700;width:54px;height:54px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 22px rgba(37,211,102,.5);transition:transform .25s;text-decoration:none" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'" title="WhatsApp">'
  +'<svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></a>';
}

/* ── MAIN INIT ── */
function baInit(activePage){
  initEmailJS();
  injectCartSidebar();
  injectHeader(activePage||'');
  injectFooter();
  updateCartBadge();
  updateWishBadge();
  updateUserUI();
}

/* ── EXPOSE ALL TO WINDOW (fixes baInit is not defined) ── */
window.CFG=CFG;
window.PRODUCTS=PRODUCTS;
window.COUPONS=COUPONS;
window.State=State;
window.baInit=baInit;
window.getProducts=getProducts;
window.getProduct=getProduct;
window.getDiscount=getDiscount;
window.getThumb=getThumb;
window.param=param;
window.goTo=goTo;
window.isLoggedIn=isLoggedIn;
window.login=login;
window.logout=logout;
window.cartSubtotal=cartSubtotal;
window.cartShipping=cartShipping;
window.cartAdd=cartAdd;
window.cartRemove=cartRemove;
window.cartQty=cartQty;
window.cartClear=cartClear;
window.applyCoupon=applyCoupon;
window.quickAdd=quickAdd;
window.wishToggle=wishToggle;
window.isWished=isWished;
window.handleWish=handleWish;
window.placeOrder=placeOrder;
window.emailjsReady=emailjsReady;
window.initEmailJS=initEmailJS;
window.sendOrderEmail=sendOrderEmail;
window.sendContactEmail=sendContactEmail;
window.toast=toast;
window.updateCartBadge=updateCartBadge;
window.updateWishBadge=updateWishBadge;
window.updateUserUI=updateUserUI;
window.searchProducts=searchProducts;
window.openCart=openCart;
window.closeCart=closeCart;
window.renderCartSidebar=renderCartSidebar;
window.cartApplyCode=cartApplyCode;
window.checkoutGuard=checkoutGuard;
window.productCardHTML=productCardHTML;
window.pageHeaderHTML=pageHeaderHTML;
window.renderCategoryPage=renderCategoryPage;
window.injectHeader=injectHeader;
window.injectFooter=injectFooter;
window.toggleMobNav=toggleMobNav;
window.toggleHeaderSearch=toggleHeaderSearch;
window.doHeaderSearch=doHeaderSearch;
