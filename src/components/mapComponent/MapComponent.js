import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import { Service } from '../../service/Service';
import axios from 'axios';
import { HashRouter, Route, Link } from "react-router-dom";
import Swal from 'sweetalert2';

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
      fillOpacity: 0.75,
      opacity: 1,
      weight: 0.6,
      color: 'black',
    };
  };

  const styleDecessi = (features) => {
    return {
      fillColor: getColor(dbRegione[features.properties.reg_istat_code_num - 1].deaths, dbRegione[features.properties.reg_istat_code_num - 1].population, 1),
      fillOpacity: 0.75,
      opacity: 1,
      weight: 0.6,
      color: 'black',
    };
  };

  const styleAsintomatici = (features) => {
    return {
      fillColor: getColor(dbRegione[features.properties.reg_istat_code_num - 1].asymptomatic, dbRegione[features.properties.reg_istat_code_num - 1].positive, 2),
      fillOpacity: 0.75,
      opacity: 1,
      weight: 0.6,
      color: 'black',
    };
  };
  const highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 1.2,
      color: 'black',
      fillOpacity: 1,
    });
    //RegionWindow( e.target.feature.properties.reg_istat_code_num,"Positivi");
  }

  const resetHighlight = e => {
    const layer = e.target;
    layer.setStyle({
      fillOpacity: 0.75,
      opacity: 1,
      weight: 0.6,
      color: 'black',
    });

  };

  const zoomToFeaturePositive = () => {
    
    return function (e) {
      Swal.fire({ 
        imageUrl: dbRegione[e.target.feature.properties.reg_istat_code_num - 1].stemmaSvg,
        imageWidth: 75,
        title:  dbRegione[e.target.feature.properties.reg_istat_code_num - 1].name,
        html:  '<p>Popolazione: ' +  dbRegione[e.target.feature.properties.reg_istat_code_num - 1].population  + '</p><p>Positivi: ' + dbRegione[e.target.feature.properties.reg_istat_code_num - 1].positive + '</p><p> Positivi su popolazione: ' + (dbRegione[e.target.feature.properties.reg_istat_code_num - 1].positive/dbRegione[e.target.feature.properties.reg_istat_code_num - 1].population)*100 + '</p>',
      
        showCloseButton: true,
        showConfirmButton: false,
      })
  }
}
const zoomToFeatureDeaths = () => {
    
  return function (e) {
    Swal.fire({ 
      imageUrl: dbRegione[e.target.feature.properties.reg_istat_code_num - 1].stemmaSvg,
      imageWidth: 75,
      title:  dbRegione[e.target.feature.properties.reg_istat_code_num - 1].name,
      html:  '<p>Popolazione: ' +  dbRegione[e.target.feature.properties.reg_istat_code_num - 1].population  + '</p><p>Decessi: ' + dbRegione[e.target.feature.properties.reg_istat_code_num - 1].deaths + '</p><p> Decessi su popolazione: ' + (dbRegione[e.target.feature.properties.reg_istat_code_num - 1].deaths/dbRegione[e.target.feature.properties.reg_istat_code_num - 1].population)*100  + '</p>',
    
      showCloseButton: true,
      showConfirmButton: false,
    })
}
}
const zoomToFeatureAsymptomatic = () => {
    
  return function (e) {
    Swal.fire({ 
      imageUrl: dbRegione[e.target.feature.properties.reg_istat_code_num - 1].stemmaSvg,
      imageWidth: 75,
      title:  dbRegione[e.target.feature.properties.reg_istat_code_num - 1].name,
      html:  '<p>Popolazione: ' +  dbRegione[e.target.feature.properties.reg_istat_code_num - 1].population  + '</p><p>Asintomatici: ' + dbRegione[e.target.feature.properties.reg_istat_code_num - 1].asymptomatic + '</p><p> Asintomatici su positivi: ' + (dbRegione[e.target.feature.properties.reg_istat_code_num - 1].asymptomatic/dbRegione[e.target.feature.properties.reg_istat_code_num - 1].positive)*100  + '</p>',
    
      showCloseButton: true,
      showConfirmButton: false,
    })
}
}

  const onEachcountryPositive = (features, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeaturePositive(),
    })
    layer.bindTooltip(features.properties.reg_name);
  }
  const onEachcountryDeaths = (features, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeatureDeaths(),
    })
    layer.bindTooltip(features.properties.reg_name);
  }
  const onEachcountryAsymptomatic = (features, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeatureAsymptomatic(),
    })
    layer.bindTooltip(features.properties.reg_name);
  }



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <HashRouter>
            <ul>
              <li><Link className="nav-link" to="/">Positivi</Link></li>
              <li><Link className="nav-link" to="/mapDeaths">Decessi</Link></li>
              <li><Link className="nav-link" to="/mapAsymptomatic">Asintomatici</Link></li>
            </ul>
            <Route exact path="/">
              <MapContainer center={position} zoom={5} minZoom={5} maxZoom={5.5}>
                <TileLayer
                  attribution='Progetto di: Bellafronte, Caliandro, Verdesca, Colitta'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />
                {geojson && dbRegione && dbSoglie && <GeoJSON style={stylePositivi} onEachFeature={onEachcountryPositive} data={geojson.features}></GeoJSON>}
              </MapContainer>
            </Route>
            <Route exact path="/mapDeaths">
              <MapContainer center={position} zoom={5} minZoom={5} maxZoom={5.5}>
                <TileLayer
                  attribution='Progetto di: Bellafronte, Caliandro, Verdesca, Colitta'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />
                {geojson && dbRegione && dbSoglie && <GeoJSON style={styleDecessi} onEachFeature={onEachcountryDeaths} data={geojson.features}></GeoJSON>}
              </MapContainer>
            </Route>
            <Route exact path="/mapAsymptomatic">
              <MapContainer center={position} zoom={5} minZoom={5} maxZoom={5.5}>
                <TileLayer
                  attribution='Progetto di: Bellafronte, Caliandro, Verdesca, Colitta'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />
                {geojson && dbRegione && dbSoglie && <GeoJSON style={styleAsintomatici} onEachFeature={onEachcountryAsymptomatic} data={geojson.features}></GeoJSON>}
              </MapContainer>
            </Route>
          </HashRouter>
        </div>
      </div>
    </div>
  )
}


