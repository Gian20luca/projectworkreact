import React from 'react';
import './App.css';
import {HomeComponent} from './components/homeComponent/HomeComponent';
import { BrowserRouter, Route, Link } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomeComponent}/>
       {/*  <Route exact path="/ManagePositives" component={ManagePositive}/>
        <Route exact path="/ManageThresholds" component={ManageThresholds}/>
        <Route exact path="/Team" component={Team}/> */}
        
      </div>
    </BrowserRouter>
   /*  <div className="container-fluid">
      <div className="row">
        <NavbarComponent />
        <HomeComponent />
        <FooterComponent/>
        
      </div>
    </div> */
  )
}
