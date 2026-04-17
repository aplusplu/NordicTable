# Nordic Table

A full-stack restaurant web application built with React (frontend) and Node.js + Express + MongoDB (backend).

The project follows a mobile-first approach and is based on a Figma design provided in the assignment. It includes a public-facing website and a protected admin backoffice.

---

## Features

### Frontend (React)
- Responsive design (mobile → desktop)
- Homepage with hero section and featured dishes
- Menu page with dishes fetched from API
- Booking system with form validation and feedback
- Login system connected to backend authentication
- Persistent login using localStorage (token + user)
- Role-based navigation (admin vs guest)
- Protected routes (admin-only backoffice)

### Backoffice (Admin)
- View all dishes
- Create new dishes (with image upload)
- Edit dishes inline
- Delete dishes
- Toggle signature dishes
- Real-time UI updates after actions

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend (provided API)
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file upload)

---

## API Integration

The frontend communicates with a REST API using Axios.

Implemented endpoints:
- `GET /dishes` → fetch all dishes
- `POST /dish` → create dish (admin only)
- `PUT /dish` → update dish (admin only)
- `DELETE /dish/:id` → delete dish (admin only)
- `PATCH /dish/:id/signature` → toggle signature (admin only)

Authentication:
- `POST /auth/signin` → login (returns JWT token)
- `POST /auth/token` → validate token and fetch user

Bookings:
- `POST /booking` → create reservation

---

## Authentication & Security

- JWT-based authentication
- Token stored in `localStorage`
- User data stored in `localStorage`
- ProtectedRoute component used to guard admin routes
- Only users with role `"admin"` can access backoffice

---

## UX Considerations

- Loading states for async operations
- Error handling for API calls
- User-friendly feedback via Toast notifications
- Form validation on all inputs
- Responsive layout across all screen sizes
- Clear navigation and structure

---

## Project Structure
src/
components/ layout/
              ui/


pages/
services/


- `services/` handles all API communication
- `components/` contains reusable UI parts
- `pages/` represents route-level components

---

## Setup

### Frontend

```bash
npm install
npm run dev

node_modules is excluded via .gitignore
Dependencies are managed via package.json and package-lock.json

Core requirements are implemented:

Layout and responsiveness
API integration (GET, POST, PUT, DELETE)
Booking system
Admin backoffice (CRUD)
Authentication and route protection
