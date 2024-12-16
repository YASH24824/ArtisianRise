import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={styles.brand}>
          ArtisanRise
        </Link>
      </div>
    </nav>
  );
};

// Inline styles for the brand name
const styles = {
  brand: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black', // Attractive color
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
  },
};

export default Header;
