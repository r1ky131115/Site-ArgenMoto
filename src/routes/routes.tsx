import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
// import About from '../pages/About/About';
// import Services from '../pages/Services/Services';
// import Motorcycles from '../pages/Motorcycles/Motorcycles';
// import SpareParts from '../pages/SpareParts/SpareParts';
// import Contact from '../pages/Contact/Contact';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
    //   { path: '/sobre-nosotros', element: <About /> },
    //   { path: '/servicios', element: <Services /> },
    //   { path: '/motos', element: <Motorcycles /> },
    //   { path: '/repuestos', element: <SpareParts /> },
    //   { path: '/contacto', element: <Contact /> },
    ],
  },
]);