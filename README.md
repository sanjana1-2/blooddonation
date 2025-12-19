# eRaktkosh Clone - Blood Donation Portal

A comprehensive React-based clone of the eRaktkosh portal, India's blood donation management system with modern features and enterprise-level functionality.

## 🚀 Features

### Core Functionality
- **🏠 Home Page**: Hero section with real-time statistics and services overview
- **🏥 Blood Banks**: Search and locate nearby blood banks with live availability
- **👤 Donor Management**: Complete registration and profile management system
- **🩸 Blood Availability**: Real-time blood stock tracking across locations
- **🚨 Emergency Requests**: Urgent blood request system with notifications
- **📊 Analytics Dashboard**: Comprehensive charts and statistics (Admin only)

### Advanced Features
- **🔐 Authentication System**: JWT-based login with role-based access control
- **👑 Admin Panel**: Full CRUD operations for system management
- **🔔 Notification Center**: Real-time notifications and alerts
- **📱 QR Code Generation**: Digital donor cards and request tracking
- **🎨 Modern UI**: Responsive design with maroon color scheme
- **🛡️ Protected Routes**: Role-based navigation and permissions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **Chart.js** - Data visualization
- **React QR Code** - QR code generation
- **React Toastify** - Notifications
- **Vite** - Fast build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sanjana1-2/blooddonation.git
cd blooddonation
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Set up environment variables**
```bash
# Create server/.env file
cd server
echo MONGODB_URI=mongodb://localhost:27017/eraktkosh > .env
echo JWT_SECRET=your_jwt_secret_key >> .env
echo PORT=5001 >> .env
```

5. **Seed the database**
```bash
cd server
node seed.js
```

6. **Start the application**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

7. **Access the application**
- Frontend: http://localhost:5173/
- Backend API: http://localhost:5001/

## 👤 Demo Accounts

### Admin Account (Full Access)
- **Email**: `admin@eraktkosh.in`
- **Password**: `admin123`
- **Permissions**: Complete system control

### Donor Account (View Only)
- **Email**: `donor@eraktkosh.in`
- **Password**: `donor123`
- **Permissions**: View-only access

### Hospital Account (View Only)
- **Email**: `hospital@eraktkosh.in`
- **Password**: `hospital123`
- **Permissions**: View-only access

## 📁 Project Structure

```
eraktkosh-clone/
├── src/                          # Frontend source
│   ├── components/               # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── NotificationCenter.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/                    # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Analytics.jsx
│   │   ├── DonorProfile.jsx
│   │   └── ...
│   ├── services/                 # API services
│   ├── utils/                    # Utility functions
│   └── App.jsx                   # Main app component
├── server/                       # Backend source
│   ├── models/                   # Database models
│   │   ├── User.js
│   │   ├── Donor.js
│   │   ├── BloodBank.js
│   │   └── BloodRequest.js
│   ├── routes/                   # API routes
│   │   ├── auth.js
│   │   ├── donors.js
│   │   ├── bloodbanks.js
│   │   └── requests.js
│   ├── seed.js                   # Database seeding
│   └── server.js                 # Express server
└── README.md
```

## 🔑 Key Features Breakdown

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Donor, Hospital)
- Protected routes and API endpoints
- Password hashing with bcrypt

### Admin Capabilities
- ✅ Full CRUD operations on all data
- ✅ Analytics dashboard with charts
- ✅ User management
- ✅ System-wide notifications
- ✅ Blood bank inventory management

### User Capabilities
- ✅ View donor profiles and blood banks
- ✅ Register as blood donor
- ✅ Submit emergency blood requests
- ✅ Access notification center
- ❌ No edit/delete permissions

### Data Management
- Real-time blood inventory tracking
- Donor profile management with QR codes
- Blood request lifecycle management
- Analytics and reporting

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy server/ folder
```

### Database (MongoDB Atlas)
- Create MongoDB Atlas cluster
- Update MONGODB_URI in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is for educational purposes and is inspired by the official eRaktkosh portal.

## 🙏 Acknowledgments

- Original eRaktkosh portal by Ministry of Health and Family Welfare, India
- React and Node.js communities
- MongoDB for database solutions

## 📞 Support

For support, email sanjana@example.com or create an issue in this repository.

---

**Made with ❤️ for the blood donation community**