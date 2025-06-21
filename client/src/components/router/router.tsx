// import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from "react-router-dom"; // , RouterProvider
import { Login } from '../../pages/Login';
import { Dashboard } from '../../pages/Dashboard';
// import { AuthProvider } from '../../context/AuthContext';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { HomeLayout } from '../../layouts/HomeLayout';
import { Guest } from '../../pages/Guest';
import "../../index.css";
import { GuestLayout } from "../../layouts/GuestLayout";
import { SignUp } from "../../pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { path: "/", element: <Guest /> },
      { path: "login", element: <Login /> },

      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> }
        ]
      },
      {
        path: "signup",
        element: <SignUp/>
      }
    ]
  }
]);
