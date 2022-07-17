import React from 'react';
import { useState, useEffect} from 'react';

function FireLoc(props) {
    const [fireLoc, setFireLoc] = useState([])


    useEffect(()=> {
        const url = "https://eonet.gsfc.nasa.https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/Current_WildlandFire_Locations/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson/api/v3/events?category=wildfires"
        fetch(url)
            .then((result) => {return result.json()})
            .then((data) => {
                setFireLoc(data.events)
            })
            .catch((err) => console.log(err))


    }, []);







    return (
        <ul className='current-fire-position-list'>
            {fires.map((incident)=>{
                return(
                    <li className='fire-event'
                        key={incident.id}>
                        <p>Incident Name: {incident.title} </p>
                        <p>Incident Title: {incident.id} </p>
                        <p>Location: {incident.geometry[0]["coordinates"][0]}, {incident.geometry[0]["coordinates"][1]}</p>
                        <p>Incident Date: {incident.geometry[0]["date"].substring(0, 10)} </p>
                        <br />
                    </li>
                    
                )
            })}
            
        </ul>
    );
}

export default FireEvents;