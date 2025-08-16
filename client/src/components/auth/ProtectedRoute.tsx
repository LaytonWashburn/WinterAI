// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // You can customize this loading indicator as needed
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};