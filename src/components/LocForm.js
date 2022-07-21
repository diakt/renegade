import React from 'react';
import {useState} from 'react'

function LocForm(props) {
    
    const initialState = {
        latitude: 0,
        longitude: 0
    }
    const [latlongState, setlatlongState] = useState(initialState)
    
    const handleChange = (event) => {

        setlatlongState({...latlongState, [event.target.id]: event.target.value})

    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        props.setFireData([]);
        props.setSortedFireData([]);
        console.log([latlongState.latitude, latlongState.longitude])
        props.setUserLatLong([latlongState.latitude, latlongState.longitude]);
        
        //but really set to change userlatlong form passed to props
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="number"
                id = "latitude"
                placeholder='Enter latitude'
                inputMode='text'

                onChange={handleChange}
                value={latlongState.latitude}
                />


                <input
                type="number"
                id = "longitude"
                placeholder='Enter longitude'
                inputMode='text'

                onChange={handleChange}
                value={latlongState.longitude}
                />



                <button type="submit">Change location</button>
            </form>
            
        </div>
    );
}

export default LocForm;