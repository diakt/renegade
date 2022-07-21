import React, { useState, useEffect} from 'react';
import FireUnit from './FireUnit';
import Map, {NavigationControl, GeolocateControl } from 'react-map-gl'

import haversine from 'haversine';
import MarkerMult from './MarkerMult'
import FooterElt from './FooterElt';
import LocForm from './LocForm';



function Mapping() {

    //states
    const [userLatLong, setUserLatLong] = useState([]);
    const [fireData, setFireData] = useState([])
    const [sortedFireData, setSortedFireData] = useState([])
    const [footerText, setFooterText] = useState("Waiting for user to enable location data. I assure you that I am not competent enough to abuse your privacy.")

    //[45.73094827741738, -121.52561932578715])
    //[35.27, -111.666])

    


    //functions
    function getuserLatLong() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    console.log(position.coords.latitude, position.coords.longitude)
                    setUserLatLong([position.coords.latitude, position.coords.longitude])
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
        console.log(latitude, longitude, areaSizeParameter)
        //45.73094827741738, -121.52561932578715
        //latitude is 0 to +-45, defines y coordinate
        //longitude is -90 to 90, defines x coordinate
        //in western hemisphere, increasing magnitude of neg goes west

        const xmin = Number(longitude) - Number(areaSizeParameter)
        const ymin = Number(latitude) - Number(areaSizeParameter) / 2
        const xmax = Number(longitude) + Number(areaSizeParameter)
        const ymax = Number(latitude) + Number(areaSizeParameter) / 2
        console.log(xmin, xmax, ymin, ymax)



        
        const finalURL = `https://services3.arcgis.com/T4QMspbfLg3qTGWY/ArcGIS/rest/services/CY_WildlandFire_Locations_ToDate/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=%7Bxmin%3A+${xmin}%2C+ymin%3A+${ymin}%2C+xmax%3A+${xmax}%2C+ymax%3A+${ymax}%7D%0D%0A&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelContains&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=true&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`
        return finalURL
    }







    //user coordinate are passing well into here with current structure
    function getFireData(latitude, longitude) {


        const url = setQuery(latitude, longitude, 3)
        fetch(url)
            .then((result) => { return result.json() })
            .then((data) => {

                // console.log(data.features)
                console.log(data.features)
                setFireData(data.features)
                // console.log((data.features).filter(element =>
                //     ((element.attributes.DailyAcres > .1 || element.attributes.DiscoveryAcres > 0.1) && element.attributes.FireDiscoveryDateTime > 1650553364000)
                //     || ((element.attributes.DailyAcres > 1 || element.attributes.DiscoveryAcres > 0.1) && element.attributes.FireDiscoveryDateTime > 1647874964000)
                //     || ((element.attributes.CalculatedAcres != null && element.attributes.DailyAcres > 1))
                // ))
                // setFireData((data.features).filter(element =>
                //     ((element.attributes.CalculatedAcres != null))
                //     || ((element.attributes.DailyAcres > 1 || element.attributes.DiscoveryAcres > 0.1) && element.attributes.FireDiscoveryDateTime > 1650553364000)
                //     || ((element.attributes.DailyAcres > 5 || element.attributes.DiscoveryAcres > 0.1) && element.attributes.FireDiscoveryDateTime > 1647874964000)

                // ))

            })
            .catch((err) => console.log(err))
    }

    const orderFiresByDistance = () => {

        const user_location = {
            latitude: userLatLong[0], //userLatLong[0]
            longitude: userLatLong[1] //userLatLong[1]
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
            if (element.attributes.IncidentName === "Turkey Hills") {
                element['sizeColor'] = "purple"
                console.log(element)
            }


            sortedFireData.push(element)
        })
        sortedFireData.sort((e1, e2) => e1.difference - e2.difference)
        setSortedFireData(sortedFireData)
    }


    // const goTo = () => {
    //     const {current: map} = useMap();

    //     const onDblClick = () => {
    //         map.flyTo({center: [userLatLong[0], userLatLong[1]]});
    //     };
    // }


    //side effects

    //fires on render of page, gets user location once
    useEffect(() => {
        getuserLatLong()

    }, []);

    //chains after we get userlocation
    useEffect(() => {
        console.log("userLatLong changed")
        console.log(userLatLong)
        if (!userLatLong) {
        }
        else {
            setFooterText("Select a fire to see more.")
            getFireData(userLatLong[0], userLatLong[1])
        }
    }, [userLatLong]);

    //chains after we get firedata
    // useEffect(() => {
    //     orderFiresByDistance()

    // }, [fireData]);

    setTimeout(() => {
        orderFiresByDistance()
    }, 100);



    return (
        <div>
            <main>
                <div className='fires-container'>
                    <div className='left-box'>
                        <h3 className="left-section-title"> Set location:</h3>
                        <LocForm
                            setUserLatLong={setUserLatLong}
                            setFireData={setFireData}
                            setSortedFireData={setSortedFireData}
                        />
                        <h3 className="left-section-title"> Local fires:</h3>
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
                            initialViewState={{ latitude: 37.0902, longitude: -95.7129, zoom: 3 }}
                            trackUserLocation={true}
                            showAccuracyCircle={true}
                            showUserHeading={true}
                            style={{ position: 'relative', height: .75 * window.innerHeight }}
                            mapStyle="mapbox://styles/mapbox/dark-v10"
                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                            onStyleLoad={(map) => { map.resize() }}
                        
                        >

                            <NavigationControl showZoom={true} showCompass={false} />
                            <GeolocateControl
                                fitBoundsOptions={{ maxZoom: 8 }}
                            />
                            {/* Markers for location points */}

                            {/* <Marker
                                // latitude={props.userLatLong[0]} longitude={props.userLatLong[1]}
                                latitude={hoodRiverLatLong[0]}
                                longitude={hoodRiverLatLong[1]}
                                key="hoodriver"
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
                            /> */}

                            {sortedFireData.map((element) => {

                                return (
                                    <MarkerMult
                                        key={element.attributes.OBJECTID}
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