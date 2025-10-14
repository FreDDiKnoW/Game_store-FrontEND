import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css';

function Header() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-logo"><Link to="/">GameStore</Link></div>
        <nav className="header-nav">
          {user ? (
            <div className="user-info">
              <span>t\Hello, <Link to="/profile">{user.username}</Link>!</span>
              <button onClick={logoutUser}>Exit</button>
            </div>
          ) : (
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register" className="nav-button">Register</Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;