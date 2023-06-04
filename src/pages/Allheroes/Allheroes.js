import React, { useState, useEffect } from 'react';
import { getData } from '../../services/GetData';
import {Link} from "react-router-dom";
import PageNavigation from "../../services/PageNavigation";
import HeroCard from '../../components/HeroCard';


const AllHeros = () => {
    const [heroes, setHeroes] = useState([]);
    const [offset, setOffset] = useState(0); // begin met de eerste pagina
    const limit = 20; // het aantal resultaten per pagina
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        getData('characters', null, null, limit, offset)
            .then(response => {
                setHeroes(response.data.data.results);
                setTotalResults(response.data.data.total);
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
                    <Link to={hero.id}>
                        <HeroCard hero={hero} />
                    </Link>
                </li>
            ))}
            <button onClick={handlePreviousPage}>Vorige pagina</button>
            <PageNavigation totalResults={totalResults} limit={limit} changePage={setOffset} />
            <button onClick={handleNextPage}>Volgende pagina</button>
        </ul>
    );
}
export default AllHeros;




