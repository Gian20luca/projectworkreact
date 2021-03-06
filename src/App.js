import React from "react";
import { HomeComponent } from "./components/homeComponent/HomeComponent";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavbarComponent } from "./core/navbarComponent/NavbarComponent";
import { FooterComponent } from "./core/footerComponent/FooterComponent";
import { ManageComponent } from "./components/manageComponent/ManageComponent";
import { ManageComponentThresholds } from "./components/manageComponent/ManageComponentThresholds";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
          <Route exact path="/">
            <HomeComponent />
          </Route>
          <Route exact path="/ManageInput">
            <ManageComponent/>
          </Route>
          <Route exact path="/ManageThresholds">
            <ManageComponentThresholds/>
          </Route>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}
