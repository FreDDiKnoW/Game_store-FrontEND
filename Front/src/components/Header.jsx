import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ user }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">GameStore</Link>
        </div>
        <nav className="header-nav">
          {user ? (
            <div className="user-info">
              <span>Вітаємо, {user.name}!</span>
              <Link to="/cart" title="Кошик">🛒</Link>
            </div>
          ) : (
            <ul>
              <li><Link to="/login">Вхід</Link></li>
              <li>
                <Link to="/register" className="nav-button">Реєстрація</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;