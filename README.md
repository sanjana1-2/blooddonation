# 🩸 Blood Donation Portal (RaktSeva)

A professional healthcare platform designed to streamline blood donation management. This project is a modernized implementation of a blood donation portal, featuring a premium glassmorphism UI, real-time tracking, and role-based access control.

## 🎯 Project Overview

This portal serves as a comprehensive bridge between donors, hospitals, and blood banks. It provides a centralized system for tracking blood availability, managing donor profiles, and handling emergency blood requests with a focus on speed and reliability.

### Key Capabilities
- **Real-time Inventory**: Live tracking of blood units across various blood banks.
- **Donor Management**: Secure registration and digital donor card generation.
- **Emergency Requests**: Urgent blood request system with priority handling.
- **Interactive Analytics**: Data-driven insights for administrators to monitor donation trends.
- **Responsive Design**: Fully optimized for mobile and desktop access.

## 🛠️ Technology Stack

### Frontend
- **React 18**: Core UI library.
- **Vite**: Build tool for rapid development.
- **Redux Toolkit**: State management.
- **Framer Motion**: Smooth animations and transitions.
- **Tailwind CSS**: Utility-first styling with custom glassmorphism effects.
- **Chart.js**: Interactive data visualization.
- **Leaflet**: Integrated maps for location services.

### Backend
- **Node.js & Express**: Scalable backend architecture.
- **MongoDB & Mongoose**: Flexible NoSQL data storage.
- **JWT & Bcrypt**: Secure authentication and password protection.
- **Socket.io**: Real-time updates and notifications.

## 📁 Project Structure

```
├── clientside/         # Frontend React Application
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   └── ...
├── serverside/         # Backend Node.js Application
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or via Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanjana1-2/blooddonation.git
   cd blooddonation
   ```

2. **Frontend Setup**
   ```bash
   cd clientside
   npm install
   ```

3. **Backend Setup**
   ```bash
   cd ../serverside
   npm install
   ```

4. **Environment Configuration**
   Create a `.env` file in the `serverside` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/blooddonation
   JWT_SECRET=your_secret_key
   PORT=5001
   ```

5. **Seed Initial Data (Optional)**
   ```bash
   node seed.js
   ```

### Running the Application

Start the backend (from the `serverside` directory):
```bash
npm run dev
```

Start the frontend (from the `clientside` directory):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 👥 Demo Access

For testing purposes, you can use the following credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@RaktSeva.in` | `admin123` |
| **Donor** | `donor@RaktSeva.in` | `donor123` |
| **Hospital** | `hospital@RaktSeva.in` | `hospital123` |

## 📁 Project Structure

```
├── src/                # Frontend source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── services/       # API integration
│   └── store/          # Redux state management
├── serverside/             # Backend source code
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
└── public/             # Static assets
```

## 🛡️ Security Features
- Secure password hashing using Bcrypt.
- Protected API endpoints using JWT.
- Role-based Access Control (RBAC).
- Sanitized user inputs to prevent injection attacks.

## 📝 License
This project is for educational and portfolio purposes.

---
**Saving lives through technology.**
