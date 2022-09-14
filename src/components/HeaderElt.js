import React from 'react'; 
import {Link} from 'react-router-dom';

function HeaderElt(props) {
    return (
        <nav className='header-nav'>
            <Link to='/'> <h1 className='site-title'>dangerous lighting</h1> </Link>
        </nav>
    );
}

export default HeaderElt;