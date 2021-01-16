import React, { useEffect, useState } from "react";
import './FormComponentThresholds.css';
import { Service } from "../../../service/Service";
import axios from 'axios';
import { Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";

export function FormComponentThresholds() {
  const [regcolor, setRegcolor] = useState({

    positivi: {
      minColor: "",
      mediumColor: "",
      maxColor: "",
      minperc: 0,
      maxperc: 0,
    },
    decessi: {
      minColor: "",
      mediumColor: "",
      maxColor: "",
      minperc: 0,
      maxperc: 0,
    },
    asintomatici: {
      minColor: "",
      mediumColor: "",
      maxColor: "",
      minperc: 0,
      maxperc: 0,
    }
  });

  let patch = new Service.getInstance();
  /*-------------------------------------------------------------------------------------- */
  useEffect(() => {
    let call = new Service.getInstance();

    call.getGeojsonANDMyDb().then(
      axios.spread(function (data1, data2, data3) {
        console.log(data3.data);
        //setto lo stato del geojson
        //setRegione((predbregione) => (predbregione = data3.data));
        setRegcolor(() => ({
          positivi: {

            minColor: data3.data[0].minColor,
            mediumColor: data3.data[0].mediumColor,
            maxColor: data3.data[0].maxColor,
            minperc: data3.data[0].minThresholds,
            maxperc: data3.data[0].maxThresholds,
          },
          decessi: {

            minColor: data3.data[1].minColor,
            mediumColor: data3.data[1].mediumColor,
            maxColor: data3.data[1].maxColor,
            minperc: data3.data[1].minThresholds,
            maxperc: data3.data[1].maxThresholds,
          },
          asintomatici: {

            minColor: data3.data[2].minColor,
            mediumColor: data3.data[2].mediumColor,
            maxColor: data3.data[2].maxColor,
            minperc: data3.data[2].minThresholds,
            maxperc: data3.data[2].maxThresholds,
          }
        }));
      })
    );
  }, []);
  /*handle change --------------------------------------------------------------------*/
  const handleChangePositivi = (event) => {
    setRegcolor((prev) => ({
      ...prev,
      positivi: {
        ...prev.positivi,
        [event.target.name]: event.target.value,
      }
    }));

  };
  const handleChangeAsinto = (event) => {
    setRegcolor((prev) => ({
      ...prev,
      asintomatici: {
        ...prev.asintomatici,
        [event.target.name]: event.target.value,
      }
    }));

  };
  const handleChangeDecessi = (event) => {
    setRegcolor((prev) => ({
      ...prev,
      decessi: {
        ...prev.decessi,
        [event.target.name]: event.target.value,
      }
    }));

  };

  /*handle submit---------------------------------------------------------------------------------------*/

  const handleSubmitPositive = (event) => {
    event.preventDefault();

    postData(
      regcolor.positivi.minperc,
      regcolor.positivi.maxperc,
      regcolor.positivi.maxColor,
      regcolor.positivi.minColor,
      regcolor.positivi.mediumColor,
      1, 'positivi');
  };

  const handleSubmitAsnto = (event) => {
    event.preventDefault();
    postData(regcolor.asintomatici.minperc,
      regcolor.asintomatici.maxperc,
      regcolor.asintomatici.maxColor,
      regcolor.asintomatici.minColor,
      regcolor.asintomatici.mediumColor,
      3, 'asintomatici');
  };

  const handleSubmitDeaths = (event) => {
    event.preventDefault();
    postData(regcolor.decessi.minperc,
      regcolor.decessi.maxperc,
      regcolor.decessi.maxColor,
      regcolor.decessi.minColor,
      regcolor.decessi.mediumColor,
      2, 'decessi');
  };

  const postData = (minperc, maxperc, maxC, minC, mediumC, id, tipe) => {
    switch (tipe) {
      case 'positivi':
        patch.patchColor(minperc, maxperc, maxC, minC, mediumC, id);
        break;
      case 'decessi':
        patch.patchColor(minperc, maxperc, maxC, minC, mediumC, id);
        break;
      case 'asintomatici':
        patch.patchColor(minperc, maxperc, maxC, minC, mediumC, id);
        break;

    }
  };
  /*-----------------------------------------------------------------------------------------------------------*/

  return (


    <HashRouter>
      <div className="container margineSuperiore animate_ animate__animated animate__bounceInDown">
        <div className="row">
          <div className="col-md-12">
            <ul>
              <li><Link className="nav-link linkThresholds" to="/">Positivi</Link></li>
              <li><Link className="nav-link linkThresholds" to="/Deaths">Decessi</Link></li>
              <li><Link className="nav-link linkThresholds" to="/Asymptomatic">Asintomatici</Link></li>
            </ul>
          </div>
        </div>

             {/* positivi */}
        <Route exact path="/">
          <div className="divInput offset-md-2 col-md-8 offset-md-2 animate_ animate__animated animate__bounceInDown">
            <h3>Positivi</h3>
            <form className='card card-body mt-3' onSubmit={handleSubmitPositive}>
              <div className='row'>

                <div class="col-md-6">
                  <label>Soglia inferiore:</label>
                  <div>
                    <div class="input-group mb-3">
                      <input
                        type="number"
                        name="minperc"
                        className="form-control"
                        value={regcolor.positivi.minperc}
                        onChange={handleChangePositivi}
                      ></input>
                      <div class="input-group-append">
                        <span class="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Colore primo range:</label>
                  <input className='form-control' type="color" name="minColor" value={regcolor.positivi.minColor} onChange={handleChangePositivi}></input><br></br>
                </div>
                </div>
              <br></br>

              <div class="row">
                <div class="col-md-6">
                  <label>Soglia superiore:</label>
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      name="maxperc"
                      className="form-control"
                      value={regcolor.positivi.maxperc}
                      onChange={handleChangePositivi}
                    ></input>
                    <div class="input-group-append">
                      <span class="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Colore secondo range:</label>
                  <input className='form-control' type="color" name="mediumColor" value={regcolor.positivi.mediumColor} onChange={handleChangePositivi}></input><br></br>
                </div>
              </div>
              <br></br>

              <div class="row">
                <div class="offset-md-6 col-md-6">
                  <label>Colore terzo range:</label>
                  <input className='form-control' type="color" name="maxColor" value={regcolor.positivi.maxColor} onChange={handleChangePositivi}></input><br></br>
                </div>
              </div>
              <br></br>

              <div class="row justify-content-center">
                <div class=" col-md-10 ">
                <input type="submit" className="btn myBtn btn-block"></input>
                  
                </div>
              </div>

            </form>
          </div>
        </Route>


              {/* decessi */}
         <Route exact path="/Deaths">
         <div className="divInput offset-md-2 col-md-8 offset-md-2 animate_ animate__animated animate__bounceInDown">
            <h3>Decessi</h3>
            <form className='card card-body mt-3' onSubmit={handleSubmitDeaths}>
              <div className='row'>

                <div class="col-md-6">
                  <label>Soglia inferiore:</label>
                  <div>
                    <div class="input-group mb-3">
                      <input
                        type="number"
                        name="minperc"
                        className="form-control"
                        value={regcolor.decessi.minperc}
                        onChange={handleChangeDecessi}
                      ></input>
                      <div class="input-group-append">
                        <span class="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Colore primo range:</label>
                  <input className='form-control' type="color" name="minColor" value={regcolor.decessi.minColor} onChange={handleChangeDecessi}></input><br></br>
                </div>
                </div>
              <br></br>

              <div class="row">
                <div class="col-md-6">
                  <label>Soglia superiore:</label>
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      name="maxperc"
                      className="form-control"
                      value={regcolor.decessi.maxperc}
                      onChange={handleChangeDecessi}
                    ></input>
                    <div class="input-group-append">
                      <span class="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Colore secondo range:</label>
                  <input className='form-control' type="color" name="mediumColor" value={regcolor.decessi.mediumColor} onChange={handleChangeDecessi}></input><br></br>
                </div>
              </div>
              <br></br>

              <div class="row">
                <div class="offset-md-6 col-md-6">
                  <label>Colore terzo range:</label>
                  <input className='form-control' type="color" name="maxColor" value={regcolor.decessi.maxColor} onChange={handleChangeDecessi}></input><br></br>
                </div>
              </div>
              <br></br>

              <div class="row justify-content-center">
                <div class=" col-md-10 ">
                  <input type="submit" className="btn myBtn btn-block"></input>
                </div>
              </div>

            </form>
          </div>
        </Route>

            {/* asintomatici */}
        <Route exact path="/Asymptomatic">
        <div className="divInput offset-md-2 col-md-8 offset-md-2 animate_ animate__animated animate__bounceInDown">
            <h3>Asintomatici</h3>
            <form className='card card-body mt-3' onSubmit={handleSubmitAsnto}>
              <div className='row'>

                <div class="col-md-6">
                  <label>Soglia inferiore:</label>
                  <div>
                    <div class="input-group mb-3">
                      <input
                        type="number"
                        name="minperc"
                        className="form-control"
                        value={regcolor.asintomatici.minperc}
                        onChange={handleChangeAsinto}
                      ></input>
                      <div class="input-group-append">
                        <span class="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Colore primo range:</label>
                  <input className='form-control' type="color" name="minColor" value={regcolor.asintomatici.minColor} onChange={handleChangeAsinto}></input><br></br>
                </div>
                </div>
              <br></br>

              <div class="row">
                <div class="col-md-6">
                  <label>Soglia superiore:</label>
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      name="maxperc"
                      className="form-control"
                      value={regcolor.asintomatici.maxperc}
                      onChange={handleChangeAsinto}
                    ></input>
                    <div class="input-group-append">
                      <span class="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <label>Colore secondo range:</label>
                  <input className='form-control' type="color" name="mediumColor" value={regcolor.asintomatici.mediumColor} onChange={handleChangeAsinto}></input><br></br>
                </div>
              </div>
              <br></br>

              <div class="row">
                <div class="offset-md-6 col-md-6">
                  <label>Colore terzo range:</label>
                  <input className='form-control' type="color" name="maxColor" value={regcolor.asintomatici.maxColor} onChange={handleChangeAsinto}></input><br></br>
                </div>
              </div>
              <br></br>

              <div class="row justify-content-center">
                <div class=" col-md-10 ">
                  <input type="submit" className="btn myBtn btn-block"></input>
                </div>
              </div>

            </form>
          </div>
        </Route> 
      </div >
        </HashRouter >
  );
}
