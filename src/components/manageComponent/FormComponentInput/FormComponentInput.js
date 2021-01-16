import React, { useEffect, useState } from "react";
import './FormComponentInput.css';
import { Service } from "../../../service/Service";
import axios from "axios";
export function FormComponentInput(props) {
  const [regione, setRegione] = useState();
  const [reg, setReg] = useState({
    id: "",
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
      })
    );
  }, []);

  const handleChange = (event) => {
    setReg((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(reg.positivi);
  };

  const handleSubmitPositive = (event) => {
    event.preventDefault();
    console.log("reg is: ", reg);
    postData(reg.positivi, reg.id, 'positivi');
  };

  const handleSubmitAsnto = (event) => {
    event.preventDefault();
    console.log("reg is: ", reg);
    postData(reg.asintomatici, reg.id, 'asintomatici');
  };

  const handleSubmitDeaths = (event) => {
    event.preventDefault();
    console.log("reg is: ", reg);
    postData(reg.decessi, reg.id, 'decessi');
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
        <div className="offset-md-3 col-md-6 offset-md-3 card card-body mt-3">
          {/* Positive and Regions */}
          <form className="form-group " onSubmit={handleSubmitPositive}>
            <label of="region">Seleziona una regione:</label>
            <select name="id" className="form-control" value={reg.id} onChange={handleChange}>
              <option >-Regione-</option>
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
            <br></br>
            <div className='divCard'>
            <label of="positive">Numero dei positivi:</label>
            <input
              className="form-control"
              type="number"
              name="positivi"
              value={reg.positivi}
              onChange={handleChange}
            ></input>
            <br></br>
            <input type="submit" className="btn myBtn offset-md-4 col-md-4 offset-md-4"></input>
            </div>
          </form>
          {/* Deaths */}
          <form className="form-group divCard" onSubmit={handleSubmitDeaths}>
            <label of="decessi">Numero dei decessi: </label>
            <input
              type="number"
              name="decessi"
              className="form-control"
              value={reg.decessi}
              onChange={handleChange}
            ></input>
            <br></br>
            <input type="submit" className="btn myBtn offset-md-4 col-md-4 offset-md-4"></input>
          </form>
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
            <br></br>
            <input type="submit" className="btn myBtn offset-md-4 col-md-4 offset-md-4"></input>
          </form>
        </div>
      </div>
    </div>
  );
}