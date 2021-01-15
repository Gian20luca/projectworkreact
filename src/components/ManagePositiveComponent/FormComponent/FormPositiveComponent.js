import React, { useEffect, useState } from "react";
import { Service } from "../../../service/Service";
import axios from 'axios';
export function FormPositive() {
  const [regione, setRegione] = useState();
  useEffect(() => {
    let call = new Service();

    call.getGeojsonANDMyDb().then(axios.spread(function (data1, data2, data3) {
      //setto lo stato del geojson
       setRegione(predbregione => predbregione = data2.data);

    }));
  }, [])


  
  return (
    <form className="container">
      <label of="region">Select Region :</label>
      <select id="region" name="region">
        {regione ? regione.map((item,num) => {
            return <option value={item.id} key={num}>{item.name}</option>

        }):null}
      </select>
      <label of="positive">Number of Positive</label>
      <input type="number"></input>
    </form>
  );
}
