# Highway Delite MERN Stack Project

Full-Stack MERN (MongoDB, Express, React, Node.js) application featuring OTP-based authentication, protected/public routes, global error handling, and a professional, responsive UI. Built with TypeScript (backend & frontend), Redux Toolkit, Redux Persist, React Router, and Tailwind CSS.

---

## Features

- **OTP-based Authentication**: Secure login/signup with email OTP verification.
- **JWT Auth & Protected Routes**: Backend and frontend route protection for authenticated users.
- **Notes Management**: Create, read, update, and delete notes (with ownership checks).
- **Global Error Handling**: Consistent error responses and toast notifications.
- **Responsive UI**: Modern, mobile-friendly design using Tailwind CSS and Inter font.
- **Redux Toolkit & Persist**: Robust state management with persisted auth state.
- **Axios Interceptors**: Handles token expiration and auto-logout.
- **TypeScript Best Practices**: Strong typing throughout backend and frontend.

---

## Project Structure

```
Highway Delite/
├── client/           # Frontend React app (TypeScript)
│   └── src/
│       ├── app/              # Redux store setup
│       ├── components/       # Reusable UI components (Header, routes)
│       ├── features/         # Redux slices (auth, user)
│       ├── pages/            # Page components (Signup, Login, Protected, etc.)
│       ├── service/          # Axios instance & API logic
│       ├── assets/           # Static assets (images, etc.)
│       ├── App.tsx           # Main app component with routes
│       └── index.css         # Tailwind & global styles
├── server/           # Backend Node.js/Express app (TypeScript)
│   └── src/
│       ├── config/           # App constants, mailer, config
│       ├── controllers/      # Route controllers (auth, notes)
│       ├── db/               # DB connection logic
│       ├── middleware/       # Error handling, auth, validation
│       ├── models/           # Mongoose models (User, Note)
│       ├── repository/       # Data access logic
│       ├── routes/           # Express routes (auth, notes)
│       ├── services/         # Business logic (auth, mail, notes)
│       ├── templates/        # Email templates (OTP)
│       ├── types/            # TypeScript types/interfaces
│       ├── utils/            # Utility functions (JWT, OTP, error)
│       ├── validators/       # Zod validation schemas
│       └── index.ts          # App entry point
├── README.md         # Project documentation
├── .gitignore        # Ignore node_modules, dist, .env, logs, PDFs
```

---

## Backend Setup (Node.js/Express/TypeScript)

1. **Install dependencies:**
   ```sh
   cd server
   npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and fill in MongoDB URI, JWT secret, email credentials, etc.
3. **Run in development:**
   ```sh
   npm run dev
   ```
4. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

### Key Backend Features & Code Snippets

- **OTP Generation & Email (utils/generateOTP.ts, services/mail.service.ts):**
  ```ts
  // generateOTP.ts
  export function generateOTP(length = 6): string {
    return Math.random().toString().slice(-length);
  }
  ```
- **JWT Auth Middleware (middleware/auth.middleware.ts):**
  ```ts
  export const authenticate = (req, res, next) => {
    // Verifies JWT, attaches user to req
  };
  ```
- **Global Error Handler (middleware/errorHandler.ts):**
  ```ts
  export function errorHandler(err, req, res, next) {
    // Handles all errors, sends JSON response
  }
  ```
- **User & Note Models (models/user.models.ts, note.models.ts):**
  ```ts
  // user.models.ts
  const UserSchema = new Schema({ email, password, otp, ... });
  ```

---

## Frontend Setup (React/TypeScript/Tailwind)

1. **Install dependencies:**
   ```sh
   cd client
   npm install
   ```
2. **Run in development:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

### Key Frontend Features & Code Snippets

- **Redux Store (app/store.ts):**
  ```ts
  import { configureStore } from '@reduxjs/toolkit';
  // ...
  export const store = configureStore({ reducer: { auth: authReducer } });
  ```
- **Protected/Public Routes (components/PrivateRoute.tsx, PublicRoute.tsx):**
  ```tsx
  // PrivateRoute.tsx
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
  ```
- **Auth Slice & Thunks (features/userSlice.ts, features/authThunk.ts):**
  ```ts
  // userSlice.ts
  const userSlice = createSlice({ name: 'user', ... });
  ```
- **Axios Instance (service/index.ts):**
  ```ts
  const axiosInstance = axios.create({ baseURL: ... });
  // Interceptors for token refresh/logout
  ```
- **UI & Toasts (pages/Login.tsx, Signup.tsx):**
  ```tsx
  // Login.tsx
  toast.error('Invalid OTP');
  ```

---

## Additional Notes

- **TypeScript**: All code is strongly typed for safety and maintainability.
- **Linting**: Recommended to use ESLint/Prettier for code quality.
- **Environment Variables**: Never commit secrets; use `.env` files.
- **PDFs & Docs**: All PDFs and docs are ignored via `.gitignore`.

---

## License

MIT License. See LICENSE file for details.
