# 🩺 Backend - MERN Appointment Management System

This is the **backend** part of the MERN Appointment Management System built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**.

---

## 📦 Tech Stack

- Express.js
- MongoDB + Mongoose
- TypeScript
- JWT Authentication
- Swagger for API Docs
- Rate Limiting (Login)
- Role-Based Access (Admin/User)

---

## 🔧 Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

---

### 2. Configure Environment Variables

Create a `.env` file in `/backend` with the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/appointments
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

---

### 3. Run the Development Server

```bash
npm run dev
```

> Server will run at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 API Documentation

Visit:

```
http://localhost:3000/api/docs
```

For Swagger-powered interactive API reference.

---

## 📁 Folder Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.ts
└── .env
```
