import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import { Service } from '../../service/Service';
import axios from 'axios';

export function MapComponent() {
    const [geojson, setGeojson] = useState();
    const [dbRegione, setDbRegione] =  useState();
    const [dbSoglie, setDbSoglie] =  useState();

    const position = [41, 13];
    useEffect(() => {
        let service = new Service.getInstance();
        return service.getGeojsonANDMyDb().then(axios.spread(function(data1,data2,data3) {
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

    const controlNumber = (
        population,
        positive,
        minPositiveThresholds,
        maxPositiveThresholds,
        minColorPositiveThresholds,
        mediumColorPositiveThresholds,
        maxColorPositiveThresholds
      ) => {
        if ((positive / population) * 100 <= minPositiveThresholds) {
          return {
            color: 'black',
            fillColor: minColorPositiveThresholds,
            fillOpacity: 0.75,
            opacity: 1,
            weight: 0.6,
          };
        }
        if (
          (positive / population) * 100 > minPositiveThresholds &&
          (positive / population) * 100 <= maxPositiveThresholds
        ) {
          return {
            color: 'black',
            fillColor: mediumColorPositiveThresholds,
            fillOpacity: 0.75,
            opacity: 1,
            weight: 0.6,
          };
        }
        if ((positive / population) * 100 > maxPositiveThresholds) {
          return {
            color: 'black',
            fillColor: maxColorPositiveThresholds,
            fillOpacity: 0.75,
            opacity: 1,
            weight: 0.6,
          };
        }
      };

      const style = (features) => {
        for (var i = 0; i < 20; i++) {
          switch (features.properties.reg_istat_code_num - 1) {
            case i:
              return controlNumber(
                dbRegione[features.properties.reg_istat_code_num - 1].population,
                dbRegione[features.properties.reg_istat_code_num - 1].positive,
                dbSoglie[0].minPositiveThresholds,
                dbSoglie[0].maxPositiveThresholds,
                dbSoglie[0].minColorPositiveThresholds,
                dbSoglie[0].mediumColorPositiveThresholds,
                dbSoglie[0].maxColorPositiveThresholds
              );
          }
        }
      }

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
                    <MapContainer center={position} zoom={5}>
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                        />
                        {geojson && dbRegione && dbSoglie && <GeoJSON style={style} data={geojson.features}></GeoJSON>}
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}


