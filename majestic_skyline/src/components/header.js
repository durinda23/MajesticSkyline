import React from 'react';
import '../css/Header.css';
import logo from '../img/logo.svg';
import accountArrow from '../img/account_arrow.svg';

const Header = ({ activePage, setActivePage, onAccountClick }) => {
  const navItems = [
    { id: 'main', label: 'главная' },
    { id: 'buy', label: 'купить' },
    { id: 'rent', label: 'арендовать' },
    { id: 'about', label: 'о нас' },
    { id: 'contact', label: 'контакты' },
    {
      id: 'account',
      label: (
        <span className="account-label">
          <img src={accountArrow} alt="Account Arrow" />
        </span>
      ),
      className: 'account-btn',
    },
  ];

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${activePage === item.id ? 'active' : ''} ${item.className || ''}`}
            onClick={() => {
              if (item.id === 'account') {
                onAccountClick();  // Важно: вызываем пропс из App.js
              } else {
                setActivePage(item.id);
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
