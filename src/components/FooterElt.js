import React from 'react';

function FooterElt(props) {
    return (
        <nav className='footer'>
            <p>{props.footerTextOne}</p>
        </nav>
    );
}

export default FooterElt;