import { createBrowserRouter } from "react-router-dom"; // , RouterProvider
import { DashboardPage } from '../../pages/dashboard/DashboardPage';
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { Guest } from '../../pages/Guest';
import { GuestLayout } from "../../layouts/GuestLayout";
import { SignUp } from "../../pages/signup/SignUp";
import { SignIn } from "../../pages/signin/SignIn";
import "../../index.css";
// import { ProtectedRoute } from '../../components/auth/ProtectedRoute';0
import { HomeLayout } from "../../layouts/home/HomeLayout";
// import { HomeLayout } from '../../layouts/HomeLayout';
// import { AuthProvider } from '../../context/AuthContext';
// import { Login } from '../../pages/Login';
// import { createRoot } from 'react-dom/client';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { 
        path: "/", 
        element: <Guest /> 

      },
      {
        path: "signup",
        element: <SignUp/>
      },
      {
        path: "signin",
        element: <SignIn/>
      }
    ]
  },
    {
      // This route uses the ProtectedLayout
      element: <HomeLayout />,
      // errorElement: <ErrorPage />, // Catches errors for this branch
      children: [
        {
          path: 'dashboard', // This will be /dashboard
          element: (
                      <ProtectedRoute>
                          <DashboardPage /> {/* Use the renamed Dashboard here */}
                      </ProtectedRoute>
                  ),
        },
        {
          path: 'login', // This will be /profile
                  element: (
                      <ProtectedRoute>
                          <DashboardPage /> {/* Use the renamed Dashboard here */}
                      </ProtectedRoute>
                  )
        },
      // Add more protected routes here
    ],
  },
]);
