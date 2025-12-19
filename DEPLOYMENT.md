# Deployment Guide - eRaktkosh Blood Donation Portal

This guide will help you deploy your eRaktkosh portal to production using Vercel for frontend and Railway/Render for backend.

## 🚀 Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your code pushed to GitHub repository

### Step 1: Deploy to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository: `sanjana1-2/blooddonation`
   - Click "Import"

3. **Configure Build Settings**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Set Environment Variables**
   - Add environment variable:
     - Name: `VITE_API_URL`
     - Value: `https://your-backend-url.com/api` (update after backend deployment)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be live at: `https://your-project-name.vercel.app`

### Step 2: Update API URL After Backend Deployment

Once your backend is deployed, update the environment variable:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Edit `VITE_API_URL` with your actual backend URL
3. Redeploy the project

## 🖥️ Backend Deployment Options

### Option 1: Railway (Recommended)

1. **Visit Railway**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `server` folder as root directory

3. **Set Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eraktkosh
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5001
   NODE_ENV=production
   ```

4. **Configure Build**
   - Build Command: `npm install`
   - Start Command: `npm start`

### Option 2: Render

1. **Visit Render**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Set Root Directory: `server`

3. **Configure Service**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables (same as Railway)

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster

1. **Visit MongoDB Atlas**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free account

2. **Create Cluster**
   - Choose "Build a Database"
   - Select "M0 Sandbox" (Free tier)
   - Choose your preferred region
   - Create cluster

3. **Setup Database Access**
   - Go to "Database Access"
   - Add new database user
   - Set username and password
   - Grant "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)
   - Or add specific IPs for better security

5. **Get Connection String**
   - Go to "Databases" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### Step 2: Seed Production Database

1. **Update Connection String**
   - Update `server/.env` with Atlas connection string
   - Run seeding script: `node server/seed.js`

## 🔧 Environment Variables Summary

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (server/.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eraktkosh
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
PORT=5001
NODE_ENV=production
```

## 🚀 Complete Deployment Checklist

### ✅ Pre-deployment
- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] Build process verified locally

### ✅ Backend Deployment
- [ ] MongoDB Atlas cluster created
- [ ] Database seeded with initial data
- [ ] Backend deployed to Railway/Render
- [ ] API endpoints tested
- [ ] Environment variables set

### ✅ Frontend Deployment
- [ ] Vercel project created
- [ ] Build settings configured
- [ ] API URL environment variable set
- [ ] Deployment successful
- [ ] Frontend connects to backend

### ✅ Post-deployment Testing
- [ ] Login functionality works
- [ ] Admin panel accessible
- [ ] Data operations (CRUD) working
- [ ] Responsive design on mobile
- [ ] All pages load correctly

## 🌐 Final URLs

After successful deployment, you'll have:

- **Frontend**: `https://your-project-name.vercel.app`
- **Backend API**: `https://your-backend-name.railway.app` or `https://your-backend-name.onrender.com`
- **Database**: MongoDB Atlas cluster

## 🔐 Demo Accounts (Production)

Remember to update these credentials for production:

- **Admin**: admin@eraktkosh.in / admin123
- **Donor**: donor@eraktkosh.in / donor123
- **Hospital**: hospital@eraktkosh.in / hospital123

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure backend CORS is configured for your frontend domain
   - Add your Vercel URL to CORS origins

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_` for frontend
   - Redeploy after adding environment variables

3. **Database Connection Issues**
   - Check MongoDB Atlas network access settings
   - Verify connection string format
   - Ensure database user has proper permissions

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check for any missing environment variables

## 📞 Support

If you encounter issues:
1. Check deployment logs in Vercel/Railway dashboard
2. Verify environment variables are set correctly
3. Test API endpoints directly
4. Check browser console for frontend errors

---

**Happy Deploying! 🚀**