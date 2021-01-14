import React, { useEffect, useState } from "react";
import { Service } from "../../../service/Service";

export function FormPositive() {
  const [regione, setRegione] = useState();
  useEffect(() => {
    let call = new Service();

    call.getGeoForm().then(function (response) {
      setRegione((dati) => (dati = response.data));
      //console.log(regione)
    });
  }, []);

 
  
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
