import React from 'react';
import {useState} from 'react'

function LocForm(props) {
    
    const initialState = {
        latitude: '',
        longitude: '',
        sizeParam: ''
    }
    const [latlongState, setlatlongState] = useState(initialState)
    
    const handleChange = (event) => {
        setlatlongState({...latlongState, [event.target.id]: event.target.value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(dingo)
        
        //but really set to change userlatlong form passed to props
    }
    return (
        <div>
            <form>
                <input
                id = "latitude"
                inputMode='text'
                pattern="[0-9]*"
                onChange={handleChange}
                value={latlongState.latitude}
                >
                Latitude between -90 and 90
                </input>

                <input
                id = "longitude"
                inputMode='text'
                pattern="[0-9]*"
                onChange={handleChange}
                value={latlongState.longitude}
                >
                Longitude between -180 and 180
                </input>

                <input
                id = "sizeParam"
                inputMode='text'
                pattern="[0-9]*"
                onChange={handleChange}
                value={latlongState.sizeParam}
                >
                Shown Area
                </input>
                <button type="submit">Change location</button>
            </form>
            
        </div>
    );
}

export default LocForm;