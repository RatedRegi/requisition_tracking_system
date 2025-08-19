-- Shurugwi Town Council Requisition Tracking System Database Setup
-- This script creates the database and all necessary tables

-- Create the database
CREATE DATABASE IF NOT EXISTS requisition_tracking_system;
USE requisition_tracking_system;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS procurement;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS approvals;
DROP TABLE IF EXISTS requisition_items;
DROP TABLE IF EXISTS requisitions;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;

-- 1. Departments Table
CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('requester', 'approver', 'procurement', 'admin') NOT NULL DEFAULT 'requester',
    dept_id INT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
);

-- 3. Requisitions Table (Core Table)
CREATE TABLE requisitions (
    req_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    dept_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    justification TEXT NOT NULL,
    status ENUM('draft', 'pending', 'approved', 'rejected', 'fulfilled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE CASCADE
);

-- 4. Requisition Items Table
CREATE TABLE requisition_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    req_id INT NOT NULL,
    description TEXT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NULL,
    total_price DECIMAL(12, 2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (req_id) REFERENCES requisitions(req_id) ON DELETE CASCADE
);

-- 5. Approvals Table (Tracks the approval workflow)
CREATE TABLE approvals (
    approval_id INT AUTO_INCREMENT PRIMARY KEY,
    req_id INT NOT NULL,
    approver_id INT NOT NULL,
    decision ENUM('approved', 'rejected', 'pending') DEFAULT 'pending',
    comments TEXT NULL,
    approved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (req_id) REFERENCES requisitions(req_id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 6. Notifications Table
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    status ENUM('sent', 'read') DEFAULT 'sent',
    link VARCHAR(255) NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 7. Audit Logs Table (Tracks all important user actions)
CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 8. Suppliers Table
CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100) NULL,
    email VARCHAR(100) NULL,
    phone VARCHAR(20) NULL,
    address TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 9. Procurement Table - Links approved req to a supplier
CREATE TABLE procurement (
    procurement_id INT AUTO_INCREMENT PRIMARY KEY,
    req_id INT NOT NULL UNIQUE,
    supplier_id INT NULL,
    assigned_by INT NOT NULL,
    expected_delivery_date DATE NULL,
    notes TEXT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (req_id) REFERENCES requisitions(req_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_by) REFERENCES users(user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_requisitions_status ON requisitions(status);
CREATE INDEX idx_requisitions_dept_id ON requisitions(dept_id);
CREATE INDEX idx_requisitions_user_id ON requisitions(user_id);
CREATE INDEX idx_approvals_req_id ON approvals(req_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Insert sample departments for Shurugwi Town Council
INSERT INTO departments (dept_name, description) VALUES
('Administration', 'General administrative functions and office management'),
('Finance', 'Financial management, budgeting, and accounting'),
('Public Works', 'Infrastructure development and maintenance'),
('Water & Sanitation', 'Water supply and sanitation services'),
('Engineering', 'Technical engineering and project management'),
('Planning & Development', 'Urban planning and development control'),
('Health Services', 'Public health and environmental health'),
('Education', 'Educational facilities and services'),
('Security', 'Municipal security and law enforcement'),
('Procurement', 'Procurement and supply chain management');

-- Insert sample admin user (password: admin123)
INSERT INTO users (username, name, email, password, role, dept_id) VALUES
('admin', 'System Administrator', 'admin@shurugwi.gov.zw', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 1);

-- Display success message
SELECT 'Database setup completed successfully!' as message;
SELECT 'Sample departments and admin user created.' as info;
SELECT 'Admin login: admin@shurugwi.gov.zw / admin123' as credentials;
