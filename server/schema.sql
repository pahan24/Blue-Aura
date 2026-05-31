-- BLUE AURA DATABASE SCHEMA
-- Target Database Engine: PostgreSQL / Supabase

-- Drop table if exists to avoid conflicts
-- DROP TABLE IF EXISTS orders;

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  payment_method VARCHAR(30) NOT NULL,
  items JSONB NOT NULL, -- Holds product quantities, sizes, and colors
  subtotal DECIMAL(12, 2) NOT NULL,
  shipping_fee DECIMAL(12, 2) NOT NULL,
  discount DECIMAL(12, 2) DEFAULT 0.00,
  promo_code_used VARCHAR(50),
  total DECIMAL(12, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
  tracking_number VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for search optimization
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(created_at DESC);
