import React, {useEffect, useState} from 'react';
import {getCharacterById, getCharacterComics} from "../../services/GetData";
import {Link, useParams} from 'react-router-dom';

function HeroPage() {
    const { id } = useParams();
    const [hero, setHero] = useState(null);
    const [comics, setComics] = useState(null);
    const [offset, setOffset] = useState(0);
    const limit = 20;

    useEffect(() => {
        getCharacterById(id)
            .then(response => {
                setHero(response.data.data.results[0]);
                console.log(hero)
            })
            .catch(error => {
                console.error('Er ging iets mis bij het ophalen van de superheld:', error);
            });

        getCharacterComics(id, limit, offset)
            .then(response => {
                setComics(response.data.data.results);
            })
            .catch(error => {
                console.error('Er ging iets mis bij het ophalen van de comics:', error);
            });
    }, [id, limit, offset]);

    if (!hero || !comics) {
        return <div>Loading...</div>;
    }

    const handleNextPage = () => {
        setOffset(prevOffset => prevOffset + limit);
    };

    const handlePreviousPage = () => {
        setOffset(prevOffset => Math.max(0, prevOffset - limit));
    };

    return (
        <div>
            <h2>{hero.name}</h2>
            <p>{hero.description}</p>
            <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
            <ul>
                {comics.map((comic, index) => (
                    <li key={index}>
                        <Link to={`/comic/${comic.id}`}>{comic.title}</Link>
                    </li>
                ))}
            </ul>
            <button onClick={handlePreviousPage} disabled={offset<=-0}>Vorige pagina</button>
            <button onClick={handleNextPage}>Volgende pagina</button>
        </div>
    );
}

export default HeroPage;