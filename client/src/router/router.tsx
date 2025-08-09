import { createBrowserRouter } from "react-router-dom"; // , RouterProvider
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { Guest } from '../pages/Guest';
import { GuestLayout } from "../layouts/GuestLayout";
import { SignUp } from "../pages/signup/SignUp";
import { SignIn } from "../pages/signin/SignIn";
import { HomeLayout } from "../layouts/home/HomeLayout";
import "../index.css";

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
