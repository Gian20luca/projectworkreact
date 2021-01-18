import React, { useEffect, useState } from "react";
import './FormComponentThresholds.css';
import { Service } from "../../../service/Service";
import axios from 'axios';
import { Route } from "react-router";
import { HashRouter, Link, Redirect } from "react-router-dom";
import Swal from 'sweetalert2';

export function FormComponentThresholds(props) {
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
        [event.target.name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value,
      }
    }));
  };
  const handleChangeAsinto = (event) => {
    setRegcolor((prev) => ({
      ...prev,
      asintomatici: {
        ...prev.asintomatici,
        [event.target.name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value,
      }
    }));

  };
  const handleChangeDecessi = (event) => {
    setRegcolor((prev) => ({
      ...prev,
      decessi: {
        ...prev.decessi,
       [event.target.name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value,
      }
    }));
  };

  /*handle submit---------------------------------------------------------------------------------------*/

  const handleSubmitPositive = (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Vuoi davvero aggiornare questi dati?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Salva`,
      denyButtonText: `Annulla`,
      showClass: {
        popup: 'animate_ animate__animated animate__zoomIn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        
        postData(
          regcolor.positivi.minperc,
          regcolor.positivi.maxperc,
          regcolor.positivi.maxColor,
          regcolor.positivi.minColor,
          regcolor.positivi.mediumColor,
          1, 'positivi');
        Swal.fire({
          icon: 'success',
          title: 'Salvataggio avvenuto con successo',
          confirmButtonText: 'Vai alla pagina principale',
          showClass: {
            popup: 'animate_ animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate_ animate__animated animate__lightSpeedOutLeft'
          },
      },
      () => {
        return <Redirect to="/" />
      })
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'error',
          title: 'I dati non sono stati aggiornati',
          showClass: {
            popup: 'animate_ animate__animated animate__jackInTheBox'
          },
          hideClass: {
            popup: 'animate_ animate__animated animate__hinge'
          },
      })
      }
    })
  };

  const handleSubmitDeaths = (event) => {
    event.preventDefault();
  Swal.fire({
    title: 'Vuoi davvero aggiornare questi dati?',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: `Salva`,
    denyButtonText: `Annulla`,
    showClass: {
      popup: 'animate_ animate__animated animate__zoomIn'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      postData(regcolor.decessi.minperc,
        regcolor.decessi.maxperc,
        regcolor.decessi.maxColor,
        regcolor.decessi.minColor,
        regcolor.decessi.mediumColor,
        2, 'decessi');
      Swal.fire({
        icon: 'success',
        title: 'Salvataggio avvenuto con successo',
        confirmButtonText: 'Vai alla pagina principale',
        showClass: {
          popup: 'animate_ animate__animated animate__zoomIn'
        },
        hideClass: {
          popup: 'animate_ animate__animated animate__lightSpeedOutLeft'
        },
    },
    () => {
      return <Redirect to="/mapDeaths" />
    })
    } else if (result.isDenied) {
      Swal.fire({
        icon: 'error',
        title: 'I dati non sono stati aggiornati',
        showClass: {
          popup: 'animate_ animate__animated animate__jackInTheBox'
        },
        hideClass: {
          popup: 'animate_ animate__animated animate__hinge'
        },
    })
    }
  })
};

  const handleSubmitAsnto = (event) => {
      event.preventDefault();
    Swal.fire({
      title: 'Vuoi davvero aggiornare questi dati?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Salva`,
      denyButtonText: `Annulla`,
      showClass: {
        popup: 'animate_ animate__animated animate__zoomIn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        postData(regcolor.asintomatici.minperc,
          regcolor.asintomatici.maxperc,
          regcolor.asintomatici.maxColor,
          regcolor.asintomatici.minColor,
          regcolor.asintomatici.mediumColor,
          3, 'asintomatici');
        Swal.fire({
          icon: 'success',
          title: 'Salvataggio avvenuto con successo',
          confirmButtonText: 'Vai alla pagina principale',
          showClass: {
            popup: 'animate_ animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate_ animate__animated animate__lightSpeedOutLeft'
          },
      },
      () => {
        return <Redirect to="/mapAsymptomatic" />
      })
      } else if (result.isDenied) {
        Swal.fire({
          icon: 'error',
          title: 'I dati non sono stati aggiornati',
          showClass: {
            popup: 'animate_ animate__animated animate__jackInTheBox'
          },
          hideClass: {
            popup: 'animate_ animate__animated animate__hinge'
          },
      })
      }
    })
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
      <div className="container margineSuperiore animate_ animate_animated animate_bounceInDown">
        <div className="row">
          <div className="col-md-12">
            <ul>
              <li>
                <Link className="nav-link linkThresholds" to="/">
                  Positivi
                </Link>
              </li>
              <li>
                <Link className="nav-link linkThresholds" to="/Deaths">
                  Decessi
                </Link>
              </li>
              <li>
                <Link className="nav-link linkThresholds" to="/Asymptomatic">
                  Asintomatici
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* positivi */}
        <Route exact path="/">
          <div className="divInput offset-md-1 col-md-10 offset-md-1 animate_ animate_animated animate_bounceInDown">
            <h3>Positivi</h3>
            <form
              className="card card-body mt-3"
              onSubmit={handleSubmitPositive}
            >
              <label>Soglia inferiore:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      data-type='number'
                      placeholder="0"
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div>
                    <div className="input-group mb-3">
                      <input
                        min={1}
                        max={regcolor.positivi.maxperc - 3}
                        type="number"
                        name="minperc"
                        className="form-control"
                        value={parseInt(regcolor.positivi.minperc)}
                        onChange={handleChangePositivi}
                      ></input>
                      <div className="input-group-append">
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                    {regcolor.positivi.minperc < 1 && (
                      <small className="form-text text-danger">
                        Inserisci numero maggiore o uguale a 1{" "}
                      </small>
                    )}
                    {regcolor.positivi.minperc >= regcolor.positivi.maxperc &&
                      regcolor.positivi.minperc < 97 && (
                        <small className="form-text text-danger">
                          La soglia inferiore non deve essere maggiore o uguale
                          a quella superiore
                        </small>
                      )}
                    {regcolor.positivi.minperc >= 97 && (
                      <small className="form-text text-danger">
                        Inserisci numero minore o uguale a 96
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Colore primo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    data-type='string'
                    name="minColor"
                    value={regcolor.positivi.minColor}
                    onChange={handleChangePositivi}
                  ></input>
                  {(regcolor.positivi.minColor === regcolor.positivi.maxColor ||
                    regcolor.positivi.minColor ===
                      regcolor.positivi.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <label>Soglia media:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder={parseInt(regcolor.positivi.minperc)+1}
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder={parseInt(regcolor.positivi.maxperc)-1}
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  { regcolor.positivi.maxperc - 1 ==
                    regcolor.positivi.minperc + 1 &&(
                    <small className="form-text text-danger">
                      {" "}
                      Il numero non puo essere uguale
                    </small>
                  )}

                  {  regcolor.positivi.minperc+1 > regcolor.positivi.maxperc-1 &&(
                    <small className="form-text text-danger">
                      {" "}
                      Il numero non puo essere minore
                    </small>
                  )}
                 
                </div>

                <div className="col-md-6">
                  <label>Colore secondo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    data-type='string'
                    name="mediumColor"
                    value={regcolor.positivi.mediumColor}
                    onChange={handleChangePositivi}
                  ></input>
                  {(regcolor.positivi.mediumColor ===
                    regcolor.positivi.maxColor ||
                    regcolor.positivi.minColor ===
                      regcolor.positivi.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <label>Soglia superiore:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      min={regcolor.positivi.minperc}
                      max={99}
                      type="number"
                      name="maxperc"
                      data-type='number'
                      className="form-control"
                      value={parseInt(regcolor.positivi.maxperc)}
                      onChange={handleChangePositivi}
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  {regcolor.positivi.maxperc <= regcolor.positivi.minperc && (
                    <small className="form-text text-danger">
                      {" "}
                      Inserisci numero maggiore della soglia inferiore
                    </small>
                  )}
                  {regcolor.positivi.maxperc > 99 && (
                    <small className="form-text text-danger">
                      La soglia superiore non può superare il 99%
                    </small>
                  )}
                  {regcolor.positivi.maxperc < regcolor.positivi.minperc && (
                    <small className="form-text text-danger">
                      La soglia superiore non può essere inferiore o uguale a
                      quella media
                    </small>
                  )}
                </div>

                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder="100"
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Colore terzo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    name="maxColor"
                    data-type='string'
                    value={regcolor.positivi.maxColor}
                    onChange={handleChangePositivi}
                  ></input>
                  {(regcolor.positivi.minColor === regcolor.positivi.maxColor ||
                    regcolor.positivi.maxColor ===
                      regcolor.positivi.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <div className="row justify-content-center">
                <div className=" col-md-10 ">
                  <input
                    type="submit"
                    className="btn myBtn btn-block"
                    disabled={
                      regcolor.positivi.minperc < 1 ||
                      regcolor.positivi.minperc > 97 ||
                      regcolor.positivi.minperc >= regcolor.positivi.maxperc ||
                      regcolor.positivi.maxperc <= regcolor.positivi.minperc ||
                      regcolor.positivi.maxperc > 99 ||
                      regcolor.positivi.minColor ===
                        regcolor.positivi.maxColor ||
                      regcolor.positivi.minColor ===
                        regcolor.positivi.mediumColor ||
                      regcolor.positivi.mediumColor ===
                        regcolor.positivi.maxColor ||
                      regcolor.positivi.maxperc - 1 ==
                        regcolor.positivi.minperc + 1 ||
                      regcolor.positivi.maxperc - 1 <
                        regcolor.positivi.minperc + 1
                    }
                  ></input>
                </div>
              </div>
            </form>
          </div>
        </Route>

        {/* -----------------------------decessi -------------------------------------*/}
        <Route exact path="/Deaths">
          <div className="divInput offset-md-1 col-md-10 offset-md-1 animate_ animate_animated animate_bounceInDown">
            <h3>Decessi</h3>
            <form className="card card-body mt-3" onSubmit={handleSubmitDeaths}>
              <label>Soglia inferiore:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div>
                    <div className="input-group mb-3">
                      <input
                        min={1}
                        max={regcolor.decessi.maxperc - 3}
                        type="number"
                        name="minperc"
                        className="form-control"
                        value={parseInt(regcolor.decessi.minperc)}
                        onChange={handleChangeDecessi}
                      ></input>
                      <div className="input-group-append">
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                    {regcolor.decessi.minperc < 1 && (
                      <small className="form-text text-danger">
                        Inserisci numero maggiore o uguale a 1{" "}
                      </small>
                    )}
                    {regcolor.decessi.minperc >= regcolor.decessi.maxperc &&
                      regcolor.decessi.minperc < 97 && (
                        <small className="form-text text-danger">
                          La soglia inferiore non deve essere maggiore o uguale
                          a quella superiore
                        </small>
                      )}
                    {regcolor.decessi.minperc >= 97 && (
                      <small className="form-text text-danger">
                        Inserisci numero minore o uguale a 96
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Colore primo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    name="minColor"
                    value={regcolor.decessi.minColor}
                    onChange={handleChangeDecessi}
                  ></input>
                  {(regcolor.decessi.minColor === regcolor.decessi.maxColor ||
                    regcolor.decessi.minColor ===
                      regcolor.decessi.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <label>Soglia media:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder={parseInt(regcolor.decessi.minperc) + 1}
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder={parseInt(regcolor.decessi.maxperc) - 1}
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  
                  { regcolor.decessi.maxperc - 1 ==
                    regcolor.decessi.minperc + 1 &&(
                    <small className="form-text text-danger">
                      {" "}
                      Il numero non puo essere uguale
                    </small>
                  )}

                  {  regcolor.decessi.minperc+1 > regcolor.decessi.maxperc-1 &&(
                    <small className="form-text text-danger">
                      {" "}
                      Il numero non puo essere minore
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label>Colore secondo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    name="mediumColor"
                    value={regcolor.decessi.mediumColor}
                    onChange={handleChangeDecessi}
                  ></input>
                  {(regcolor.decessi.mediumColor ===
                    regcolor.decessi.maxColor ||
                    regcolor.decessi.minColor ===
                      regcolor.decessi.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <label>Soglia superiore:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      min={regcolor.decessi.minperc}
                      max={99}
                      type="number"
                      name="maxperc"
                      className="form-control"
                      value={parseInt(regcolor.decessi.maxperc)}
                      onChange={handleChangeDecessi}
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  {regcolor.decessi.maxperc <= regcolor.decessi.minperc && (
                    <small className="form-text text-danger">
                      {" "}
                      Inserisci numero maggiore della soglia inferiore
                    </small>
                  )}
                  {regcolor.decessi.maxperc > 99 && (
                    <small className="form-text text-danger">
                      La soglia superiore non può superare il 99%
                    </small>
                  )}
                  {regcolor.decessi.maxperc < regcolor.decessi.minperc && (
                    <small className="form-text text-danger">
                      La soglia superiore non può essere inferiore o uguale a
                      quella media
                    </small>
                  )}
                </div>

                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder="100"
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Colore terzo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    name="maxColor"
                    value={regcolor.decessi.maxColor}
                    onChange={handleChangeDecessi}
                  ></input>
                  {(regcolor.decessi.minColor === regcolor.decessi.maxColor ||
                    regcolor.decessi.maxColor ===
                      regcolor.decessi.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <div className="row justify-content-center">
                <div className=" col-md-10 ">
                  <input
                    type="submit"
                    className="btn myBtn btn-block"
                    disabled={
                      regcolor.decessi.minperc < 1 ||
                      regcolor.decessi.minperc > 97 ||
                      regcolor.decessi.minperc >= regcolor.decessi.maxperc ||
                      regcolor.decessi.maxperc <= regcolor.decessi.minperc ||
                      regcolor.decessi.maxperc > 99 ||
                      regcolor.decessi.minColor === regcolor.decessi.maxColor ||
                      regcolor.decessi.minColor ===
                        regcolor.decessi.mediumColor ||
                      regcolor.decessi.mediumColor ===
                        regcolor.decessi.maxColor ||
                      regcolor.decessi.maxperc - 1 ==
                        regcolor.decessi.minperc + 1 ||
                      regcolor.decessi.maxperc - 1 <
                        regcolor.decessi.minperc + 1
                    }
                  ></input>
                </div>
              </div>
            </form>
          </div>
        </Route>

        {/* asintomatici */}
        <Route exact path="/Asymptomatic">
          <div className="divInput offset-md-1 col-md-10 offset-md-1 animate_ animate_animated animate_bounceInDown">
            <h3>Decessi</h3>
            <form className="card card-body mt-3" onSubmit={handleSubmitAsnto}>
              <label>Soglia inferiore:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder="0"
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div>
                    <div className="input-group mb-3">
                      <input
                        min={1}
                        max={regcolor.asintomatici.maxperc - 3}
                        type="number"
                        name="minperc"
                        className="form-control"
                        value={parseInt(regcolor.asintomatici.minperc)}
                        onChange={handleChangeAsinto}
                      ></input>
                      <div className="input-group-append">
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                    {regcolor.asintomatici.minperc < 1 && (
                      <small className="form-text text-danger">
                        Inserisci numero maggiore o uguale a 1{" "}
                      </small>
                    )}
                    {regcolor.asintomatici.minperc >=
                      regcolor.asintomatici.maxperc &&
                      regcolor.asintomatici.minperc < 97 && (
                        <small className="form-text text-danger">
                          La soglia inferiore non deve essere maggiore o uguale
                          a quella superiore
                        </small>
                      )}
                    {regcolor.asintomatici.minperc >= 97 && (
                      <small className="form-text text-danger">
                        Inserisci numero minore o uguale a 96
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Colore primo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    name="minColor"
                    value={regcolor.asintomatici.minColor}
                    onChange={handleChangeAsinto}
                  ></input>
                  {(regcolor.asintomatici.minColor ===
                    regcolor.asintomatici.maxColor ||
                    regcolor.asintomatici.minColor ===
                      regcolor.asintomatici.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <label>Soglia media:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder={parseInt(regcolor.asintomatici.minperc) + 1}
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder={parseInt(regcolor.asintomatici.maxperc) - 1}
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  { regcolor.asintomatici.maxperc - 1 ==
                    regcolor.asintomatici.minperc + 1 &&(
                    <small className="form-text text-danger">
                      {" "}
                      Il numero non puo essere uguale
                    </small>
                  )}

                  {  regcolor.asintomatici.minperc+1 > regcolor.asintomatici.maxperc-1 &&(
                    <small className="form-text text-danger">
                      {" "}
                      Il numero non puo essere minore
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label>Colore secondo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    name="mediumColor"
                    value={regcolor.asintomatici.mediumColor}
                    onChange={handleChangeAsinto}
                  ></input>
                  {(regcolor.asintomatici.mediumColor ===
                    regcolor.asintomatici.maxColor ||
                    regcolor.asintomatici.minColor ===
                      regcolor.asintomatici.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <label>Soglia superiore:</label>
              <div className="row">
                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      min={regcolor.asintomatici.minperc}
                      max={99}
                      type="number"
                      name="maxperc"
                      className="form-control"
                      value={parseInt(regcolor.asintomatici.maxperc)}
                      onChange={handleChangeAsinto}
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  {regcolor.asintomatici.maxperc <=
                    regcolor.asintomatici.minperc && (
                    <small className="form-text text-danger">
                      {" "}
                      Inserisci numero maggiore della soglia inferiore
                    </small>
                  )}
                  {regcolor.asintomatici.maxperc > 99 && (
                    <small className="form-text text-danger">
                      La soglia superiore non può superare il 99%
                    </small>
                  )}
                  {regcolor.asintomatici.maxperc <
                    regcolor.asintomatici.minperc && (
                    <small className="form-text text-danger">
                      La soglia superiore non può essere inferiore o uguale a
                      quella media
                    </small>
                  )}
                </div>

                <div className="col-md-3">
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      placeholder="100"
                      className="form-control"
                      disabled
                    ></input>
                    <div className="input-group-append">
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label>Colore terzo range:</label>
                  <input
                    className="form-control"
                    type="color"
                    name="maxColor"
                    value={regcolor.asintomatici.maxColor}
                    onChange={handleChangeAsinto}
                  ></input>
                  {(regcolor.asintomatici.minColor ===
                    regcolor.asintomatici.maxColor ||
                    regcolor.asintomatici.maxColor ===
                      regcolor.asintomatici.mediumColor) && (
                    <small className="form-text text-danger">
                      Inserire un colore diverso{" "}
                    </small>
                  )}
                  <br></br>
                </div>
              </div>
              <br></br>

              <div className="row justify-content-center">
                <div className=" col-md-10 ">
                  <input
                    type="submit"
                    className="btn myBtn btn-block"
                    disabled={
                      regcolor.asintomatici.minperc < 1 ||
                      regcolor.asintomatici.minperc > 97 ||
                      regcolor.asintomatici.minperc >=
                        regcolor.asintomatici.maxperc ||
                      regcolor.asintomatici.maxperc <=
                        regcolor.asintomatici.minperc ||
                      regcolor.asintomatici.maxperc > 99 ||
                      regcolor.asintomatici.minColor ===
                        regcolor.asintomatici.maxColor ||
                      regcolor.asintomatici.minColor ===
                        regcolor.asintomatici.mediumColor ||
                      regcolor.asintomatici.mediumColor ===
                        regcolor.asintomatici.maxColor ||
                      regcolor.asintomatici.maxperc - 1 ==
                        regcolor.asintomatici.minperc + 1 ||
                      regcolor.asintomatici.maxperc - 1 <
                        regcolor.asintomatici.minperc + 1
                    }
                  ></input>
                </div>
              </div>
            </form>
          </div>
        </Route>
      </div>
    </HashRouter>
  );
}
