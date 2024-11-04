import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Menu, LayoutDashboard, ShoppingCart, Calendar, LogOut, List, Pen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ClienteDetail from './Data/ClienteDetail';
import { Pedidos } from './Pedidos';
import { Turnos } from './Turnos/TurnosCliente';
import TurnosList from './Turnos/TurnosAdmin';
import OrderForm from '../OrderForm/OrderForm';
import OrderList from './OrdenCompra/OrderList';
import './PanelControl.css';
import NewArticle from '../Article/CreateArticle';

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
  
  const { isAuthenticated, user, clienteId, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
        return <ClienteDetail clienteId={clienteId ?? '0'} />;
      case 'pedidos':
        return <Pedidos />;
      case 'ordenList':
          return <OrderList />;    
      case 'ordenes':
          return <OrderForm />;  
      case 'turnosList':
        return <TurnosList />;
      case 'turnos':
        return <Turnos />;
      case 'articulo':
        return <NewArticle />;
      default:
        return <div>Seleccione una opción</div>;
    }
  };

  const menuItems: MenuItem[] = [
    { 
      id: 'datos', 
      title: 'Mis datos', 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      roles: ['Admin', 'Cliente'], 
      component: <ClienteDetail clienteId={clienteId ?? '0'} /> 
    },
    { 
      id: 'pedidos', 
      title: 'Pedidos', 
      icon: <ShoppingCart className="w-5 h-5" />, 
      roles: ['Cliente'], 
      component: <Pedidos /> 
    },
    { 
      id: 'ordenList', 
      title: 'Ver órdenes de compra', 
      icon: <List className="w-5 h-5" />, 
      roles: ['Admin'], 
      component: <OrderList /> 
    },
    { 
      id: 'ordenes', 
      title: 'Crear orden de compra', 
      icon: <ShoppingCart className="w-5 h-5" />, 
      roles: ['Admin'], 
      component: <OrderForm /> 
    },
    { 
      id: 'turnosList', 
      title: 'Ver turnos', 
      icon: <Calendar className="w-5 h-5" />, 
      roles: ['Admin'], 
      component: <TurnosList />
    },
    { 
      id: 'turnos', 
      title: 'Ver turnos', 
      icon: <Calendar className="w-5 h-5" />, 
      roles: ['Cliente'], 
      component: <Turnos /> 
    },
    { 
      id: 'articulo', 
      title: 'Ingresar nuevo articulo', 
      icon: <Pen className="w-5 h-5" />, 
      roles: ['Admin'], 
      component: <NewArticle /> 
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.rol as UserRole)
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="ftco-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel-dashboard">
              {/* Sidebar */}
              <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <button 
                  onClick={toggleSidebar} 
                  className="toggle-btn"
                >
                  <Menu className="w-6 h-6" />
                </button>
                
                <div className="menu-container">
                  {filteredMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedOption(item.id)}
                      className={`menu-option ${selectedOption === item.id ? 'active' : ''}`}
                    >
                      {item.icon}
                      {isSidebarOpen && <span className="menu-text">{item.title}</span>}
                    </button>
                  ))}
                  
                  <button onClick={handleLogout} className="logout-option">
                    {isSidebarOpen ? (
                      <span className="menu-text">Cerrar Sesión</span>
                    ) : (
                      <LogOut className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className={`dashboard-content ${isSidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
                <div className="content-wrapper">
                  {renderComponent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelControl;