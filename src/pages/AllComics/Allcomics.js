import React, { useState, useEffect } from 'react';
import { getData } from '../../services/marvel';
import {Link} from "react-router-dom";
const AllComics = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0); // begin met de eerste pagina
    const limit = 20; // het aantal resultaten per pagina

    useEffect(() => {
        getData('comics',null,null , limit, offset)
            .then(response => {
                setComics(response.data.data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error('Er ging iets mis met het ophalen van de data:', error);
                setLoading(false);
            });
    }, [offset]);

    const handleNextPage = () => {
        setOffset(offset + limit); // ga naar de volgende pagina
    };

    const handlePreviousPage = () => {
        setOffset(Math.max(0, offset - limit)); // ga naar de vorige pagina, maar niet lager dan 0
    };

    if (loading) return <div>Loading...</div>;

    return (
        <ul className="Allcomics">
            {comics.map((comic) => (
                <li key={comic.id} className="comic">
                    <Link to={`/comic/${comic.id}`}>
                    <h2>{comic.title}</h2>
                    </Link>
                    {comic.thumbnail && comic.thumbnail.path !== 'image_not_available' && (
                        <img
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt={comic.title}
                        />
                    )}

                    {comic.creators && comic.creators.items.length > 0 && (
                        <>
                            <h3>Creators:</h3>
                            <ul>
                                {comic.creators.items.map((creator, index) => (
                                    <li key={index}>{creator.name} ({creator.role})</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {comic.characters && comic.characters.items.length > 0 && (
                        <>
                            <h3>Characters:</h3>
                            <ul>
                                {comic.characters.items.map((character, index) => (
                                    <li key={index}>{character.name}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </li>
            ))}
            <button onClick={handlePreviousPage}>Vorige pagina</button>
            <button onClick={handleNextPage}>Volgende pagina</button>
        </ul>
    );
}

export default AllComics;