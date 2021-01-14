import React from 'react';
import { BrowserRouter,Link } from 'react-router-dom';
import './NavbarComponent.css';
export function NavbarComponent() { 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <BrowserRouter>
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/ManagePositive">Manage Positives</Link>
            <Link className="nav-link" to="/ManageThresholds">Manage Thresholds</Link>
            <Link className="nav-link" to="/Team">Team</Link>
          </BrowserRouter>
          </div>
        </div>
      </div>
    </nav>
  )


}
