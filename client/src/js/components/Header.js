import React from "react";
import { Link } from "react-router-dom";

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (

  <div className="text-center">

    <div>
      <div>
        <h1>
          <a href="/#/">Inventory System</a>
        </h1>
      </div>

      <ul className="nav-menu">
        <li className="lead">
          <Link to="/inventory">Inventory</Link>
        </li>
        <li className="lead">
          <Link to="/departments">departments</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
