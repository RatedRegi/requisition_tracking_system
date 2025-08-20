# Shurugwi Town Council - Requisition Tracking System

A modern, digital requisition tracking system built for Shurugwi Town Council to replace manual processes and streamline procurement operations.

## 🏛️ About

This system is designed specifically for government institutions in Zimbabwe, providing a secure, compliant, and efficient way to manage requisitions from submission to approval. The system replaces traditional paper-based processes with a digital solution that ensures transparency, accountability, and real-time tracking.

## ✨ Features

- **Digital Requisition Management**: Complete digital workflow from submission to approval
- **Department Collaboration**: Seamless communication between departments and stakeholders
- **Real-time Tracking**: Monitor requisition status and progress in real-time
- **Secure & Compliant**: Government-grade security with audit trails
- **User Management**: Role-based access control for different user types
- **Reporting & Analytics**: Comprehensive reporting and analytics dashboard
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 with TypeScript
- **UI Framework**: Tailwind CSS with Radix UI components
- **Authentication**: Laravel Breeze with Inertia.js
- **Database**: MySQL/PostgreSQL (configurable)
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL/PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RatedRegi/requisition_tracking_system.git
   cd requisition-tracking-system
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database**
   
   Edit `.env` file and set your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=requisition_tracking_system
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. **Run migrations**
   ```bash
   php artisan migrate
   ```

7. **Build assets**
   ```bash
   npm run build
   ```

8. **Start development servers**
   
   Start Laravel & Vite dev server:
   ```bash
   composer run dev
   ```

## 📖 Usage

### Accessing the System

1. Navigate to `http://localhost:8000`
2. Click "Sign In" to access the login page
3. Use your credentials to log in
4. Access the dashboard to manage requisitions

## 👥 User Roles

- **Administrators**: Full system access and user management
- **Department Heads**: Approve requisitions within their department
- **Staff Members**: Submit and track requisitions
- **Finance Officers**: Review and process approved requisitions

## 🏗️ System Architecture

### Core Modules

#### Authentication & Authorization
- User registration and login
- Role-based access control
- Password reset functionality

#### Requisition Management
- Create and submit requisitions
- Approval workflow
- Status tracking
- Document attachments

#### Department Management
- Department hierarchy
- User assignments
- Department-specific workflows

#### Reporting & Analytics
- Requisition statistics
- Department performance
- Audit trails
- Export functionality

## 🔒 Security Features

- **Authentication**: Secure login with password hashing
- **Authorization**: Role-based access control
- **Audit Trails**: Complete activity logging
- **Data Encryption**: Sensitive data encryption
- **Session Management**: Secure session handling
- **CSRF Protection**: Cross-site request forgery protection

## 📊 Dashboard Features

The main dashboard provides:

- **Overview Statistics**: Total, pending, approved, and rejected requisitions
- **Quick Actions**: Search, filter, and create new requisitions
- **Recent Activity**: Latest requisition updates
- **Department Overview**: Department-specific statistics
- **Real-time Updates**: Live status updates

## �� Customization

### Branding

The system is customized for Shurugwi Town Council with:

- Council branding and colors
- Government of Zimbabwe references
- Professional government-grade appearance

### Configuration

Key configuration files:

- `.env`: Environment variables
- `config/app.php`: Application settings
- `tailwind.config.js`: UI customization
- `vite.config.ts`: Build configuration

## 📝 License

This project is developed for Shurugwi Town Council and is proprietary software.

## 🤝 Support

For technical support or questions:

- **Contact**: IT Department
- **Email**: it@shurugwi.gov.zw
- **Phone**: +263 782 143 404

## 🔄 Updates

Regular updates will be provided to:

- Improve security
- Add new features
- Fix bugs
- Enhance performance

---

**Developed for Shurugwi Town Council**  
*Government of Zimbabwe*