import React, { useState, useEffect } from 'react';
import { getData } from '../../services/GetData';
import {Link} from "react-router-dom";
import PageNavigation from "../../services/PageNavigation";

const AllComics = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0); // begin met de eerste pagina
    const [error, setError] = useState(null);
    const limit = 50; // het aantal resultaten per pagina
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        /*Get data*/
        getData('comics',null,null , limit, offset)
            .then(response => {
                /*sort alphabetical order*/
                let sortedComics = response.data.data.results;
                sortedComics.sort((a, b) => a.title.localeCompare(b.title));
                setComics(sortedComics);
                setLoading(false);
                setTotalResults(response.data.data.total);
            })
            /*Errors*/
            .catch(error => {
                console.error('Er ging iets mis met het ophalen van de data:', error);
                setError(error);
                setLoading(false);
            });
    }, [offset]);

    /*Page handle functions*/
    const handleNextPage = () => {
        setOffset(offset + limit); // ga naar de volgende pagina
    };
    const handlePreviousPage = () => {
        setOffset(Math.max(0, offset - limit)); // ga naar de vorige pagina, maar niet lager dan 0
    };

    /*If something goes wrong*/
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        /*List of comics*/
        <ul className="Allcomics">
            {/*Mapp through comics*/}
            {comics.map((comic) => (
                <li key={comic.id} className="comic">
                    {/*Link to specific comic*/}
                    <Link to={`/comic/${comic.id}`}>
                    <h2>{comic.title}</h2>
                    </Link>
                </li>
            ))}
            {/*Page buttons*/}
            <button onClick={handlePreviousPage}>Vorige pagina</button>
            <PageNavigation totalResults={totalResults} limit={limit} changePage={setOffset} />
            <button onClick={handleNextPage}>Volgende pagina</button>
        </ul>
    );
}

export default AllComics;