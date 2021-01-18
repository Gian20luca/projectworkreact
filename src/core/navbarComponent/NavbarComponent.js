import React from "react";
import { Link } from "react-router-dom";
import "./NavbarComponent.css";
export function NavbarComponent() {
  return (
    <nav className="navbar myNavbar fixed-top navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png"
            width="47"
            height="45"
            className="d-inline-block align-top immagine"
          ></img>
          Covid-19 Console
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ">
            <Link className="linkNav nav-item nav-link " to="/">
              Home
            </Link>
            <Link className="linkNav  nav-item nav-link" to="/ManageInput">
              Manage Input
            </Link>
            <Link className="linkNav  nav-item nav-link" to="/ManageThresholds">
              Manage Thresholds
            </Link>
            <Link className="linkNav  nav-item nav-link" to="/Team">
              Team
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}






// import React from 'react';
// import { Link } from 'react-router-dom';
// import './NavbarComponent.css';
// export function NavbarComponent() { 
//   return (

//     <nav className="navbar myNavbar fixed-top navbar-expand-lg navbar-dark">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//         <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png" width="47"
//       height="45" className="d-inline-block align-top immagine" ></img>
//           Covid-19 Console
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNavAltMarkup"
//           aria-controls="navbarNavAltMarkup"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//           <div className="navbar-nav ">
//             <Link className="linkNav" to="/ManageInput">Manage Input</Link>
//             <Link className="linkNav" to="/ManageThresholds">Manage Thresholds</Link>
//             <Link className="linkNav" to="/Team">Team</Link>
//           </div>
//         </div>
//       </div>
//     </nav>

/* <nav className="navbar navbar-dark fixed-top backgroundNav ">
  <a className="navbar-brand title" >
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png" width="47"
      height="45" className="d-inline-block align-top immagine" ></img>
     Covid-19 Console
  </a>
  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
    data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false"
    aria-label="Toggle navigation">
    <span className="navbar-toggler-icon iconNavbarCollapse"></span>
  </button>
  <div className="collapse navbar-collapse backgroundNav marginBorderDivCollapse" id="navbarToggleExternalContent" data-toggle="collapse"
    data-target="#navbarToggleExternalContent">
    <ul className="navbar-nav flex-row-reverse">
      <li className="nav-item active">
        <a className="nav-link">Gestisci asintomatici</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" >Gestisci decessi</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" >Gestisci positivi</a>
      </li>
    </ul>
  </div>
</nav> */


    
//   );
// }
