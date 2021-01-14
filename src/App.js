import React from 'react';
import {HomeComponent} from './components/homeComponent/HomeComponent';
import './App.css';
import { BrowserRouter, Route} from "react-router-dom";

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
