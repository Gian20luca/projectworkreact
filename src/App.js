import React from 'react';
import './App.css';
import {HomeComponent} from './components/homeComponent/HomeComponent'
import { MapComponent } from './components/MapComponent/MapComponent';

export function App() {
  return (
    <div className="container">
      <div className="row">
        {/* <HomeComponent/> */}
        <MapComponent/>
      </div>
    </div>
  )
}
