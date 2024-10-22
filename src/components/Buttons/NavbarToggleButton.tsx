import React from 'react';

interface NavbarToggleButtonProps {
  target: string;
}

const NavbarToggleButton: React.FC<NavbarToggleButtonProps> = ({ target }) => {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target={`#${target}`}
      aria-controls={target}
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="oi oi-menu"></span> Menu
    </button>
  );
};

export default NavbarToggleButton;
