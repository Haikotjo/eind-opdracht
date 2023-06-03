import React, { useState, useEffect } from 'react';
import { getData } from '../services/marvel';

const Allheroes = () => {
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
        <div>
            {heroes.map(hero => (
                <div key={hero.id}>
                    <h2>{hero.name}</h2>
                    <img src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt={hero.name} />
                </div>
            ))}
            <button onClick={handlePreviousPage}>Vorige pagina</button>
            <button onClick={handleNextPage}>Volgende pagina</button>
        </div>
    );
};

export default Allheroes;

