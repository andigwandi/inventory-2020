import React from "react";
import { Switch, Route } from "react-router-dom";
import Inventory from "./Inventory";
import DepartmentInventory from "./Departments";
import Pos from "./Pos";
import Transactions from "./Transactions";
import LiveCart from "./LiveCart";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Pos} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/Departments" component={DepartmentInventory} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/livecart" component={LiveCart} />
    </Switch>
  </main>
);

export default Main;
