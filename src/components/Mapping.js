//relevant imports
import React, { useState, useEffect } from 'react';
import Map, { NavigationControl, GeolocateControl, useMap, Marker, MapProvider } from 'react-map-gl'
import haversine from 'haversine';
//function components
import DispLatLong from './DispLatLong';
import FireUnit from './FireUnit';
import FooterElt from './FooterElt';



function Mapping() {

    //states
    const [userLatLong, setUserLatLong] = useState([]);
    const [newLatLong, setNewLatLong] = useState([]);
    const [fireData, setFireData] = useState([])
    const [sortedFireData, setSortedFireData] = useState([])
    const [footerText, setFooterText] = useState("Select a fire to see more.")
    const { mymap } = useMap()



    //functions
    function getuserLatLong() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setUserLatLong([position.coords.latitude, position.coords.longitude])
                },
                function () {
                    setFooterText("Waiting for user to enable location data. I assure you that I am not competent enough to abuse your privacy.");
                })
        }
        else {
            //No browser support, full fail
            setFooterText("Unfortunately, this browser does not support geolocation. Try again on another computer.");
        }
    }

    const setQuery = (latitude, longitude, areaSizeParameter) => {
        //2k cap on requests, so this is a live filter with a customized request url
        //latitude is 0 to +-45, defines y coordinate, while longitude is -90 to 90, defines x coordinate
        //in western hemisphere, increasing magnitude of neg goes west
        //The number function is used as I had an interesting bug
        const xmin = Number(longitude) - Number(areaSizeParameter)
        const ymin = Number(latitude) - Number(areaSizeParameter) / 2
        const xmax = Number(longitude) + Number(areaSizeParameter)
        const ymax = Number(latitude) + Number(areaSizeParameter) / 2

        const finalURL = `https://services3.arcgis.com/T4QMspbfLg3qTGWY/ArcGIS/rest/services/CY_WildlandFire_Locations_ToDate/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=%7Bxmin%3A+${xmin}%2C+ymin%3A+${ymin}%2C+xmax%3A+${xmax}%2C+ymax%3A+${ymax}%7D%0D%0A&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelContains&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`
        return finalURL
    }



    function getFireData(latitude, longitude) {
        //in this function, we fetch our data with a query generated by a url for a certain location
        const url = setQuery(latitude, longitude, 3)
        fetch(url)
            .then((result) => { return result.json() })
            .then((data) => {
                setFireData((data.features).filter(element =>
                    (element.attributes.DiscoveryAcres != null || element.attributes.DiscoveryAcres != null || element.attributes.CalculatedAcres != null)
                ))

                //I leave this in here as a reminder for future expansion.
                // setFireData((data.features).filter(element =>
                //     ((element.attributes.CalculatedAcres != null))
                //     || ((element.attributes.DailyAcres > 1 || element.attributes.DiscoveryAcres > 0.1) && element.attributes.FireDiscoveryDateTime > 1650553364000)
                //     || ((element.attributes.DailyAcres > 5 || element.attributes.DiscoveryAcres > 0.1) && element.attributes.FireDiscoveryDateTime > 1647874964000)
                // ))


            })
            .catch((err) => console.log(err))
    }

    const orderFiresByDistance = () => {
        //in this function, we add some additional features to our elements in our fire data set
        //we also double store, but that is for a later intended functionality
        const user_location = {
            latitude: userLatLong[0], //userLatLong[0]
            longitude: userLatLong[1] //userLatLong[1]
        }
        const sortedFireData = fireData;
        let difference = null;

        //note that the haversine function is a function to calculate distance across an oblate spheroid from two lat-long points
        sortedFireData.forEach((element) => {
            difference = haversine(user_location, { latitude: element.geometry.y, longitude: element.geometry.x }, { unit: 'mile' })
            element['difference'] = difference
            if (element.attributes.DailyAcres == null && element.attributes.DailyAcres == null) {
                element['sizeColor'] = "grey"
            }
            else if (element.attributes.DailyAcres > 0 && element.attributes.DailyAcres < 10) {
                element['sizeColor'] = "green"
            }
            else if (element.attributes.DailyAcres > 10 && element.attributes.DailyAcres < 100) {
                element['sizeColor'] = "blue"
            }
            else if (element.attributes.DailyAcres > 100 && element.attributes.DailyAcres < 1000) {
                element['sizeColor'] = "yellow"
            }
            else if (element.attributes.DailyAcres > 1000 && element.attributes.DailyAcres < 10000) {
                element['sizeColor'] = "orange"
            }
            else if (element.attributes.DailyAcres > 10000 && element.attributes.DailyAcres < 100000) {
                element['sizeColor'] = "red"
            }

            if (element.attributes.OrganizationalAssessment != null) {
                element['sizeColor'] = "purple"
            }

        })
        sortedFireData.sort((e1, e2) => e1.difference - e2.difference)
        setSortedFireData(sortedFireData)
    }








    //side effects
    //fires on render of page, gets user location once
    useEffect(() => {
        getuserLatLong()

    }, []);

    //chains after we get userlocation to get our data, but also if we submit a lat/long through page form.
    useEffect(() => {

        if (!userLatLong) {
        }
        else {
            setFooterText("Select a fire to see more.")
            getFireData(userLatLong[0], userLatLong[1])



        }
    }, [userLatLong]);


    const geolocateControlRef = React.useCallback((ref) => {
        if (ref) {
            // Activate as soon as the control is loaded
            ref.trigger();
        }

    }, [userLatLong]);










    setTimeout(() => {
        orderFiresByDistance()
    }, 50);



    return (
        <div>
            <MapProvider>
                <main>
                    <div className='fires-container'>
                        <div className='left-box'>

                            <DispLatLong />

                            <h2 className="left-section-title"> Local fires:</h2>
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
                                id="mymap"
                                initialViewState={{ latitude: 37.0902, longitude: -95.7129, zoom: 3 }}
                                trackUserLocation={true}
                                showAccuracyCircle={true}
                                showUserHeading={true}
                                style={{ position: 'relative', height: .75 * window.innerHeight }}
                                mapStyle="mapbox://styles/mapbox/dark-v10"
                                mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                                onLoad={(map) => { console.log(map, "map print on loading") }}
                            >

                                <NavigationControl showZoom={true} showCompass={false} />
                                <GeolocateControl
                                    ref={geolocateControlRef}
                                    fitBoundsOptions={{ maxZoom: 7 }}

                                />

                                {sortedFireData.map((element) => {
                                    return (
                                        <Marker
                                            longitude={element.geometry.x}
                                            latitude={element.geometry.y}
                                            key={element.attributes.OBJECTID}
                                            color={element.sizeColor}
                                            scale={0.5}
                                            anchor="bottom"
                                            onClick={(event) => {
                                                console.log(element);
                                                setFooterText(
                                                    "The fire you have selected is titled the " + element.attributes.IncidentName +
                                                    " Fire. It was discovered on " + new Date(element.attributes.FireDiscoveryDateTime).getMonth().toString() + '/' + new Date(element.attributes.FireDiscoveryDateTime).getDate().toString() +
                                                    ", approximately " + (element.difference).toFixed(0) + " miles from you."

                                                )
                                            }}
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
            </MapProvider>
        </div>
    );
}

export default Mapping;