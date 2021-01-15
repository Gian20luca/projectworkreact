import React, { useEffect, useState } from "react";
import { Service } from "../../../service/Service";
import axios from 'axios';
import { Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";

export function FormComponentThresholds() {
  // const [regione, setRegione] = useState();
  // useEffect(() => {
  //   let call = new Service();

  //   call.getGeojsonANDMyDb().then(axios.spread(function (data1, data2, data3) {
  //     //setto lo stato del geojson
  //      setRegione(predbregione => predbregione = data2.data);

  //   }));
  // }, [])


  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <HashRouter>
            <ul>
              <li><Link className="nav-link" to="/">Positivi</Link></li>
              <li><Link className="nav-link" to="/Deaths">Decessi</Link></li>
              <li><Link className="nav-link" to="/Asymptomatic">Asintomatici</Link></li>
            </ul>
            <Route exact path="/">
            <h1>posi</h1>


            </Route>
            <Route exact path="/Deaths">
            <h1>deat</h1>


            </Route>
            <Route exact path="/Asymptomatic">
             <h1>asin</h1>
            </Route>
          </HashRouter>
        </div>
      </div>
    </div>
   
  );
}
