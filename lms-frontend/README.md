# LMS Frontend - Learning Management System

A modern, full-featured Learning Management System (LMS) frontend application built with React, Redux Toolkit, and Tailwind CSS. This application provides a comprehensive platform for course management, user authentication, payment processing, and administrative analytics.

## 🚀 Features & Functionalities

### 1. Authentication & Authorization

#### User Authentication
- **User Registration**: Secure sign-up process with form validation
- **User Login**: Secure login with session management
- **Role-Based Access Control**: Support for multiple user roles (ADMIN, USER)
- **Protected Routes**: Route protection based on authentication status and user roles
- **Session Management**: Persistent user sessions with Redux state management
- **Access Denied Handling**: Dedicated page for unauthorized access attempts

### 2. Course Management

#### Course Discovery
- **Course Listing**: Browse all available courses with course cards
- **Course Details**: Comprehensive course description pages with:
  - Course thumbnail images
  - Course title and description
  - Instructor information
  - Total number of lectures
  - Course category

#### Course Administration (Admin Only)
- **Create Courses**: Full course creation interface with:
  - Course title and description
  - Category assignment
  - Instructor name
  - Thumbnail image upload with preview
  - Form validation
- **Delete Courses**: Remove courses with confirmation dialog
- **Course Overview Table**: Admin dashboard with complete course listing including:
  - Course serial numbers
  - Course titles and categories
  - Instructor names
  - Total lecture counts
  - Course descriptions
  - Quick action buttons

### 3. Lecture Management

#### Lecture Administration (Admin Only)
- **Add Lectures**: Upload and manage course lectures with:
  - Lecture title and description
  - Video file upload (MP4 format)
  - Video preview before submission
  - Course association
- **Display Lectures**: View all lectures for enrolled courses
- **Video Playback**: Secure video player with controls
- **Lecture Organization**: Lectures organized by course

### 4. User Profile Management

#### Profile Features
- **View Profile**: Display user information including:
  - User avatar/profile picture
  - Full name
  - Email address
  - User role
  - Subscription status
- **Edit Profile**: Update user profile information
- **Change Password**: Secure password change functionality
- **Subscription Management**: View and manage course subscriptions
- **Subscription Cancellation**: Cancel active subscriptions

### 5. Payment Integration

#### Razorpay Payment Gateway
- **Secure Checkout**: Integrated Razorpay payment gateway
- **Course Subscription**: One-click subscription to access all courses
- **Payment Verification**: Server-side payment verification with signature validation
- **Payment Success Handling**: Dedicated success page after successful payment
- **Payment Failure Handling**: Error handling and failure page for failed transactions
- **Subscription Status Tracking**: Real-time subscription status updates

### 6. Admin Dashboard & Analytics

#### Statistics & Analytics
- **User Statistics**: 
  - Total registered users count
  - Subscribed users count
  - Visual representation with Pie charts
- **Sales Analytics**:
  - Monthly sales data visualization
  - Bar charts for sales trends
  - Subscription count tracking
  - Total revenue calculation
- **Data Visualization**: 
  - Interactive Pie charts (Chart.js)
  - Bar charts for monthly sales
  - Real-time data updates

#### Dashboard Features
- **Course Management Interface**: Complete course overview table
- **Quick Actions**: Create new courses directly from dashboard
- **Real-time Updates**: Live statistics and data refresh
- **Responsive Design**: Optimized for various screen sizes

### 7. User Interface & Experience

#### Design & Styling
- **Modern UI**: Built with Tailwind CSS and DaisyUI components
- **Responsive Design**: Mobile-first approach, works on all devices
- **Dark Theme**: Professional dark theme with yellow accent colors
- **Smooth Animations**: Transition effects and hover states
- **Toast Notifications**: User-friendly notifications using react-hot-toast

#### Navigation & Layout
- **Home Layout**: Consistent layout wrapper with:
  - Responsive navigation menu
  - Footer component
  - Dynamic menu based on authentication status
- **Navigation Menu**: 
  - Home page link
  - All courses link
  - Contact page link
  - About us page link
  - Login/Signup buttons (for unauthenticated users)
  - Profile/Logout buttons (for authenticated users)
- **Breadcrumb Navigation**: Easy navigation between pages

