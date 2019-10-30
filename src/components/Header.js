import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link to="/" id="HomeMenu" tabIndex={0}>
            Home
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="history" id="HistoryMenu" tabIndex={1}>
            History
          </Link>
        </div>

      </div>
      <div className="navbar-end" />
    </nav>
  );
}

export default Header;