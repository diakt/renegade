import React from 'react';
import {useState} from 'react'
import {useEffect} from 'react';
import Map, { Marker, NavigationControl} from 'react-map-gl'
import  {Source, Layer} from 'react-map-gl'


function Mapping(props) {
    const [fireLoc, setFireLoc] = useState([])
    const [firePerim, setFirePerim] = useState([])

    function getFireLoc(){
        const url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
        fetch(url)
            .then((result) => {return result.json()})
            .then((data) => {
                console.log(data.features)
                setFireLoc(data.features)
            })
            .catch((err) => console.log(err))
    }
    
    function getFirePerim(){
    const url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Perimeters/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
    fetch(url)
        .then((result) => {return result.json()})
        .then((data) => {
            setFirePerim(data)
        })
        .catch((err) => console.log(err))
    }
    
    const currentFireLocation = {
        type:'FeatureCollection',
        features: {fireLoc}
    }

    const currentFireLocationStyle = {
        id: 'point',
        type: 'circle',
        paint: {
          'circle-radius': 1000,
          'circle-color': 'red'
        }
    };

    const currentFirePerim = {
        type:'FeatureCollection',
        features: {firePerim}
    }


    useEffect(()=> {
        getFireLoc()
        getFirePerim()
        
        
      }, []);

    if (props.lalo === null) {
        return (
            <div>
                <p>Getting your location...</p>
            </div>
        )
    }
    else {
        return (
            <div className='mapbox-container'>
                <div className='mapbox-container-map'>
                    <Map
                        className="actual-map"
                        initialViewState={{
                            latitude: props.lalo[0],
                            longitude: props.lalo[1],
                            zoom: 5
                        }}
                        

                        style={{
                            position: 'relative',
                            width: .75 * window.innerWidth,
                            height: .75 * window.innerHeight,
                        }}
                        
                        mapStyle="mapbox://styles/mapbox/dark-v10"
                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                        onStyleLoad={(map) => map.resize()}

                    >
                    <NavigationControl
                    showZoom={true} 
                    showCompass = {false}
                    />
                    <Marker longitude={props.lalo[1]} latitude={props.lalo[0]} anchor="bottom" />
                    {fireLoc.map((element)=> {
                        
                        return (
                            <Marker longitude = {element.geometry.x} latitude = {element.geometry.y} anchor="bottom"/>
                        )
                    })}




                    <Source id="current-fire-loc" type="geojson" data = {currentFireLocation}>
                        <Layer {...currentFireLocationStyle}/>
                    </Source>
                    </Map>
                </div>

            </div>
        );
    }
}

export default Mapping;