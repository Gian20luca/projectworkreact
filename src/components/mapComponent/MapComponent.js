import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import { Service } from '../../service/Service';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export function MapComponent() {
  const [geojson, setGeojson] = useState();
  const [dbRegione, setDbRegione] = useState();
  const [dbSoglie, setDbSoglie] = useState();

  const position = [41, 13];
  useEffect(() => {
    let service = new Service.getInstance();
    return service.getGeojsonANDMyDb().then(axios.spread(function (data1, data2, data3) {
      //setto lo stato del geojson
      setGeojson(pregeojson => pregeojson = data1.data);
      //setto lo stato del dbRegione
      setDbRegione(predbregione => predbregione = data2.data);
      //setto lo stato del dbSoglie
      setDbSoglie(predbsoglie => predbsoglie = data3.data);
      //risposta geojson
      console.log(data1.data)
      //Risposta db regioni
      console.log(data2.data)
      //Risposta db soglie
      console.log(data3.data)
    }));
  }, [])

  const getColor = (positivi, popolazione, idsoglie) => {
    return ((positivi / popolazione) * 100) <= dbSoglie[idsoglie].minThresholds ? dbSoglie[idsoglie].minColor :
      ((positivi / popolazione) * 100) > dbSoglie[idsoglie].minThresholds && ((positivi / popolazione) * 100) <= dbSoglie[idsoglie].maxThresholds ? dbSoglie[idsoglie].mediumColor :
        ((positivi / popolazione) * 100) > dbSoglie[idsoglie].maxThresholds ? dbSoglie[idsoglie].maxColor :
          '#FFEDA0';
  };

  const stylePositivi = (features) => {
    return {
      fillColor: getColor(dbRegione[features.properties.reg_istat_code_num - 1].positive, dbRegione[features.properties.reg_istat_code_num - 1].population, 0),
      weight: 1.7,
      opacity: 1,
      color: 'black',
      dashArray: '1',
      fillOpacity: 0.7
    };
  };

  const styleDecessi = (features) => {
    return {
      fillColor: getColor(dbRegione[features.properties.reg_istat_code_num - 1].deaths, dbRegione[features.properties.reg_istat_code_num - 1].population, 1),
      weight: 1.7,
      opacity: 1,
      color: 'black',
      dashArray: '1',
      fillOpacity: 0.7
    };
  };

  const styleAsintomatici = (features) => {
    return {
      fillColor: getColor(dbRegione[features.properties.reg_istat_code_num - 1].asymptomatic, dbRegione[features.properties.reg_istat_code_num - 1].positive, 2),
      weight: 1.7,
      opacity: 1,
      color: 'black',
      dashArray: '1',
      fillOpacity: 0.7
    };
  };

  // const onEachcountry = (country, layer) => {
  //     const countryName = country.properties.ADMIN;
  //     console.log(countryName);

  //     layer.on({
  //         mouseover: (event) => {
  //             event.target.setStyle({
  //                 color: "black"
  //             }
  //             )
  //         }
  //     })}


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <BrowserRouter>
            <Link className="nav-link" to="/mapPositive">mappa positivi</Link>
            <Link className="nav-link" to="/mapDeaths">mappa decessi</Link>
            <Link className="nav-link" to="/mapAsymptomatic">mappa asintomatici</Link>
            <Switch>
              <Route exact path="/mapPositive">
                <MapContainer center={position} zoom={5}>
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                  />
                  {geojson && dbRegione && dbSoglie && <GeoJSON style={stylePositivi} data={geojson.features}></GeoJSON>}
                </MapContainer>
              </Route>
              <Route exact path="/mapDeaths">
                {<MapContainer center={position} zoom={5}>
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                  />
                  {geojson && dbRegione && dbSoglie && <GeoJSON style={styleDecessi} data={geojson.features}></GeoJSON>}
                </MapContainer>}
              </Route>
              <Route exact path="/mapAsymptomatic">
                <MapContainer center={position} zoom={5}>
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                  />
                  {geojson && dbRegione && dbSoglie && <GeoJSON style={styleAsintomatici} data={geojson.features}></GeoJSON>}
                </MapContainer>
              </Route>
            </Switch >
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}


