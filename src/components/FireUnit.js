import React from 'react';

function FireUnit(props) {

    return (
        <div className='fire-unit' key={props.element.attributes.OBJECTID}>
            <h4 className="fire-name"> {props.element.attributes.IncidentName + " Fire"}</h4>
            <ul className='fire-details'>
                <li className='fire-detail'>Miles from fire: {props.element.difference.toFixed(0)} </li>
                {(props.element.attributes.OrganizationalAssessment != null) &&
                    <li className='fire-detail'>Threat Category: {props.element.attributes.OrganizationalAssessment} </li>
                }
                {(props.element.attributes.CalculatedAcres != null) &&
                    <li className='fire-detail'>Calculated Acres: {props.element.attributes.CalculatedAcres.toFixed(0)} </li>
                }
                {(props.element.attributes.FireDiscoveryDateTime != null) &&
                    <li className='fire-detail'> Discovered: {new Date(props.element.attributes.FireDiscoveryDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.FireDiscoveryDateTime).getDate().toString()} </li> 
                }
                {(props.element.attributes.DiscoveryAcres != null) &&
                    <li className='fire-detail'>Acres at discovery: {props.element.attributes.DiscoveryAcres} </li>
                }
                {(props.element.attributes.PercentContained != null) &&
                    <li className='fire-detail'> Percent Contained: {props.element.attributes.PercentContained} </li> 
                }
                {(props.element.attributes.ContainmentDateTime != null) &&
                    <li className='fire-detail'> Contained: {new Date(props.element.attributes.ContainmentDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.ContainmentDateTime).getDate().toString()} </li> 
                }
                {(props.element.attributes.ControlDateTime != null) &&
                    <li className='fire-detail'> Controlled: {new Date(props.element.attributes.ControlDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.ControlDateTime).getDate().toString()} </li>
                }
                
                {(props.element.attributes.FireOutDateTime != null) &&
                     <li className='fire-detail'>Fire out: {new Date(props.element.attributes.FireOutDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.FireOutDateTime).getDate().toString()} </li>
                }
                {(props.element.attributes.DailyAcres != null) &&
                    <li className='fire-detail'>Daily Acres: {props.element.attributes.DailyAcres} </li>
                }
                
                

            </ul>
        </div>
    );
}

export default FireUnit;