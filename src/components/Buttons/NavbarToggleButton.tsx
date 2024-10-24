import React from 'react';
import { MenuBurger } from 'react-flaticons';

interface NavbarToggleButtonProps {
  onClick: () => void;
  isCollapsed: boolean;
}

const NavbarToggleButton: React.FC<NavbarToggleButtonProps> = ({ onClick, isCollapsed }) => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      onClick={onClick}
      aria-expanded={!isCollapsed}
      aria-label="Toggle navigation"
    >
      <span className="oi oi-menu"><MenuBurger size={24}/></span> Menu
    </button>
  );
};

export default NavbarToggleButton;