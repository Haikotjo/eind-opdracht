import React, {useEffect, useState} from 'react';
import {getCharacterById} from "../services/marvel"; // deze functie moet je nog maken
import {useParams} from 'react-router-dom'; // importeer de useParams hook

function HeroCard() {
    const { id } = useParams(); // haal `id` uit de route parameters
    const [hero, setHero] = useState(null);

    useEffect(() => {
        getCharacterById(id)
            .then(response => {
                setHero(response.data.data.results[0]); // zet het opgehaalde karakter in de state
            })
            .catch(error => {
                console.error('Er ging iets mis bij het ophalen van de superheld:', error);
            });
    }, [id]); // voer uit wanneer `id` verandert

    // toon een laadindicator wanneer het karakter nog niet is opgehaald
    if (!hero) {
        return <div>Loading...</div>;
    }

    // toon het karakter wanneer het is opgehaald
    return (
        <div>
            <h2>{hero.name}</h2>
            <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
        </div>
    );
}

export default HeroCard;