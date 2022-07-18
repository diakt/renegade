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
    function getClosestFire(){
            //so first, what are lat and long?
            //one lat is 69 miles, minute is 1.15, second is 101 feet
            //one long is 54.6 miles, minute is .91 miles, second is 80 feet


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
            <div className='fires-container'>
                <div className='left-box'>
                    <h2 className = "left-section-title"> Local fires in your area:</h2>
                    <ul className='left-box-ul'>
                        <div className='fire-unit'>
                            <h4 className = "fire-name"> Fire name</h4>
                            <p className='fire-details'> 
                                dingo
                                dingo
                                Dingo is 34 and has no home.

                                sss
                            </p>
                           
                        </div>
                        <div className='fire-unit'>
                            <h4 className = "fire-name"> Fire name</h4>
                            <p> Detail:</p>
                            <p> Detail:</p>
                        </div>
                        
                    </ul>
                </div>
                <div className='mapbox-container-map'>
                    <Map
                        className="actual-map"
                        initialViewState={{
                            // latitude: props.lalo[0],
                            // longitude: props.lalo[1],
                            latitude: 45.73094827741738,
                            longitude: -121.52561932578715,
                            
                            // 45.73094827741738, -121.52561932578715
                            zoom: 8
                        }}
                        

                        style={{
                            position: 'relative',
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




                    {/* <Source id="current-fire-loc" type="geojson" data = {currentFireLocation}>
                        <Layer {...currentFireLocationStyle}/>
                    </Source> */}
                    </Map>
                </div>

            </div>
        );
    }
}

export default Mapping;