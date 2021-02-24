import React from "react";
import { Link } from "react-router-dom";

// The Header creates links that can be used to navigate
// between routes.

const Header = () => (
  <div className="top-header text-center">
    <h1>
      <a href="/#/">Inventory System</a>
    </h1>

    <ul className="nav-menu">
      <li className="lead">
        <Link to="/inventory">Inventory</Link>
      </li>
      <li className="lead">
        <Link to="/departments">Departments</Link>
      </li>
    </ul>
  </div>
);

export default Header;
