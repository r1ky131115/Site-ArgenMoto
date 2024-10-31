import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LayoutDashboard, ShoppingCart, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Datos } from './Datos';
import { Pedidos } from './Pedidos';
import './PanelControl.css';

// Tipos de usuarios permitidos
type UserRole = 'Admin' | 'Cliente';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  roles: UserRole[];
  component: React.ReactNode;
}

const PanelControl: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('datos');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Obtener contexto de autenticación
  const { isAuthenticated, userRole, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'datos':
        return <Datos />;
      case 'pedidos':
        return <Pedidos />;
      case 'turnos':
        return <div>Turnos Component</div>;
      default:
        return <div>Seleccione una opción</div>;
    }
  };

  // Definir menú de opciones
  const menuItems: MenuItem[] = [
    { 
      id: 'datos', 
      title: 'Datos', 
      icon: <LayoutDashboard />, 
      roles: ['Admin', 'Cliente'], 
      component: <Datos /> 
    },
    { 
      id: 'pedidos', 
      title: 'Pedidos', 
      icon: <ShoppingCart />, 
      roles: ['Admin', 'Cliente'], 
      component: <Pedidos /> 
    },
    { 
      id: 'turnos', 
      title: 'Turnos', 
      icon: <Calendar />, 
      roles: ['Admin', 'Cliente'], 
      component: <div>Turnos Component</div> 
    },
  ];

  // Filtrar elementos del menú según el rol del usuario
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole as UserRole)
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="panel-control">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button onClick={toggleSidebar} className="toggle-sidebar-btn">
          <Menu />
        </button>
        <div className="menu-items">
          {filteredMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedOption(item.id)}
              className={`menu-item ${selectedOption === item.id ? 'active' : ''}`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.title}</span>}
            </button>
          ))}
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión
        </button>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {renderComponent()}
      </div>
    </div>
  );
};

// Página del Panel de Control
const PanelControlPage: React.FC = () => {
  return <PanelControl />;
};

export default PanelControlPage;