import React from 'react';
import { Link } from 'react-router-dom'

function Navigation(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/AllHeros">All Heroes</Link>
                </li>
                <li>
                    <Link to="/AllComics">All Comics</Link>
                </li>
            </ul>
        </nav>
    );
}


export default Navigation;