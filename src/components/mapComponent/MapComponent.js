import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

export function MapComponent() {

    const position = [41, 13];

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
        <MapContainer center={position} zoom={5}>
            <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            />
        </MapContainer>
        </div>
        </div>
        </div>
    )
}


