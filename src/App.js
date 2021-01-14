import React from "react";
import { HomeComponent } from "./components/homeComponent/HomeComponent";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ManagePositive } from "./components/ManagePositiveComponent/ManagePositive";
import { NavbarComponent } from "./core/navbarComponent/NavbarComponent";
import { FooterComponent } from "./core/footerComponent/FooterComponent";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
        <Switch>
          <Route exact path="/">
            <HomeComponent />
          </Route>
          <Route exact path="/ManagePositive">
            <ManagePositive />
          </Route>
        </Switch>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}
