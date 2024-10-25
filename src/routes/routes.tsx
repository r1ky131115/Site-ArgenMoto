import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import Motorcycles from '../pages/Motorcycles/Motorcycles';
// import SpareParts from '../pages/SpareParts/SpareParts';
// import Contact from '../pages/Contact/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/motos', element: <Motorcycles /> },
    //   { path: '/repuestos', element: <SpareParts /> },
    //   { path: '/contacto', element: <Contact /> },
    ],
  },
]);