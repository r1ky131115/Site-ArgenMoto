import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import NavbarToggleButton from '../Buttons/NavbarToggleButton';
import { UserCog } from 'lucide-react';
import './Navbar.css'

const Navbar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsCollapsed(true);
  };

  // Determinar si estamos en el panel de usuario
  const isInPanel = location.pathname.startsWith('/panel');

  // Clase adicional para el navbar cuando estamos en el panel
  const navbarClass = `navbar navbar-expand-lg navbar-dark ftco_navbar ${
    isInPanel ? 'bg-panel-dark' : 'bg-dark'
  } ftco-navbar-light`;

  return (
    <nav className={navbarClass} id="ftco-navbar">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Argen<span>Moto</span>
        </NavLink>
        
        <NavbarToggleButton 
          onClick={handleToggle} 
          isCollapsed={isCollapsed}
        />

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="ftco-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={handleNavLinkClick}
                end
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/vehicles" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={handleNavLinkClick}
              >
                Motos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={handleNavLinkClick}
              >
                Contacto
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/login"
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={handleNavLinkClick}
              >
                Perfil&nbsp;
                <UserCog className='mb-2' />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;