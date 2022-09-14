import React from 'react';
import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl';
import DingoButton from './DingoButton';


export default function DispLatLong({ spec_map, started }) {

    const { mymap } = useMap();
    const [lat, setLat] = useState(37.0902);
    const [lng, setLng] = useState(-95.7129);
    const [zoom, setZoom] = useState(3);


    const onClick = () => {
        if (mymap) {
            console.log(mymap.getCenter());
        }
        else {
            console.log("Map not started yet, so not printing center");
        }
    };


    useEffect(() => {
        if (!mymap) return; // wait for map to initialize
        mymap.on('moveend', () => {
            setLng(mymap.getCenter().lng.toFixed(4));
            setLat(mymap.getCenter().lat.toFixed(4));
            setZoom(mymap.getZoom().toFixed(2));
        });
    });





    return (
        <div style={{marginTop:0}}>

            <h2 style={{marginTop:"1vh", marginBottom:0}}>Current location:</h2>
            <ul style={{ margin:0, padding:0}}>
                <li style={{listStyleType:"None"}} > Latitude: {lat}</li>
                <li style={{listStyleType:"None"}} > Longitude: {lng}</li>
            </ul>
            <button style={{marginTop:"1vh"}} onClick={onClick}>Render fires at location</button>
        </div>
    )
        //border:"3px red", borderStyle: "dashed",


}

