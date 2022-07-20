import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl'
// import {GeolocateEvent, GeolocateResultEvent} from 'react-map-gl'
// import  {Source, Layer} from 'react-map-gl'
// import { useCallback } from 'react';
// import { Popup } from 'react-map-gl';
import haversine from 'haversine';




function Mapping(props) {


    //This sets the 
    const [fireLoc, setFireLoc] = useState([])

    // const [firePerim, setFirePerim] = useState([])
    const [closestFire, setClosestFire] = useState([])
    const [fires100, setFires100] = useState([])


    //In this function, I get the fires near our location, or set lat long for test.
    //I will have customized the url based on our location/lat long
    //Then we will have a subset of events that are local to latlong.
    //I will then sort them by difference.
    //The lower function is vestigial, as we first were doing all.
    //We can't do all in US with 22k with a 2k request, so we will combine them.
    function getFireLoc(latitude, longitude) {
        const url = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/CY_WildlandFire_Locations_ToDate/FeatureServer/0/query?where=1%3D1&outFields=CalculatedAcres,ContainmentDateTime,EstimatedCostToDate,FireBehaviorGeneral,FireBehaviorGeneral1,FireBehaviorGeneral2,FireBehaviorGeneral3,FireCause,FireCauseSpecific,FireDiscoveryDateTime,FireMgmtComplexity,FireOutDateTime,FireStrategyConfinePercent,FireStrategyFullSuppPercent,ICS209ReportDateTime,IncidentName,IncidentShortDescription,IncidentTypeCategory,IncidentTypeKind,InitialLatitude,InitialLongitude,InitialResponseDateTime,PercentContained,PercentPerimeterToBeContained,POOCounty,PredominantFuelGroup,PredominantFuelModel,PrimaryFuelModel,UniqueFireIdentifier,CreatedOnDateTime_dt,ModifiedOnDateTime_dt,ControlDateTime,FireCauseGeneral,TotalIncidentPersonnel,ABCDMisc&outSR=4326&f=json"
        fetch(url)
            .then((result) => { return result.json() })
            .then((data) => {
                setFireLoc(data.features.filter(element =>
                    element.attributes.CalculatedAcres > 1000))
               


            })
            .catch((err) => console.log(err))
    }
    // This function needs our array of fire events.
    //It parses this array and orders them by closest to farthest.
    //It is not vestigial because it orders th...
    //maybe I should just order them above....
    //but no, I get a subset above, and then sort this smaller...
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

        // let fire_location = null;
        let difference = null;
        //parse through fireLoc and get closest fireID

        fireLoc.forEach((element) => {
            //if distance between fire and point is least so far, new closest
            difference = haversine(user_location, { latitude: element.geometry.y, longitude: element.geometry.x }, { unit: 'mile' })
            if (difference < lowestDistMiles) {
                lowestDistMiles = difference
                element['difference'] = difference
                closestFire = element
            }
            //if distance is within 100, add to list
            if (difference < 100) {
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
        getClosestFire()




    }, []);



    //This function adds a snap to geolocate control.
    //It is vestigial, but adds a control that could be useful later on.
    const geolocateControlRef = React.useCallback((ref) => {
        if (ref) {
            // Activate as soon as the control is loaded
            ref.trigger();
        }
    }, []);






    return (
        <div className='fires-container'>
            <div className='left-box'>
                <h2 className="left-section-title"> Local fires hungry for your house:</h2>
                {fires100.map((element) => {
                    return (
                        <div className='fire-unit' key={element.attributes.OBJECTID}>
                            <h4 className="fire-name"> {element.attributes.IncidentName}</h4>
                            <ul className='fire-details'>
                                <li className='fire-detail'>Miles from fire: {element.difference.toFixed(0)} </li>
                                <li className='fire-detail'>Discovered: {new Date(element.attributes.FireDiscoveryDateTime).getMonth().toString() + '/' + new Date(element.attributes.FireDiscoveryDateTime).getDate().toString()} </li>

                            </ul>
                        </div>
                    )
                })}
            </div>


            <div className='mapbox-container-map'>
                <Map
                className="actual-map"
                initialViewState={{latitude: 45.73094827741738,longitude: -121.52561932578715,zoom: 8}}
                // latitude: props.lalo[0], ongitude: props.lalo[1],
                trackUserLocation={true}
                showAccuracyCircle={true}
                showUserHeading={true}
                style={{position: 'relative',height: .75 * window.innerHeight}}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                onStyleLoad={(map) => map.resize()}
                > 

                <NavigationControl showZoom={true} showCompass={false}/>
                <GeolocateControl ref={geolocateControlRef} />

                {/* Markers for location points */}

                <Marker
                // latitude={props.lalo[0]} longitude={props.lalo[1]} 
                latitude={45.73094827741738}
                longitude={-121.52561932578715}
                key="personal"
                scale={0.5}
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
                        onClick={(event) => {console.log(element);}}
                        />
                    )
                })}

                </Map>
            </div>
        </div>
    );
}

export default Mapping;