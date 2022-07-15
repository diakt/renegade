import React from 'react';
import { useState, useEffect} from 'react';

function FireEvents(props) {
    const [fires, setFires] = useState([])


    useEffect(()=> {
        const url = "https://eonet.gsfc.nasa.gov/api/v3/events?category=wildfires"
        fetch(url)
            // .then((result) => {return result.json()})
            .then((result) => {return result.json()})
            .then((data) => {
                setFires(data.events)
            })
            .catch((err) => console.log(err))


    }, []);







    return (
        <ul className='fire-event-list'>
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