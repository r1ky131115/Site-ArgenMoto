// src\routes\routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import VehiclesGrid from '../pages/Vehicles/VehiclesGrid';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
// import SpareParts from '../pages/SpareParts/SpareParts';
// import Contact from '../pages/Contact/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/vehicles', element: <VehiclesGrid /> },
      { path: '/loginPage', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage/>}
      // { path: '/contacto', element: <Contact /> },
    ],
  },
]);