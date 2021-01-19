import React, { useEffect, useState } from "react";
import './FormComponentInput.css';
import { Service } from "../../../service/Service";
import axios from "axios";
import Swal from 'sweetalert2';
import { ScrollInputDataComponent } from './scrollInputDataComponent/ScrollInputDataComponent';
import { useHistory } from 'react-router-dom'

export function FormComponentInput(props) {
  let _history = useHistory();
  const [collapseInput, setCollapseInput] = useState();
  const [regione, setRegione] = useState([]);
  const [reg, setReg] = useState({
    id: 0,
    positivi: 0,
    asintomatici: 0,
    decessi: 0,
  });

  let patch = new Service.getInstance();
  useEffect(() => {
    let call = new Service.getInstance();

    call.getGeojsonANDMyDb().then(
      axios.spread(function (data1, data2, data3) {
        console.log(data2.data);
        //setto lo stato del geojson
        setRegione((predbregione) => (predbregione = data2.data));

        //setReg((prevreg)=> (prevreg.positivi = regione[reg.id].positive));
      })
    );
  }, []);
  //console.log(regione);

  const handleChangeSelect = (event) => {
    setReg((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setCollapseInput(prev => prev = event.target.value);
  };

  const handleChange = (event) => {
    setReg((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

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
        postData(reg.positivi, reg.id, 'positivi');
        Swal.fire({
          icon: 'success',
          title: 'Salvataggio avvenuto con successo',
          confirmButtonText: 'Home',
          showDenyButton: true,
          denyButtonText: `Annulla`,
          showClass: {
            popup: 'animate_ animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate_ animate__animated animate__lightSpeedOutLeft'
          },
        }).then((result) => {
          result.isConfirmed ? setTimeout(() => { _history.push('/') }, 900) : setTimeout(() => { _history.push('/ManageInput') }, 900)
        })
      }
      else if (result.isDenied) {
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
        postData(reg.decessi, reg.id, 'decessi');
        Swal.fire({
          icon: 'success',
          title: 'Salvataggio avvenuto con successo',
          confirmButtonText: 'Home',
          showDenyButton: true,
          denyButtonText: `Annulla`,
          showClass: {
            popup: 'animate_ animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate_ animate__animated animate__lightSpeedOutLeft'
          },
        }).then((result) => {
          result.isConfirmed ? setTimeout(() => { _history.push('../#/mapDeaths') }, 900) : setTimeout(() => { _history.push('/ManageInput') }, 900)
        })
      }
      else if (result.isDenied) {
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
        postData(reg.asintomatici, reg.id, 'asintomatici');
        Swal.fire({
          icon: 'success',
          title: 'Salvataggio avvenuto con successo',
          confirmButtonText: 'Home',
          showDenyButton: true,
          denyButtonText: `Annulla`,
          showClass: {
            popup: 'animate_ animate__animated animate__zoomIn'
          },
          hideClass: {
            popup: 'animate_ animate__animated animate__lightSpeedOutLeft'
          },
        }).then((result) => {
          result.isConfirmed ? setTimeout(() => { _history.push('../#/mapAsymptomatic') }, 900) : setTimeout(() => { _history.push('/ManageInput') }, 900)
        })
      }
      else if (result.isDenied) {
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




  const postData = (value, id, tipe) => {
    switch (tipe) {
      case 'positivi':
        patch.patchJsonPositive(value, id);
        break;
      case 'decessi':
        patch.patchJsonDeaths(value, id);
        break;
      case 'asintomatici':
        patch.patchJsonAsinto(value, id);
        break;
    }
  };

  return (
    <div className="container divFormInput margineSuperiore animate_ animate__animated animate__bounceInDown">
      <div className="row">
        <div className='col-md-4 overflow-auto card card-body' style={{ height: '69vh', marginTop: '80px', padding: '17px', marginRight: '70px', border: '3px solid  #002080' }}>
          <ScrollInputDataComponent collapseInput={collapseInput} />
        </div>
        <div className="col-md-7 card card-body" style={{ marginTop: '70px', border: '3px solid  #002080' }}>

          {/* Positive and Regions */}
          <form className="form-group " onSubmit={handleSubmitPositive}>

            <label of="region">Seleziona una regione:</label>
            <select style={{ border: '1px solid  #002080' }} name="id" className="form-control" value={reg.id} onChange={handleChangeSelect}>
              {reg.id === 0 && <option>-Regione-</option>}
              {regione
                ? regione.map((item, num) => {
                  return (
                    <option value={item.id} key={num}>
                      {item.name}
                    </option>
                  );
                })
                : null}

            </select>
            {!reg.id && <small className="form-text text-danger">Selezionare una regione.</small>}
            <br></br>
            <div className='row'>
              <div className='divCard offset-md-3 col-md-6 offset-md-3'>
                <label of="positive">Numero dei positivi:</label>
                <input
                  className="form-control"
                  type="number"
                  name="positivi"
                  value={reg.positivi}
                  onChange={handleChange}
                ></input>
                {!reg.id || reg.positivi < 0 && <small className="form-text text-danger">Inserire numero maggiore di 0. </small>}
                {!reg.id || reg.positivi > regione[reg.id - 1].population && <small className="form-text text-danger">Inserire numero inferiore o uguale alla popolazione.</small>}
                <br></br>
                <button type="submit" disabled={reg.positivi < 0 || !reg.positivi || !reg.id || reg.positivi > regione[reg.id - 1].population} className="btn myBtn offset-md-4 col-md-4 offset-md-4">Invia</button>
              </div>
            </div>
          </form>
          <div className='row'>
            {/* Deaths */}
            <div className='col-md-6'>
              <form className="form-group divCard " onSubmit={handleSubmitDeaths}>
                <label of="decessi">Numero dei decessi: </label>
                <input
                  type="number"
                  name="decessi"
                  className="form-control"
                  value={reg.decessi}
                  onChange={handleChange}
                ></input>
                {!reg.id || reg.decessi < 0 && <small className="form-text text-danger">Inserire numero maggiore di 0.</small>}
                {!reg.id || reg.decessi > regione[reg.id - 1].population && <small className="form-text text-danger">Inserire numero inferiore o uguale alla popolazione.</small>}
                <br></br>
                <button type="submit" disabled={reg.decessi < 0 || !reg.id || !reg.decessi || reg.decessi > regione[reg.id - 1].population} className="btn myBtn offset-md-4 col-md-4 offset-md-4">Invia</button>
              </form>
            </div>
            <div className=' col-md-6'>
              {/* Asymptomatic */}
              <form className="form-group divCard" onSubmit={handleSubmitAsnto}>
                <label of="asimptomatici">Numero degli asintomatici: </label>
                <input
                  type="number"
                  name="asintomatici"
                  className="form-control"
                  value={reg.asintomatici}
                  onChange={handleChange}
                ></input>
                {!reg.id || reg.asintomatici < 0 && <small className="form-text text-danger">Inserire numero maggiore di 0.</small>}
                {!reg.id || reg.asintomatici > regione[reg.id - 1].positive && <small className="form-text text-danger">Inserire numero inferiore o uguale ai positivi.</small>}
                <br></br>
                <button type="submit" disabled={reg.asintomatici < 0 || !reg.asintomatici || !reg.id || reg.asintomatici > regione[reg.id - 1].positive} className="btn myBtn offset-md-4 col-md-4 offset-md-4">Invia</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}