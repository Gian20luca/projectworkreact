import React from "react";
import { MapComponent } from "../mapComponent/MapComponent";
import { FooterComponent } from "../../core/FooterComponent/FooterComponent";
import { NavbarComponent } from "../../core/navbarComponent/NavbarComponent";
import { BrowserRouter, Route } from "react-router-dom";
export function HomeComponent() {
  return (
    <div>
      <NavbarComponent />
      <MapComponent />
      <FooterComponent />
    </div>
  );
}
