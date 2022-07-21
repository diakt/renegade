import React from 'react';

function FireUnit(props) {

    return (
        <div className='fire-unit' key={props.element.attributes.OBJECTID}>
            <h4 className="fire-name"> {props.element.attributes.IncidentName + " Fire"}</h4>
            <ul className='fire-details'>
                <li className='fire-detail'>Miles from fire: {props.element.difference.toFixed(0)} </li>
                <li className='fire-detail'> Discovered: {new Date(props.element.attributes.FireDiscoveryDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.FireDiscoveryDateTime).getDate().toString()} </li>
                
                {(props.element.attributes.ContainmentDateTime != null) &&
                    <li className='fire-detail'> Contained: {new Date(props.element.attributes.ContainmentDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.ContainmentDateTime).getDate().toString()} </li> 
                }
                {(props.element.attributes.ControlDateTime != null) &&
                    <li className='fire-detail'> Controlled: {new Date(props.element.attributes.ControlDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.ControlDateTime).getDate().toString()} </li>
                }
                {(props.element.attributes.FireOutDateTime != null) &&
                     <li className='fire-detail'>Fire out: {props.element.FireOutDateTime} </li>
                }
                {(props.element.attributes.DiscoveryAcres != null) &&
                    <li className='fire-detail'>Discovery Acres: {props.element.attributes.DiscoveryAcres} </li>
                }
                {(props.element.attributes.DailyAcres != null) &&
                    <li className='fire-detail'>Daily Acres: {props.element.attributes.DailyAcres} </li>
                }
                {(props.element.attributes.CalculatedAcres != null) &&
                    <li className='fire-detail'>Calculated Acres: {props.element.attributes.CalculatedAcres.toFixed(0)} </li>
                }
                

            </ul>
        </div>
    );
}

export default FireUnit;