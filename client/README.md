# 🎟️ Multi-Vendor Event Booking Platform – Frontend (Client)

This is the **frontend (client)** part of the Multi-Vendor Event Booking Platform. It’s built using **Next.js (App Router)** and **Tailwind CSS**, with role-based access for users, vendors, and admins.

The goal of this project is to enable:
- 📅 **Users** to browse and book events.
- 🧑‍💼 **Vendors** to create and manage events.
- 👮 **Admins** to manage the platform and approve vendor submissions.

---

## 🚀 Live Preview

[🔗 Live Demo](https://multi-vendor-event-booking-platform.vercel.app/)

---

## 📦 Tech Stack

| Layer       | Technology               |
|-------------|---------------------------|
| Framework   | [Next.js 14+ (App Router)](https://nextjs.org/docs/app) |
| Styling     | [Tailwind CSS](https://tailwindcss.com/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| State       | React Hooks |
| Auth        | JWT |
| Deployment  | Vercel |

---

## ✅ Features

### 🌍 Public Pages
- Home / Landing page with featured events
- Detailed event pages with booking button
- Search and filter by title, vendor, location, category, and date

### 👤 User
- Sign up, Login, Logout
- View and manage own bookings
- Cancel existing bookings

### 🧑‍💼 Vendor
- Add, update, and delete events
- See all bookings for their events
- Dashboard for vendor-specific management

### 👮 Admin
- Approve or reject event submissions
- View and manage all users, vendors, and events

---

## 🛠️ Project Structure

```
client/
├── app/                  # App Router structure
│   ├── events/[id]/      # Event details page
│   ├── add-event/        # Vendor event creation
│   ├── search-events/    # Search and filtering UI
│   ├── layout.js         # Root layout
│   ├── page.js           # Landing page
│   ├── globals.css       # Global Tailwind styles
├── components/           # Reusable UI components
│   ├── EventCard.js
│   ├── BookNowButton.js
│   ├── Footer.js
│   ├── Header.js
│   ├── Modal.js, Toast.js etc.
├── hooks/                # Custom React Hooks
│   ├── useDebounce.js
│   ├── useAuth.js
├── lib/                  # Axios config, constants
│   ├── axios.js
│   ├── constants.js
├── next.config.mjs       # Next.js configuration
├── package.json
```

---

## ⚙️ Setup Instructions

Follow these steps to run the client locally:

### 1. Clone the Repository

```bash
git clone https://github.com/jssekhar2000/event-booking-platform.git
cd event-booking-platform/client
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Create `.env.local` file

Create a `.env.local` file in the `client/` directory and add:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

> Replace the base URL if your backend is hosted elsewhere.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

App will be running at:  
🌐 [http://localhost:3000](http://localhost:3000)

---

## 💡 Design Decisions

- ✅ **App Router**: Used for modern Next.js file-based routing and layout nesting.
- ✅ **Custom Hooks**: For debounced search (`useDebounce`) and auth state (`useAuth`).
- ✅ **Reusability**: Common modals, cards, and loaders reused across roles.
- ✅ **Client-Server Separation**: Axios is separated for client-side and server-side API calls.

---


## 🧑‍💻 Contributing

Want to improve this project?

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push and submit a Pull Request

---

## 📜 License

This project is licensed under the [MIT License](../LICENSE).

---

## 📬 Contact

Feel free to connect for questions or collaboration:  
[LinkedIn](https://www.linkedin.com/in/sekhar-mohanta-12ab48234/) | [GitHub](https://github.com/jssekhar2000)

---
