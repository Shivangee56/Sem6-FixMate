# 🛠️ FixMate Backend

Complete MERN backend for worker-finder platform.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure .env (already created with defaults!)
# For MongoDB Atlas, update MONGO_URI in .env

# 3. Start MongoDB (if using local)
mongod

# 4. Run server
npm run dev
```

Server runs on: http://localhost:5000

## 🧪 Test

```bash
# Health check
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/auth/register/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"9876543210","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login/user \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📚 API Routes

- POST `/api/auth/register/user` - Register user
- POST `/api/auth/login/user` - Login user
- GET `/api/auth/me` - Get profile (protected)
- GET `/api/workers` - Get all workers
- POST `/api/jobs` - Create job (user only)

## ✨ Features

✅ User & Worker authentication  
✅ JWT security  
✅ Real-time Socket.IO  
✅ MongoDB with Mongoose  
✅ Rate limiting  
✅ CORS & Helmet security  

## 📁 Structure

```
fixmate-backend/
├── server.js         # Main app
├── config/           # DB, Socket.IO
├── models/           # User, Worker, Job
├── routes/           # API routes
├── controllers/      # Business logic
└── middleware/       # Auth
```

## 🔧 Environment

The .env file is pre-configured. Update:
- `MONGO_URI` for MongoDB Atlas
- Other services as needed

Built with ❤️ using Node.js + Express + MongoDB
