import React from 'react';
import {HomeComponent} from './components/homeComponent/HomeComponent';
import './App.css';
import { BrowserRouter, Route} from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomeComponent}/>
        
      </div>
    </BrowserRouter>
  )
}
