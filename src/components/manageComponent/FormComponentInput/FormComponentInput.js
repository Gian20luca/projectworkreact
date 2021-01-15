import React, { useEffect, useState } from "react";
import { Service } from "../../../service/Service";
import axios from "axios";
export function FormComponentInput(props) {
  const [regione, setRegione] = useState();
  const [reg, setReg] = useState({
    id: "",
    positivi: "",
    asintomatici: "",
    decessi: "",
  });

  let patch = new Service();
  useEffect(() => {
    let call = new Service();

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
    <div class="container col-6">
      {/* Positive and Regions */}
      <form className="form-group" onSubmit={handleSubmitPositive}>
        <label of="region">Select Region :</label>
        <select name="id" className="form-control" value={reg.id} onChange={handleChange}>
          <option >-Select Region-</option>
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

        <label of="positive">Number of Positive</label>
        <input
          className="form-control"
          type="number"
          name="positivi"
          value={reg.positivi}
          onChange={handleChange}
        ></input>
        <input type="submit" className="btn btn-warning"></input>
      </form>
      {/* Asymptomatic */}
      <form className="form-group" onSubmit={handleSubmitAsnto}>
        <label of="asimptomatici">Number of asymptomatic</label>
        <input
          type="number"
          name="asintomatici"
          className="form-control"
          value={reg.asintomatici}
          onChange={handleChange}
        ></input>
        <input type="submit" className="btn btn-warning"></input>
      </form>
      {/* Deaths */}
      <form className="form-group" onSubmit={handleSubmitDeaths}>
        <label of="decessi">Number of Deaths</label>
        <input
          type="number"
          name="decessi"
          className="form-control"
          value={reg.decessi}
          onChange={handleChange}
        ></input>
        <input type="submit" className="btn btn-warning"></input>
      </form>
    </div>
  );
}