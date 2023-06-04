import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCharacterById } from '../services/GetData'

function HeroCardById({ id }) {
    const [hero, setHero] = useState(null);

    useEffect(() => {
        getCharacterById(id).then(response => {
            setHero(response.data.data.results[0]);
        });
    }, [id]);

    if (!hero) {
        return <div>Loading...</div>;
    }

    return (
        <Link to={`/hero/${hero.id}`}>
            <div className="hero-card">
                <h2>{hero.name}</h2>
                <p>{hero.description}</p>
                <img src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} alt={hero.name} />
            </div>
        </Link>
    );
}

export default HeroCardById;