import React, { useEffect, useState } from "react";
import { Service } from "../../../service/Service";
import axios from 'axios';
import { Route } from "react-router";
import { HashRouter, Link } from "react-router-dom";

export function FormComponentThresholds() {
  const [regione, setRegione] = useState();
  const [regcolor, setRegcolor] = useState({

    positivi : {
      minColor: "",
      mediumColor: "",
      maxColor: "",
      minperc: "",
      maxperc: "",
    },
    decessi : {
      minColor: "",
      mediumColor: "",
      maxColor: "",
      minperc: "",
      maxperc: "",
    },
    asintomatici : {
      minColor: "",
      mediumColor: "",
      maxColor: "",
      minperc: "",
      maxperc: "",
    }
  });

  let patch = new Service();
  /*-------------------------------------------------------------------------------------- */
  useEffect(() => {
    let call = new Service();

    call.getGeojsonANDMyDb().then(
      axios.spread(function (data1, data2, data3) {
        console.log(data3.data);
        //setto lo stato del geojson
        //setRegione((predbregione) => (predbregione = data3.data));
        setRegcolor(() => ({
           positivi : {

             minColor : data3.data[0].minColor,
             mediumColor : data3.data[0].mediumColor,
             maxColor : data3.data[0].maxColor,
             minperc: data3.data[0].minThresholds ,
             maxperc: data3.data[0].maxThresholds ,
           },
           decessi : {

            minColor : data3.data[1].minColor,
            mediumColor : data3.data[1].mediumColor,
            maxColor : data3.data[1].maxColor,
            minperc: data3.data[1].minThresholds ,
            maxperc: data3.data[1].maxThresholds ,
          },
          asintomatici : {

            minColor : data3.data[2].minColor,
            mediumColor : data3.data[2].mediumColor,
            maxColor : data3.data[2].maxColor,
            minperc: data3.data[2].minThresholds ,
            maxperc: data3.data[2].maxThresholds ,
          }       
        }));
      })
    );
  }, []);
/*handle change --------------------------------------------------------------------*/
const handleChangePositivi = (event) => {
  setRegcolor((prev) => ({
    ...prev,
  positivi : {
    ...prev.positivi,
    [event.target.name]: event.target.value,
    }
  }));
  
};
const handleChangeAsinto = (event) => {
  setRegcolor((prev) => ({
    ...prev,
    asintomatici : {
      ...prev.asintomatici,
    [event.target.name]: event.target.value,
    }
  }));
 
};
const handleChangeDecessi = (event) => {
  setRegcolor((prev) => ({
    ...prev,
    decessi : {
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
    1,'positivi');
};

const handleSubmitAsnto = (event) => {
  event.preventDefault();
  postData(  regcolor.asintomatici.minperc, 
    regcolor.asintomatici.maxperc,
    regcolor.asintomatici.maxColor,  
    regcolor.asintomatici.minColor, 
    regcolor.asintomatici.mediumColor, 
    3, 'asintomatici');
};

const handleSubmitDeaths = (event) => {
  event.preventDefault();
  postData( regcolor.decessi.minperc, 
    regcolor.decessi.maxperc,
    regcolor.decessi.maxColor,  
    regcolor.decessi.minColor, 
    regcolor.decessi.mediumColor, 
    2, 'decessi');
};

const postData = (minperc,maxperc,maxC,minC,mediumC, id, tipe) => {
  switch (tipe) {
    case 'positivi':
      patch.patchColor(minperc,maxperc,maxC,minC,mediumC, id);
      break;
    case 'decessi':
      patch.patchColor(minperc,maxperc,maxC,minC,mediumC, id);
      break;
    case 'asintomatici':
      patch.patchColor(minperc,maxperc,maxC,minC,mediumC, id);
      break;

  }
};
/*-----------------------------------------------------------------------------------------------------------*/

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
              <h1>Positivi</h1>
              <form onSubmit={handleSubmitPositive}>
                <label>MIN:</label>
                <input type="color" name="minColor" value={regcolor.positivi.minColor} onChange={handleChangePositivi}></input>
                <label>medium:</label>
                <input type="color" name="mediumColor" value={regcolor.positivi.mediumColor} onChange={handleChangePositivi}></input>
                <label>Max:</label>
                <input type="color" name="maxColor" value={regcolor.positivi.maxColor} onChange={handleChangePositivi}></input>
                <br></br>
                <div>
                <label>min Positivi</label>
                <input
                  type="number"
                  name="minperc"
                  className="form-control"
                  value={regcolor.positivi.minperc}
                  onChange={handleChangePositivi}
                ></input>
              </div>
              <div>
                <label>max Positivi</label>
                <input
                  type="number"
                  name="maxperc"
                  className="form-control"
                  value={regcolor.positivi.maxperc}
                  onChange={handleChangePositivi}
                ></input>
                </div>
                <input type="submit" className="btn btn-warning"></input>
              </form>
            </Route>



            <Route exact path="/Deaths">
            <h1>Morti</h1>
            <form onSubmit={handleSubmitDeaths}>
                <label>MIN:</label>
                <input type="color" name="minColor" value={regcolor.decessi.minColor} onChange={handleChangeDecessi}></input>
                <label>medium:</label>
                <input type="color" name="mediumColor" value={regcolor.decessi.mediumColor} onChange={handleChangeDecessi}></input>
                <label>Max:</label>
                <input type="color" name="maxColor" value={regcolor.decessi.maxColor} onChange={handleChangeDecessi}></input>
                <br></br>
                <div>
                <label>min Positivi</label>
                <input
                  type="number"
                  name="minperc"
                  className="form-control"
                  value={regcolor.decessi.minperc}
                  onChange={handleChangeDecessi}
                ></input>
              </div>
              <div>
                <label>max Positivi</label>
                <input
                  type="number"
                  name="maxperc"
                  className="form-control"
                  value={regcolor.decessi.maxperc}
                  onChange={handleChangeDecessi}
                ></input>
                </div>
                <input type="submit" className="btn btn-warning"></input>
              </form>
            </Route>



            <Route exact path="/Asymptomatic">
              <h1>Asintomatici</h1>
              <form onSubmit={handleSubmitAsnto}>
                <label>MIN:</label>
                <input type="color" name="minColor" value={regcolor.asintomatici.minColor} onChange={handleChangeAsinto}></input>
                <label>medium:</label>
                <input type="color" name="mediumColor" value={regcolor.asintomatici.mediumColor} onChange={handleChangeAsinto}></input>
                <label>Max:</label>
                <input type="color" name="maxColor" value={regcolor.asintomatici.maxColor} onChange={handleChangeAsinto}></input>
                <br></br>
                <div>
                <label>min Positivi</label>
                <input
                  type="number"
                  name="minperc"
                  className="form-control"
                  value={regcolor.asintomatici.minperc}
                  onChange={handleChangeAsinto}
                ></input>
              </div>
              <div>
                <label>max Positivi</label>
                <input
                  type="number"
                  name="maxperc"
                  className="form-control"
                  value={regcolor.asintomatici.maxperc}
                  onChange={handleChangeAsinto}
                ></input>
                </div>
                <input type="submit" className="btn btn-warning"></input>
              </form>
            </Route>
          </HashRouter>
        </div>
      </div>
    </div>

  );
}
