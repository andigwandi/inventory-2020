import React from "react";
import { Link, NavLink } from "react-router-dom";

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
      <div>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/signup">SignUp</NavLink>
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
