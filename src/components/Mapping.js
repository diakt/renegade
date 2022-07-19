import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl'
// import  {Source, Layer} from 'react-map-gl'
// import { useCallback } from 'react';
import { Popup } from 'react-map-gl';
import haversine from 'haversine';




function Mapping(props) {
    //sets cursor to hand inside map
    

    const [fireLoc, setFireLoc] = useState([])
    const [received, setReceived] = useState(false)
    // const [firePerim, setFirePerim] = useState([])
    const [closestFire, setClosestFire] = useState([])
    const [fires100, setFires100] = useState([])

    

    function getFireLoc() {
        const url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
        fetch(url)
            .then((result) => { return result.json() })
            .then((data) => {
                // console.log(data.features)
                setFireLoc(data.features)
                setReceived(true)
            })
            .catch((err) => console.log(err))
    }

    const getClosestFire = () => {
        //I downloaded npm haversine
        const user_location = {
            // latitude: props.lalo[0],
            // longitude: props.lalo[1],
            latitude: 45.73094827741738,
            longitude: -121.52561932578715
        }


        let lowestDistMiles = 2000 
        let closestFire = null;
        const within100 = [];

        let fire_location = null;
        let difference = null;
        //parse through fireLoc and get closest fireID
        
        fireLoc.forEach((element) => {
            //if distance between fire and point is least so far, new closest
            difference = haversine(user_location, {latitude: element.geometry.y,longitude: element.geometry.x}, { unit: 'mile' })
            if (difference < lowestDistMiles) {
                lowestDistMiles = difference
                element['difference'] = difference
                closestFire = element
            }
            //if distance is within 100, add to list
            if (difference < 100){
                element['difference'] = difference
                within100.push(element)

            }
        }
        )
        //sort in place by distance

        within100.sort((e1, e2) => e1.difference - e2.difference)

        // console.log("Closest fire was")
        setClosestFire(closestFire)
        setFires100(within100)





    }

    useEffect(() => {
        getFireLoc()



    }, []);

    useEffect(() => {
        getClosestFire()



    }, [received]);

    

    if (props.lalo === null) {
        return (
            <div className='loading-screen'>
                <p>Getting your location...</p> 
            </div>
        )
    }
    else {
        return (
            <div className='fires-container'>
                <div className='left-box'>
                    <h2 className="left-section-title"> Local fires hungry for your house:</h2>
                    <div className='fire-unit'>
                        <h4 className="fire-name"> Fire name</h4>
                        <ul className='fire-details'>
                            <li className='fire-detail'>Acres: </li>
                            <li className='fire-detail'>Acreage: </li>
                            <li className='fire-detail'>Acreage: </li>
                            <li className='fire-detail'>Acreage: </li>
                        </ul>
                    </div>
                    {fires100.map((element) => {
                        return (
                            <div className='fire-unit'>
                                <h4 className="fire-name"> Fire name</h4>
                                <ul className='fire-details'>
                                    <li className='fire-detail'>Miles from fire: {element.difference.toFixed(0)} </li>
                                    
                                </ul>
                            </div>
                        )
                    })}
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
                            showCompass={false}
                        />
                        <Marker 
                        // longitude={props.lalo[1]} 
                        // latitude={props.lalo[0]} 
                        latitude={45.73094827741738}
                        longitude={-121.52561932578715} 
                        key = "personal"
                        scale = {0.5}
                        anchor="bottom" 
                        />
                        {fireLoc.map((element) => {

                            return (
                                <Marker
                                    longitude={element.geometry.x}
                                    latitude={element.geometry.y}
                                    key={element.attributes.OBJECTID}
                                    color='red'
                                    scale={0.5}
                                    anchor="bottom" 
                                    onHov
                                    onmouseenter
                                    onClick={(event)=>{
                                        console.log(element);
                                        return (
                                        <Popup 
                                        longitude={element.geometry.x} 
                                        latitude={element.geometry.y}
                                        anchor="bottom"
                                        >
                                            You are here
                                        </Popup>
                                        )
                                    
                                    }}
                                    
                                    />
                                    
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