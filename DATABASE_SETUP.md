# Database Setup Guide - Shurugwi Town Council Requisition Tracking System

## Overview

This guide will help you set up the database for the Shurugwi Town Council Requisition Tracking System.

## Prerequisites

- MySQL 8.0+ or MariaDB 10.5+
- PHP 8.2+
- Composer
- Node.js 18+

## Setup Options

### Option 1: Using Laravel Migrations (Recommended)

1. **Configure your database connection** in `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=requisition_tracking_system
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

2. **Run Laravel migrations**:
   ```bash
   php artisan migrate
   ```

3. **Seed the database with sample data**:
   ```bash
   php artisan db:seed
   ```

### Option 2: Using SQL Script

1. **Create the database manually**:
   ```sql
   CREATE DATABASE requisition_tracking_system;
   ```

2. **Run the setup script**:
   ```bash
   mysql -u your_username -p requisition_tracking_system < setup_database.sql
   ```

## Database Schema

The system includes the following tables:

### Core Tables
- **departments** - Shurugwi Town Council departments
- **users** - System users with roles (requester, approver, procurement, admin)
- **requisitions** - Main requisition records
- **requisition_items** - Individual items within requisitions

### Workflow Tables
- **approvals** - Approval workflow tracking
- **notifications** - User notifications
- **audit_logs** - Security audit trail

### Procurement Tables
- **suppliers** - Supplier information
- **procurement** - Procurement assignments

## Sample Data

The system comes with pre-loaded sample data:

### Departments
1. Administration
2. Finance
3. Public Works
4. Water & Sanitation
5. Engineering
6. Planning & Development
7. Health Services
8. Education
9. Security
10. Procurement

### Sample Users
- **Admin**: admin@shurugwi.gov.zw / admin123
- **Finance Head**: finance@shurugwi.gov.zw / finance123
- **Procurement Officer**: procurement@shurugwi.gov.zw / procurement123
- **Public Works Staff**: publicworks@shurugwi.gov.zw / works123
- **Water & Sanitation Staff**: water@shurugwi.gov.zw / water123

## User Roles

- **requester**: Can create and track requisitions
- **approver**: Can approve/reject requisitions
- **procurement**: Can assign suppliers and manage procurement
- **admin**: Full system access

## Security Features

- Password hashing using Laravel's bcrypt
- Role-based access control
- Audit logging for all user actions
- IP address tracking for security
- Session management

## Performance Optimizations

The database includes indexes on:
- Requisition status, department, and user
- Approval requests
- Notifications by user
- Audit logs by user and date

## Troubleshooting

### Common Issues

1. **Migration fails**: Ensure your database user has CREATE, ALTER, and DROP privileges
2. **Foreign key errors**: Make sure to run migrations in the correct order
3. **Connection issues**: Verify database credentials in `.env` file

### Reset Database

To completely reset the database:
```bash
php artisan migrate:fresh --seed
```

## Support

For technical support:
- Contact the IT Department
- Email: it@shurugwi.gov.zw

---

**Developed for Shurugwi Town Council**  
*Government of Zimbabwe*
