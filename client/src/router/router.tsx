import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { GuestPage } from '../pages/guest/GuestPage';
import { GuestLayout } from "../layouts/guest/GuestLayout";
import { SignUpPage } from "../pages/signup/SignUp";
import { SignInPage } from "../pages/signin/SignIn";
import { ResumePage } from "../pages/features/resume/ResumePage";
import { CareersPage as WinterAICareersPage } from "../pages/careers/CareersPage";
import { AboutPage } from "../pages/about/AboutPage";
import { ProfilePage } from "../pages/profile/ProfilePage";
import { SettingsPage } from "../pages/settings/SettingsPage";
import { HomeLayout } from "../layouts/home/HomeLayout";
import { ServicesPage } from "../pages/services/ServicesPage";
import { SearchPage } from "../features/search/SearchPage";
import { DynamicModel } from "../features/viewer/ModelViewer";
import { CareerPage } from "../pages/features/career/CareerPage";
import { rootLoader } from "../loaders/RootLoader";
import "../index.css";

const guestRoutes = [
  { index: true, element: <GuestPage />, loader: rootLoader },
  { path: "signup", element: <SignUpPage/> },
  { path: "signin", element: <SignInPage/> },
];


// Define an array of your protected route configurations
const protectedRoutes = [
  { path: "dashboard", element: <DashboardPage /> },
  { path: "services", element: <ServicesPage /> },
  { path: "services/career", element: <CareerPage /> },
  { path: "services/career/resume", element: <ResumePage/> },
  { path: "services/career/search", element: <SearchPage/> },
  { path: "viewer", element: <DynamicModel/> },
  { path: "careers", element: <WinterAICareersPage /> },
  { path: "about", element: <AboutPage /> },
  { path: "profile", element: <ProfilePage /> },
  { path: "settings", element: <SettingsPage /> }
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: guestRoutes,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: protectedRoutes,
  },
]);