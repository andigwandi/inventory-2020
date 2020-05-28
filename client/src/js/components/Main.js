import React from "react";
import { Switch, Route } from "react-router-dom";
import Inventory from "./Inventory";
import DepartmentInventory from "./Departments";

import Login from "./Login";
import Users from "./Users";
import SignUp from "./SignUp";


const Main = () => (
  <main>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/" component={Inventory} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/Departments" component={DepartmentInventory} />
    </Switch>
  </main>
);

export default Main;
