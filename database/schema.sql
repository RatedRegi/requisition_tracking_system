-- Shurugwi Town Council Requisition Tracking System Database Schema
-- Created for: Shurugwi Town Council
-- Government of Zimbabwe

-- Create the database
CREATE DATABASE IF NOT EXISTS requisition_tracking_system;
USE requisition_tracking_system;

-- 1. Departments Table
CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords
    role ENUM('requester', 'approver', 'procurement', 'admin') NOT NULL,
    dept_id INT NULL, -- A user might belong to a department
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
);

-- 3. Requisitions Table (Core Table)
CREATE TABLE requisitions (
    req_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- The person who created the requisition
    dept_id INT NOT NULL, -- The department making the request
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
    unit_price DECIMAL(10, 2) NULL, -- Estimated cost per unit
    total_price DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED, -- Calculated field
    FOREIGN KEY (req_id) REFERENCES requisitions(req_id) ON DELETE CASCADE
);

-- 5. Approvals Table (Tracks the approval workflow)
CREATE TABLE approvals (
    approval_id INT AUTO_INCREMENT PRIMARY KEY,
    req_id INT NOT NULL,
    approver_id INT NOT NULL, -- The user who made the decision
    decision ENUM('approved', 'rejected', 'pending') DEFAULT 'pending',
    comments TEXT NULL,
    approved_at TIMESTAMP NULL, -- Timestamp when decision was made
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (req_id) REFERENCES requisitions(req_id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 6. Notifications Table
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- The recipient
    message TEXT NOT NULL,
    status ENUM('sent', 'read') DEFAULT 'sent',
    link VARCHAR(255) NULL, -- Optional link to a relevant page (e.g., /requisitions/45)
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 7. Audit Logs Table (Tracks all important user actions)
CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL, -- e.g., 'Created Requisition #104', 'Approved Requisition #87'
    ip_address VARCHAR(45) NULL, -- Store the user's IP for security
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 8. Suppliers Table
CREATE TABLE suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Procurement Table - Links approved req to a supplier
CREATE TABLE procurement (
    procurement_id INT AUTO_INCREMENT PRIMARY KEY,
    req_id INT NOT NULL UNIQUE, -- One-to-one with an approved requisition
    supplier_id INT NULL,
    assigned_by INT NOT NULL, -- The procurement officer who assigned it
    expected_delivery_date DATE NULL,
    notes TEXT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (req_id) REFERENCES requisitions(req_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE SET NULL,
    FOREIGN KEY (assigned_by) REFERENCES users(user_id)
);

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

-- Insert sample admin user (password: admin123 - should be hashed in production)
INSERT INTO users (username, email, password, role, dept_id) VALUES
('admin', 'admin@shurugwi.gov.zw', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 1);

-- Create indexes for better performance
CREATE INDEX idx_requisitions_status ON requisitions(status);
CREATE INDEX idx_requisitions_dept_id ON requisitions(dept_id);
CREATE INDEX idx_requisitions_user_id ON requisitions(user_id);
CREATE INDEX idx_approvals_req_id ON approvals(req_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
