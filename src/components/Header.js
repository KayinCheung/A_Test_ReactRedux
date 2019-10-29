import React from 'react';
import { Link } from 'react-router-dom'
function Header() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <p className="navbar-item" href="https://bulma.io">
                    <Link to="/">Home</Link>
                </p>
                <div className="navbar-item">
                    <Link to="history">History</Link>
                </div>
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-end">
            </div>
        </nav >
    );
}

export default Header;

