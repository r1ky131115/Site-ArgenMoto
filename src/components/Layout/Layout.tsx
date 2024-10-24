import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;