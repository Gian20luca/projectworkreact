import React from "react";
import { HomeComponent } from "./components/homeComponent/HomeComponent";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavbarComponent } from "./core/navbarComponent/NavbarComponent";
import { FooterComponent } from "./core/footerComponent/FooterComponent";
import { ManageComponent } from "./components/manageComponent/ManageComponent";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
          <Route exact path="/">
            <HomeComponent />
          </Route>
          <Route exact path="/ManagePositive">
            <ManageComponent/>
          </Route>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}
