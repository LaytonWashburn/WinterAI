import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from './router/router'; // We'll define this later
import { AuthProvider } from './context/AuthContext'; // Coming next


const Main = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <Main />
)