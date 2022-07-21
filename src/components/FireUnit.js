import React from 'react';

function FireUnit(props) {

    return (
        <div className='fire-unit' key={props.element.attributes.OBJECTID}>
            <h4 className="fire-name"> {props.element.attributes.IncidentName + " FIRE"}</h4>
            <ul className='fire-details'>
                <li className='fire-detail'>Miles from fire: {props.element.difference.toFixed(0)} </li>
                <li className='fire-detail'> Discovered: {new Date(props.element.attributes.FireDiscoveryDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.FireDiscoveryDateTime).getDate().toString()} </li>
                <li className='fire-detail'> Contained: {new Date(props.element.attributes.ContainmentDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.ContainmentDateTime).getDate().toString()} </li>
                <li className='fire-detail'> Controlled: {new Date(props.element.attributes.ControlDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.ControlDateTime).getDate().toString()} </li>
                
                {(props.element.FireOutDateTime != null) &&
                    <li className='fire-detail'>Fire out: {new Date(props.element.FireOutDateTime).getMonth().toString() + '/' + new Date(props.element.FireOutDateTime).getDate().toString()} </li>
                }
                <li className='fire-detail'>Miles from fire: {props.element.difference.toFixed(0)} </li>

            </ul>
        </div>
    );
}

export default FireUnit;