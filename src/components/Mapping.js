import React from 'react';
import { useState, useEffect, useCallback } from 'react'
import FireUnit from './FireUnit';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl'
import haversine from 'haversine';
import MarkerMult from './MarkerMult'
import FooterElt from './FooterElt';

function Mapping(props) {

    //states
    const [userLatLong, setuserLatLong] = useState(null);
    const [time, setTime] = useState(Date.now() - 2629743)
    const [hoodRiverLatLong, setHoodRiverLatLong] = useState([45.73094827741738, -121.52561932578715])
    const [coconinoLatLong, setCoconinoLatLong] = useState([35.27, -111.666])
    const [fireData, setfireData] = useState([])

    const [sortedFireData, setSortedFireData] = useState([])
    const [footerText, setFooterText] = useState("Select a fire to see more.")

    //functions
    function getuserLatLong() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setuserLatLong([position.coords.latitude, position.coords.longitude])
                },
                function () {
                    console.log("Browser had support but failed to retrieve");
                })
        }
        else {
            //No browser support, full fail
            console.log("Browser does not support geoloc")
        }
    }

    const setQuery = (latitude, longitude, areaSizeParameter) => {
        //As has a 2k req cap, this is a live filter


        //latitude is 0 to +-45, defines y coordinate
        //longitude is -90 to 90, defines x coordinate
        //in western hemisphere, increasing magnitude of neg goes west

        const xmin = longitude - areaSizeParameter
        const ymin = latitude - areaSizeParameter / 2
        const xmax = longitude + areaSizeParameter
        const ymax = latitude + areaSizeParameter / 2

        // const currentTime = Date.now()
        // console.log("Date is " + currentTime)
        //todo
        //need to filter out:
        //fireoutdatetime is not null
        //all controlled from a month ago+


        const baseUrl = "https://services3.arcgis.com/T4QMspbfLg3qTGWY/ArcGIS/rest/services/CY_WildlandFire_Locations_ToDate/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=%7Bxmin%3A+-122%2C+ymin%3A+45%2C+xmax%3A+-121%2C+ymax%3A+46%7D%0D%0A&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelContains&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token="
        const finalURL = `https://services3.arcgis.com/T4QMspbfLg3qTGWY/ArcGIS/rest/services/CY_WildlandFire_Locations_ToDate/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=%7Bxmin%3A+${xmin}%2C+ymin%3A+${ymin}%2C+xmax%3A+${xmax}%2C+ymax%3A+${ymax}%7D%0D%0A&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelContains&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`
        return finalURL
    }







    //user coordinate are passing well into here with current structure
    function getFireData(latitude, longitude) {


        const url = setQuery(coconinoLatLong[0], coconinoLatLong[1], 2)
        fetch(url)
            .then((result) => { return result.json() })
            .then((data) => {
                console.log(data)

                setfireData((data.features).filter(element =>
                    (element.attributes.DailyAcres > 5 || element.attributes.FireDiscoveryDateTime > 1651370102)

                ))

            })
            .catch((err) => console.log(err))
    }

    const orderFiresByDistance = () => {

        const user_location = {
            latitude: coconinoLatLong[0], //userLatLong[0]
            longitude: coconinoLatLong[1] //userLatLong[1]
        }
        const sortedFireData = [];
        let difference = null;

        fireData.forEach((element) => {

            difference = haversine(user_location, { latitude: element.geometry.y, longitude: element.geometry.x }, { unit: 'mile' })
            element['difference'] = difference
            if (element.attributes.CalculatedAcres == null) {
                element['sizeColor'] = "grey"
            }
            else if (element.attributes.CalculatedAcres > 0 && element.attributes.CalculatedAcres < 10) {
                element['sizeColor'] = "pink"
            }
            else if (element.attributes.CalculatedAcres > 10 && element.attributes.CalculatedAcres < 100) {
                element['sizeColor'] = "green"
            }
            else if (element.attributes.CalculatedAcres > 100 && element.attributes.CalculatedAcres < 1000) {
                element['sizeColor'] = "yellow"
            }
            else if (element.attributes.CalculatedAcres > 1000 && element.attributes.CalculatedAcres < 10000) {
                element['sizeColor'] = "orange"
            }
            else if (element.attributes.CalculatedAcres > 10000 && element.attributes.CalculatedAcres < 100000) {
                element['sizeColor'] = "red"
            }


            sortedFireData.push(element)
        })
        sortedFireData.sort((e1, e2) => e1.difference - e2.difference)
        setSortedFireData(sortedFireData)
    }






    //side effects

    //fires on render of page, gets user location once
    useEffect(() => {
        getuserLatLong()

    }, []);

    //chains after we get userlocation
    useEffect(() => {
        if (!userLatLong) {
            console.log("Waiting...")
        }
        else {
            //dead lead so can test HR
            getFireData(userLatLong[0], userLatLong[1])

        }
    }, [userLatLong]);

    //chains after we get firedata
    useEffect(() => {
        orderFiresByDistance()

    }, [fireData]);



    return (
        <div>
            <main>
                <div className='fires-container'>
                    <div className='left-box'>
                        <h2 className="left-section-title"> Local fires hot for your house:</h2>
                        {sortedFireData.map((element) => {
                            return (
                                <FireUnit
                                    key={element.attributes.OBJECTID}
                                    element={element} />
                            )
                        })}
                    </div>
                    <div className='mapbox-container-map'>
                        <Map
                            className="actual-map"
                            initialViewState={{ latitude: coconinoLatLong[0], longitude: coconinoLatLong[1], zoom: 10 }}
                            trackUserLocation={true}
                            showAccuracyCircle={true}
                            showUserHeading={true}
                            style={{ position: 'relative', height: .75 * window.innerHeight }}
                            mapStyle="mapbox://styles/mapbox/dark-v10"
                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                            onStyleLoad={(map) => map.resize()}
                        >
                            <NavigationControl showZoom={true} showCompass={false} />
                            <GeolocateControl />
                            {/* Markers for location points */}
                            <Marker
                                // latitude={props.userLatLong[0]} longitude={props.userLatLong[1]}
                                latitude={hoodRiverLatLong[0]}
                                longitude={hoodRiverLatLong[1]}
                                key="personal"
                                scale={0.5}
                                anchor="bottom"
                            />
                            <Marker
                                // latitude={props.userLatLong[0]} longitude={props.userLatLong[1]}
                                latitude={coconinoLatLong[0]}
                                longitude={coconinoLatLong[1]}
                                key="coconino"
                                scale={0.5}
                                anchor="bottom"
                            />
                            {sortedFireData.map((element) => {
                                return (
                                    <MarkerMult
                                        element={element}
                                        setFooterText={setFooterText}
                                    />
                                )
                            })}
                        </Map>
                    </div>
                </div>
            </main>
            <footer>
                <FooterElt footerText={footerText} />
            </footer>
        </div>
    );
}

export default Mapping;