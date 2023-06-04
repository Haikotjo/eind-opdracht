import React, {useEffect, useState} from 'react';
import {getTitleById} from "../../services/GetData";
import {Link, useParams} from 'react-router-dom';
import HeroCardById from '../../components/HeroCardById';

function ComicPage() {
    const { id } = useParams(); // haal `id` uit de route parameters
    const [comic, setComic] = useState(null);

    useEffect(() => {
        getTitleById(id)
            .then(response => {
                const comicData = response.data.data.results[0];
                console.log(comicData.series.resourceURI);
                console.log(comicData.urls[0].url);
                console.log(comicData);
                setComic(comicData); // zet het opgehaalde karakter in de state
            })
            .catch(error => {
                console.error('Er ging iets mis bij het ophalen van de comic:', error);
            });
    }, [id]); // voer uit wanneer `id` verandert

    // toon een laadindicator wanneer het karakter nog niet is opgehaald
    if (!comic) {
        return <div>Loading...</div>;
    }

    // toon het karakter wanneer het is opgehaald
    return (
        <article>
            <ul>
                <li>
                    Titel
                    <h1>{comic.title}</h1>
                </li>
                <li>
                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name} />
                </li>
                <li>
                    Omschrijving:
                    <p>{comic.description ? comic.description : 'Geen samenvatting beschikbaar'}</p>
                </li>
                <li>
                    Series:
                    <p>
                        <a
                            href={comic.series.resourceURI}>{comic.series.name ? comic.series.name : 'Geen informatie over de serie' }
                        </a>
                    </p>
                </li>
                <li>
                    <a
                        href={comic.urls[0].url}>
                        Officiele pagina
                    </a>
                </li>
                <li>
                    Characters
                    <ul>
                        {comic.characters.items.map((character, index) => (
                            <li
                                key={index}
                            >
                                <HeroCardById id={character.resourceURI.split('/').pop()} />
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </article>
    );
}

export default ComicPage;
