import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="headerWrapper">
      <div className="one">
        <Link to="/" id="HomeMenu" tabIndex={0}>
          Home
        </Link>
      </div>
      <div className="two has-text-right">
        <Link to="history" id="HistoryMenu" tabIndex={1}>
          History
        </Link>
      </div>
    </div>
  );
}

export default Header;
