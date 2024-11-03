import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import VehiclesGrid from '../pages/Vehicles/VehiclesGrid';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import PanelControlPage from '../pages/PanelControl/PanelControlPage';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import Contact from '../pages/Contact/Contact';
const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppWrapper><Layout /></AppWrapper>,
    children: [
      { 
        path: '/', 
        element: <Home /> 
      },
      { 
        path: '/vehicles', 
        element: <VehiclesGrid /> 
      },
      { 
        path: '/contact', 
        element: <Contact /> 
      },
      { 
        path: '/login', 
        element: <LoginPage /> 
      },
      { 
        path: '/register', 
        element: <RegisterPage /> 
      },
      { 
        path: '/panel', 
        element: (
          <ProtectedRoute 
            element={<PanelControlPage />} 
            allowedRoles={['Admin', 'Cliente']} 
          />
        )
      },
    ],
  },
]);