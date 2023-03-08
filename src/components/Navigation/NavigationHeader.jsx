import React from 'react';

function NavigationHeader() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/bookshelf">Bookshelf</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationHeader;
