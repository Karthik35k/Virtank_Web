-- Create database (run once)
-- CREATE DATABASE IF NOT EXISTS virtank;
-- USE virtank;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS foods (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(32) NOT NULL,
  createdAt DATETIME NOT NULL,
  INDEX idx_orders_userId (userId)
);

-- Seed demo users
INSERT IGNORE INTO users (id, email, password, role) VALUES
('u1','user@virtank.com','user123','user'),
('a1','admin@virtank.com','admin123','admin');

-- Seed foods
INSERT IGNORE INTO foods (id, name, price, category) VALUES
('101','Paneer Bowl',220,'veg'),
('102','Chicken Wrap',260,'non-veg'),
('103','Veg Salad',180,'veg');


