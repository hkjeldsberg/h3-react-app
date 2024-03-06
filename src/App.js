import React from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
import * as h3 from "h3-js";
import MapboxComponent from "./MapboxComponent";


function App() {
    const coordinates = [
        {lat: 37.7756, lng: -122.4273}, // San Francisco
        {lat: 40.7128, lng: -74.0060}, // New York
    ];
    const res = 7
    const cells = coordinates.map(coord => {
            const h3Index = h3.latLngToCell(coord.lat, coord.lng, res)
            return h3Index
        }
    )
    return (
        <div className="App">
            <header className="App-header">
                <p>Hallo</p>
                <MapboxComponent/>
                <p>My coordinates as H3 cells</p>
                <ul>
                    <li>{cells[0]}</li>
                    <li>{cells[1]}</li>
                </ul>
            </header>
        </div>
    );
}

export default App;
