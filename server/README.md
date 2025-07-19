# 🎉 Multi-Vendor Event Booking Platform – Backend

This is the **backend server** for the Multi-Vendor Event Booking Platform, built with:

- ✅ Node.js
- ✅ Express.js
- ✅ Prisma ORM
- ✅ PostgreSQL
- ✅ JWT-based authentication

It includes full support for:
- 👤 Users (attendees)
- 🧑‍💼 Vendors (event organizers)
- 🛡️ Admins (platform moderators)

---

## 🚀 Features

- 🔐 User, Vendor, Admin authentication
- 🎟️ Event creation, management, and booking
- 📊 Vendor dashboards
- 📥 Admin moderation tools (approve/reject events)
- 🔄 Role-based access control
- ✅ Secure booking with available ticket handling
- 📦 Modular project structure (routes/controllers/middleware)

---

## ⚙️ Setup Instructions

### 1. 📥 Clone the Project

```bash
git clone https://github.com/jssekhar2000/event-booking-platform.git
cd server
```

---

### 2. 📦 Install Dependencies

```bash
npm install
```

---

### 3. 🔐 Setup Environment Variables

Create a `.env` file in the `/server` directory:

```env
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>?sslmode=require
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

> 🔐 Use a Gmail **App Password** instead of your real password. [How to get it?](https://support.google.com/accounts/answer/185833)

---

### 4. 🧬 Prisma Setup

#### Generate & Migrate DB

```bash
npx prisma migrate dev --name init
```

#### (Optional) Open Prisma Studio

```bash
npx prisma studio
```

Use this to view and edit data visually (like a DB admin panel).

---

### 5. 🚀 Run the Server

```bash
npm start
```

By default, your server will be running at:

```
http://localhost:5000
```

---

## 🔗 API Endpoints

### 🔐 Auth

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `/api/auth/register`  | Register as USER/VENDOR    |
| POST   | `/api/auth/login`     | Login and get token        |

---

### 🧑 Vendor APIs

| Method | Endpoint                      | Description                    |
|--------|-------------------------------|--------------------------------|
| GET    | `/api/vendor/events`          | List vendor's own events       |
| POST   | `/api/vendor/events`          | Create new event               |
| PUT    | `/api/vendor/events/:id`      | Update existing event          |
| DELETE | `/api/vendor/events/:id`      | Delete an event                |

---

### 👤 User APIs

| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| GET    | `/api/events`         | List all public events           |
| GET    | `/api/events/:id`     | Get details of a specific event |
| POST   | `/api/bookings`       | Book an event                    |
| GET    | `/api/bookings`       | List user's bookings             |

---

### 🛡️ Admin APIs

| Method | Endpoint                          | Description                         |
|--------|-----------------------------------|-------------------------------------|
| GET    | `/api/admin/events`               | View all events                     |
| PUT    | `/api/admin/events/:id/approve`   | Approve or reject an event          |
| GET    | `/api/admin/users`                | View all users and vendors          |

---

## 🗂 Project Structure

```
server/
├── controllers/        # Route logic
├── middlewares/        # Auth / role guards
├── routes/             # API endpoints
├── utils/              # Nodemailer, helpers
├── prisma/             # Prisma schema and client
├── .env                # Environment variables
├── app.js              # App configuration
├── index.js            # Server entry point
└── package.json
```

---

## 🧑‍💻 Roles & Access

| Role     | Permissions                          |
|----------|--------------------------------------|
| USER     | Browse events, book tickets          |
| VENDOR   | Create/manage their events           |
| ADMIN    | Moderate events, view all users      |

---

## 🧪 Sample `.env` File

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
JWT_SECRET=supersecretkey
EMAIL_USER=your@gmail.com
EMAIL_PASS=generated_app_password
```

---

## Postman Collection

📬 [Click here to download Postman collection](./docs/EventBookingAPI.postman_collection.json)


## 🧠 Notes

- Make sure your PostgreSQL server is running (locally or via Railway)
- Make sure to manually create a `Vendor` row for each vendor user (via API or Prisma Studio)
- This server works seamlessly with the [Frontend Figma Design](https://trend-apply-46137159.figma.site)

---

## 📄 License

MIT – free for educational and demo use.

---

## 👨‍💻 Developed by

**Sekhar Mohanta**  
Full Stack Developer
