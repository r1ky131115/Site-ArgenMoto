import React from 'react';
import { Menu } from 'lucide-react';

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
      <span className="oi oi-menu"><Menu size={ 24 }/></span> Menu
    </button>
  );
};

export default NavbarToggleButton;