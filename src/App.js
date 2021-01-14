import React from 'react';
import './App.css';
import {HomeComponent} from './components/homeComponent/HomeComponent'
import {FooterComponent} from './core/footerComponent/FooterComponent';
import {NavbarComponent} from './core/navbarComponent/NavbarComponent'
export function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <NavbarComponent />
        <HomeComponent />
        <FooterComponent/>
        
      </div>
    </div>
  )
}
