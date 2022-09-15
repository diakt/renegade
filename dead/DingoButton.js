import React from 'react';
import {useMap} from 'react-map-gl';

function DingoButton({ Map }) {
    const {mymap} = useMap();


    const onClick = () => {
        console.log(mymap.getCenter())

        // mymap.flyTo({center: [-121.49, 38.58]});
      
    };
  
    return <button onClick={onClick}>DINGODINGOINDOGINDOINGODINGOIDNGOIDNGOIDNOINGODING</button>;
    
}

export default DingoButton;