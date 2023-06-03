import React, { useState, useEffect } from 'react';
import { getData } from '../../services/marvel';
import {Link} from "react-router-dom";

const AllHeros = () => {
    const [heroes, setHeroes] = useState([]);
    const [offset, setOffset] = useState(0); // begin met de eerste pagina
    const limit = 20; // het aantal resultaten per pagina

    useEffect(() => {
        getData('characters', null, null, limit, offset)
            .then(response => {
                setHeroes(response.data.data.results);
            })
            .catch(error => {
                console.error('Er ging iets mis bij het ophalen van de superhelden:', error);
            });
    }, [offset]); // update wanneer offset verandert

    const handleNextPage = () => {
        setOffset(offset + limit); // ga naar de volgende pagina
    };

    const handlePreviousPage = () => {
        setOffset(Math.max(0, offset - limit)); // ga naar de vorige pagina, maar niet lager dan 0
    };

    return (
        <ul>
            {heroes.map(hero => (
                <li key={hero.id}>
                    <Link to={`/hero/${hero.id}`}>
                        <h2>{hero.name}</h2>
                    </Link>
                    <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
                </li>
            ))}
            <button onClick={handlePreviousPage}>Vorige pagina</button>
            <button onClick={handleNextPage}>Volgende pagina</button>
        </ul>
    );
}
export default AllHeros;



