import React from "react";
import { Switch, Route } from "react-router-dom";
import Inventory from "./Inventory";
import DepartmentInventory from "./Departments";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Inventory} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/Departments" component={DepartmentInventory} />
    </Switch>
  </main>
);

export default Main;
