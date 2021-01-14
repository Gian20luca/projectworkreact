import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import { Service } from '../../service/Service';

export function MapComponent() {
    const [geojson, setGeojson] = useState();

    const position = [41, 13];
    useEffect(() => {
        let service = new Service.getInstance();
        return service.getGeojson().then(function (response) {
            setGeojson(pregeojson => pregeojson = response.data.features);
        });
    }, [])

    console.log(geojson)
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <MapContainer center={position} zoom={5}>
                        <TileLayer
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                        />
                        {geojson && <GeoJSON data={geojson}></GeoJSON>}
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}


