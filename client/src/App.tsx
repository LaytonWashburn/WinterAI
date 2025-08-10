import { RouterProvider } from "react-router-dom";
import { router } from './router/router'; // We'll define this later
import { AuthProvider } from './context/AuthContext'; // Coming next

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};