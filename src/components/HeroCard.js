import React from 'react';
import { Link } from 'react-router-dom';

function HeroCard({ hero }) {
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

export default HeroCard;