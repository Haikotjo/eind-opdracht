import React from 'react';
import {Link} from 'react-router-dom';

function HeroCard({hero, name, resourceURI}) {
    // Als `hero` prop is gegeven, gebruik die informatie
    if (hero) {
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

    // Als `hero` prop niet gegeven is, gebruik dan de `name` en `resourceURI` props
    return (
        <Link to={`/hero/${resourceURI.split('/').pop()}`}>
            <div className="hero-card">
                <h2>
                    {name}
                </h2>
            </div>
        </Link>
    );
}

export default HeroCard;