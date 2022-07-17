import React from 'react';
// import {useState} from 'react'
// import {useEffect} from 'react';
import Map, { Marker} from 'react-map-gl'
// import  {Source, Layer} from 'react-map-gl'


function Mapping(props) {

    
    
    
    
    // const currentFirePosition = {
    //     type:'FeatureCollection',
    //     features: [
    //         {type:"Feature", geometry: {type:'Point', coordinates:[-122.4, 37.8]}}
    //     ]
    // }
    // const currentFirePositionStyle = {
    //     id: 'point',
    //     type: 'circle',
    //     paint: {
    //       'circle-radius': 10,
    //       'circle-color': '#007cbf'
    //     }
    // };



    if (props.lalo === null) {
        return (
            <div>
                <p>Getting your location...</p>
            </div>
        )
    }
    else {
        const latitude = props.lalo[0]
        const longitude = props.lalo[1]
        return (
            <div className='mapbox-container'>
                <div className='mapbox-container-map'>
                    <Map
                        initialViewState={{
                            latitude: latitude,
                            longitude: longitude,
                            zoom: 12
                        }}
                        style={{
                            position: 'relative',

                            height: .6 * window.innerHeight,
                        }}
                        mapStyle="mapbox://styles/mapbox/dark-v10"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                        onStyleLoad={(map) => map.resize()}
                    >
                    <Marker longitude={longitude} latitude={latitude} anchor="bottom" />
                        
                    </Map>
                </div>
                <div className='mapbox-container-text'>
                    <p className='mapbox-container-text-elt'>Your longitude is {props.lalo[1]} and your latitude is {props.lalo[0]}</p>
                    <p className='mapbox-container-text-elt'>Your windowwidth is {window.innerWidth} and your windowheight is {window.innerHeight}</p>
                </div>
            </div>
        );
    }
}

export default Mapping;