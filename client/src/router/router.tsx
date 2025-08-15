import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { GuestPage } from '../pages/guest/GuestPage';
import { GuestLayout } from "../layouts/guest/GuestLayout";
import { SignUpPage } from "../pages/signup/SignUp";
import { SignInPage } from "../pages/signin/SignIn";
import { ResumePage } from "../pages/features/resume/ResumePage";
import { HomeLayout } from "../layouts/home/HomeLayout";
import { Services } from "../pages/services/Services";
import { SearchPage } from "../features/search/SearchPage";
import { DynamicModel } from "../features/viewer/ModelViewer";
import { rootLoader } from "../loaders/RootLoader";
import "../index.css";

// Define an array of your guest route configurations
const guestRoutes = [
  { index: true, element: <GuestPage /> },
  { path: "signup", element: <SignUpPage/> },
  { path: "signin", element: <SignInPage/> },
];

// Define an array of your protected route configurations
const protectedRoutes = [
  { path: "dashboard", element: <DashboardPage /> },
  { path: "services", element: <Services /> },
  { path: "search", element: <SearchPage/>},
  {path: "viewer", element: <DynamicModel/>},
  {path: "resume", element: <ResumePage/>}
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