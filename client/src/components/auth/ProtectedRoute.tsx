// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("ProtectedRoute", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};



// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export const ProtectedRoute = () => {
//   const { isAuthenticated } = useAuth();

//   console.log(isAuthenticated);

//   return isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
// };
