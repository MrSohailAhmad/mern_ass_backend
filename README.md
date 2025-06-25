# 🩺 MERN Appointment Management System

A full-stack appointment booking system built with the **MERN stack** (MongoDB, Express.js, React, Node.js) and **TypeScript**, featuring:

- 🔐 JWT-based authentication with user and admin roles
- 🧑‍⚕️ Doctor management (CRUD with availability)
- 📅 Appointment scheduling with email confirmation (dummy)
- 📊 Admin dashboard
- 📈 Pagination & search support
- 🛡 Rate-limiting on login

---

## 📌 Project Overview

This application allows:

- Users to browse doctors, book appointments, and view their history
- Admins to manage doctors and appointments from a protected dashboard

---

## 🚀 Technologies Used

### Backend:

- Node.js, Express.js, MongoDB, Mongoose
- TypeScript
- JWT for Auth
- Swagger for API docs
- Express Rate Limit

### Frontend:

- React, Vite, TypeScript
- React Router DOM
- Ant Design UI
- Axios with auth interceptors
- Context API for auth state

---

## ⚙️ Setup Instructions

### 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

> The backend will run at `http://localhost:3000`

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

> The frontend will run at `http://localhost:5173`

---

## 🔐 Environment Variables

### 📁 Backend `.env`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/appointments
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

### 📁 Frontend `.env`

```
VITE_BACKEND_URL=http://localhost:3000/api
```

> ⚠️ Remember: Vite env vars must start with `VITE_`

---

## 🛣️ API Documentation (Brief)

| Method | Endpoint                       | Description                             | Access |
| ------ | ------------------------------ | --------------------------------------- | ------ |
| POST   | `/api/auth/register`           | Register a new user                     | Public |
| POST   | `/api/auth/login`              | Login and get access token              | Public |
| GET    | `/api/auth/me`                 | Get current user info                   | Auth   |
| GET    | `/api/users`                   | Get all users (except self)             | Admin  |
| GET    | `/api/doctors`                 | Get doctors (search + pagination)       | Auth   |
| POST   | `/api/doctors`                 | Create new doctor                       | Admin  |
| PUT    | `/api/doctors/:id`             | Update doctor                           | Admin  |
| DELETE | `/api/doctors/:id`             | Delete doctor                           | Admin  |
| POST   | `/api/appointments`            | Book appointment                        | Auth   |
| GET    | `/api/appointments`            | View appointments (admin/user filtered) | Auth   |
| PATCH  | `/api/appointments/:id/status` | Update appointment status               | Admin  |

---

## 📑 API Documentation (Full)

➡ Visit [Swagger UI](http://localhost:5000/api/docs) after running backend.

---

## 📦 Folder Structure

### 🖥 Backend (`/backend`)

```
src/
├── controllers/      # Route handlers
├── models/           # Mongoose schemas
├── routes/           # Route files
├── middleware/       # Auth, role, rate-limit
├── config/           # DB connection, Swagger setup
└── server.ts         # Entry point
```

### 🌐 Frontend (`/frontend`)

```
src/
├── pages/            # Login, Register, Dashboard, etc.
├── components/       # Reusable UI (layouts, navbar, etc.)
├── routes/           # Protected routes
├── context/          # Auth context
├── services/         # Axios instance + APIs
├── interface/        # TypeScript interfaces
└── AppRoutes.tsx     # Role-based route manager
```

---

## ✅ Features

- 🧑‍⚕️ Doctor CRUD with availability
- 📅 Book appointment with date & time
- 🧑‍💼 Admin dashboard
- 🔐 Role-based auth with JWT
- 📄 Swagger API docs
- 📩 Email confirmation (dummy)
- 🔎 Search & filter doctors
- 📃 Pagination for doctors and users
- 🛡 Rate-limiting on login

---

## 📌 Future Enhancements

- Real email integration (Nodemailer or SendGrid)
- Stripe payment integration
- Responsive mobile layout
- Admin charts & analytics dashboard
- User deactivation / blocking

---

## 🧑‍💻 Author

Developed by **Muhammad Sohail**  
[GitHub](https://github.com/sohaildev7) | [LinkedIn](https://linkedin.com/in/your-profile)
