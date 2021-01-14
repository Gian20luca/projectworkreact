import React from 'react';
import './App.css';
import {HomeComponent} from './components/homeComponent/HomeComponent'

export function App() {
  return (
    <div className="container">
      <div className="row">
        <HomeComponent/>
      </div>
    </div>
  )
}
