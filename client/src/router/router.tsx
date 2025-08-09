import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { Guest } from '../pages/Guest';
import { GuestLayout } from "../layouts/guest/GuestLayout";
import { SignUp } from "../pages/signup/SignUp";
import { SignIn } from "../pages/signin/SignIn";
import { HomeLayout } from "../layouts/home/HomeLayout";
import { Services } from "../pages/services/Services";
import { rootLoader } from "../loaders/RootLoader";
import "../index.css";

// Define an array of your guest route configurations
const guestRoutes = [
  { index: true, element: <Guest /> },
  { path: "signup", element: <SignUp/> },
  { path: "signin", element: <SignIn/> },
];

// Define an array of your protected route configurations
const protectedRoutes = [
  { path: "dashboard", element: <DashboardPage /> },
  { path: "services", element: <Services /> },
];

export const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <GuestLayout />,
    // Use the guestRoutes array to create the children routes
    children: guestRoutes,
  },
  {
    element: <HomeLayout />,
    // Use map() to create the children routes and wrap them in ProtectedRoute
    children: protectedRoutes.map(route => ({
      path: route.path,
      element: (
        <ProtectedRoute>
          {route.element}
        </ProtectedRoute>
      ),
    })),
  },
]);