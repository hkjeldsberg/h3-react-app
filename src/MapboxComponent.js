import './index.css'
import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiaGtqZWxkc2JlcmciLCJhIjoiY2x0OGlpenhwMDUwdjJrbXN2amRob2UyZyJ9.QJHta987c3rIsIhFMyFYjQ"
// Here's our Mapbox imports
const MapboxComponent = () => {
    const mapContainerRef = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-122.431297);
    const [lat, setLat] = useState(37.773972);
    const [zoom, setZoom] = useState(9);
    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
            // Add our navigation control (the +/- zoom buttons)
        });
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        map.current.on("load", () => {
            // Nifty code to force map to fit inside container when it loads
            map.current.resize();
            map.current.addSource('earthquakes', {
                type: 'geojson',
                //data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
                data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
            });
            map.current.addLayer({
                'id': 'earthquakes-layer',
                'type': 'circle',
                'source': 'earthquakes',
                // Color circles by ethnicity, using a `match` expression.
                'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 2,
                    'circle-color': [
                        'step',
                        ['get', 'mag'], // Get the magnitude from the feature properties
                        '#ffe0ac', // Default color for mag < 2
                        1.5, '#ffc195', // Color for 2 <= mag < 3
                        3, '#fc9a2a', // Color for 3 <= mag < 4
                        4.5, '#ff1718', // Color for 4 <= mag < 5
                        6, '#7d001b' // Color for mag >= 5
                    ],
                    'circle-stroke-color': 'white'
                }
            });

            // Access the source and log its data
            // const source = map.current.getSource('ethnicity');
            // console.log(source)
            // if (source.type === 'geojson' && source._data && source._data.features) {
            //     source._data.features.forEach(feature => {
            //         console.log(feature.geometry.coordinates);
            //     });
            // }

        })


        // Clean up on unmount
        return () => map.current.remove();
    }, [lat, lng, zoom]);


    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainerRef} className="map-container"/>
        </div>
    );
};

export default MapboxComponent;