import React from 'react';

function FooterElt(props) {
    return (
        <nav className='footer'>
            <p>{props.footerText}</p>
        </nav>
    );
}

export default FooterElt;