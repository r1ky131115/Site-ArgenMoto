import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavbarToggleButton from '../Buttons/NavbarToggleButton';
import { SupervisedUserCircleSharp } from '@mui/icons-material';

const Navbar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavLinkClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
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
                end  // Asegura que solo coincida con la ruta exacta
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
                to="/repuestos" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={handleNavLinkClick}
              >
                Repuestos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/contacto" 
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
                to="/perfil" 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={handleNavLinkClick}
              >
                Perfil&nbsp;
                <SupervisedUserCircleSharp className='mb-2' />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;