### 8. Additional Pages

#### Informational Pages
- **Home Page**: 
  - Hero section with call-to-action buttons
  - Course library promotion
  - Contact and explore course links
- **About Us**: Information about the platform
- **Contact**: Contact page for user inquiries
- **404 Not Found**: Custom 404 error page
- **Access Denied**: Dedicated page for unauthorized access

### 9. State Management

#### Redux Toolkit Integration
- **Auth Slice**: User authentication state management
- **Course Slice**: Course data and operations
- **Lecture Slice**: Lecture data management
- **Razorpay Slice**: Payment and subscription state
- **Statistics Slice**: Admin dashboard statistics
- **Centralized Store**: Single source of truth for application state

### 10. API Integration

#### Backend Communication
- **Axios Instance**: Configured HTTP client with interceptors
- **API Endpoints**: Integration with backend REST API
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: User feedback during API calls

### 11. Security Features

#### Security Implementation
- **Route Protection**: Protected routes based on authentication and roles
- **Payment Security**: Secure payment processing with signature verification
- **Input Validation**: Form validation and sanitization
- **Secure File Uploads**: Image and video upload handling

### 12. Developer Experience

#### Code Quality & Tools
- **ESLint**: Code linting and quality checks
- **React Router**: Client-side routing
- **React Icons**: Comprehensive icon library
- **Vite**: Fast build tool and development server
- **Hot Module Replacement**: Fast development experience

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.0
- **State Management**: Redux Toolkit 2.11.0
- **Routing**: React Router DOM 7.9.6
- **Styling**: Tailwind CSS 4.1.17, DaisyUI 5.5.5
- **HTTP Client**: Axios 1.13.2
- **Charts**: Chart.js 4.5.1, React-ChartJS-2 5.3.1
- **Notifications**: React Hot Toast 2.6.0
- **Icons**: React Icons 5.5.0
- **Build Tool**: Vite 7.2.4
- **Payment Gateway**: Razorpay Integration


## 🎯 User Roles

### Regular User (USER)
- Browse and view course descriptions
- Subscribe to courses via payment
- Access enrolled course lectures
- Manage profile and subscription
- View personal information

### Administrator (ADMIN)
- All user features plus:
- Create and delete courses
- Add lectures to courses
- View admin dashboard with analytics
- Access user statistics
- Manage sales and revenue data

## 📱 Pages & Routes

- `/` - Home page
- `/about` - About us page
- `/signup` - User registration
- `/login` - User login
- `/course` - Course listing
- `/course/description` - Course details
- `/course/create` - Create course (Admin only)
- `/course/addlecture` - Add lecture (Admin only)
- `/course/displaylectures` - View lectures (Authenticated users)
- `/user/profile` - User profile
- `/user/editprofile` - Edit profile
- `/checkout` - Payment checkout
- `/checkout/success` - Payment success
- `/checkout/fail` - Payment failure
- `/admin/dashboard` - Admin dashboard (Admin only)
- `/contact` - Contact page
- `/denied` - Access denied page
- `*` - 404 Not Found page

## 🔐 Authentication Flow

1. User registers or logs in
2. Authentication state stored in Redux
3. Protected routes check authentication status
4. Role-based access control for admin features
5. Session persists across page refreshes

## 💳 Payment Flow

1. User selects a course and clicks subscribe
2. Redirected to checkout page
3. Razorpay payment gateway integration
4. Payment verification on server
5. Subscription activation upon successful payment
6. Access granted to all course lectures

## 📊 Admin Dashboard Features

- **User Analytics**: Visual representation of registered vs subscribed users
- **Sales Analytics**: Monthly sales trends with bar charts
- **Revenue Tracking**: Total revenue calculation
- **Course Management**: Complete course overview with CRUD operations
- **Quick Actions**: Create courses directly from dashboard

## 🎨 UI Components

- Course cards with thumbnails
- Responsive navigation menu
- Form inputs with validation
- Video player component
- Chart components (Pie, Bar)
- Toast notifications
- Modal dialogs
- Loading states

## 📝 Notes

- This is the frontend application of the LMS system
- Requires a backend API for full functionality
- Payment integration uses Razorpay gateway
- All admin features require ADMIN role
- Course access requires active subscription




