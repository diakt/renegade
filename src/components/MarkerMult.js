import React from 'react';
import { Marker } from 'react-map-gl';

function MarkerMult(props) {

    return (
        <Marker
            longitude={props.element.geometry.x}
            latitude={props.element.geometry.y}
            key={props.element.attributes.OBJECTID}
            color={props.element.sizeColor}
            scale={0.5}
            anchor="bottom"
            onClick={(event) => { 
                console.log(props.element);
                props.setFooterText(
                    "The fire you have selected is titled the " + props.element.attributes.IncidentName + 
                    " Fire. It was discovered on " + new Date(props.element.attributes.FireDiscoveryDateTime).getMonth().toString() + '/' + new Date(props.element.attributes.FireDiscoveryDateTime).getDate().toString() + 
                    ", approximately " + (props.element.difference).toFixed(0) + " miles from you."
                    
                ) }}
        />
    );
}

export default MarkerMult;