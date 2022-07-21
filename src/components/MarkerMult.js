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
            onClick={(event) => { console.log(props.element); }}
        />
    );
}

export default MarkerMult;