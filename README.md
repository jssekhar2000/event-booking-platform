# 🎟️ Multi-Vendor Event Booking Platform

A full-stack event booking application where users can explore and book events, vendors can manage their own events, and admins can moderate and control the platform.

---

## 🚀 Live Preview

[🔗 Live Demo](https://multi-vendor-event-booking-platform.vercel.app/)

---

## 🧱 Tech Stack

| Layer         | Tech Used                           |
|---------------|-------------------------------------|
| Frontend      | **Next.js 14+ (App Router)**        |
| Styling       | **Tailwind CSS**                    |
| Backend       | **Node.js** with **Express.js**     |
| Database      | **PostgreSQL**                      |
| Auth          | **JWT**     |
| API Client    | **Axios**                           |
| Deployment    | **Vercel** (Frontend) / **Railway** (Backend)

---

## 🧩 Features

### 👤 User
- Register, login, logout
- View all upcoming events
- Book and cancel events
- Personal booking history

### 🧑‍💼 Vendor
- Register as a vendor
- Add, update, and delete events
- See bookings made on their events
- Vendor dashboard

### 👮 Admin
- Approve or reject vendor-submitted events
- Manage all users, vendors, and events
- Admin dashboard for complete moderation

---

## 🗂️ Folder Structure

```
event-booking-platform/
├── client/                  # Frontend (Next.js + Tailwind)
│   ├── app/                 # App Router pages and layouts
│   ├── components/          # Reusable UI
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Axios config, constants
│   └── .env.local           # Environment file (not committed)
│
├── server/                  # Backend (Node.js + Express.js)
│   ├── controllers/         # Logic for each route
│   ├── routes/              # API endpoints
│   ├── models/              # Database schema (Prisma or Sequelize)
│   ├── middleware/          # Role-based access, auth
│   ├── utils/               # Email service, token helpers, etc.
│   └── .env                 # Environment file (not committed)
│
├── README.md                # This file
└── LICENSE
```

---

## ⚙️ Local Setup Instructions

> You need Node.js installed and PostgreSQL running locally or via service like Supabase/Render.

---

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/jssekhar2000/event-booking-platform.git
cd event-booking-platform
```

---

### 🖥️ 2. Setup Backend (server)

```bash
cd server
npm install
```

#### Configure `.env` file:

```env
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/event-booking
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

#### Run the server:

```bash
npm start
```

By default, your backend will run on `http://localhost:5000`.

---

### 💻 3. Setup Frontend (client)

```bash
cd ../client
npm install
```

#### Configure `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

#### Run the frontend:

```bash
npm run dev
```

Your frontend will run on `http://localhost:3000`.

---

## 🔐 Authentication & Roles

- All routes are protected via role-based middleware.
- Users can only view/book events.
- Vendors can only manage their own events.
- Admins have full access to all resources.

---

## 📧 Email Notifications

- Email confirmation is triggered upon event booking.
- You can configure this using Nodemailer or SendGrid inside the `utils/email.js`.

---

## 📝 API Routes Overview (Backend)

Here are some key routes provided by the backend:

| Route                     | Method | Access    |
|--------------------------|--------|-----------|
| `/api/auth/register`     | POST   | Public    |
| `/api/auth/login`        | POST   | Public    |
| `/api/events`            | GET    | Public    |
| `/api/events/:id`        | GET    | Public    |
| `/api/bookings`          | POST   | User      |
| `/api/vendor/events`     | GET    | Vendor    |
| `/api/admin/users`       | GET    | Admin     |

## Postman Collection

📬 [Click here to download Postman collection](server/docs/EventBookingAPI.postman_collection.json)


---


## 🧠 Developer Notes

- Built with modern **Next.js App Router** and modular file structure.
- Implemented reusable components and hooks for DRY code.
- Uses **dynamic routing** and **Incremental Static Regeneration (ISR)** for event details page.
- Separation of client/server axios ensures clean boundary between environments.

---


## 🧑‍💻 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit and push (`git commit -m 'Add new feature'`)
4. Submit a Pull Request 🚀

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE)

---

## 📬 Contact

Made by **Sekhar Mohanta**  
Connect with me:
- [LinkedIn](https://www.linkedin.com/in/sekhar-mohanta-12ab48234/)
- [GitHub](https://github.com/jssekhar2000)

---
