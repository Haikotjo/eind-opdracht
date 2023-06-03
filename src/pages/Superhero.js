// import React, { useEffect, useState } from 'react';
// import { getComics } from '../services/marvel';
//
// const heroCreation = "/imagine prompt: A {good/evil} superhero, inspired by the {animal kind}. This character has {hair color} hair and {skin color} skin. They identify as {sex} and their sexual orientation is {sexuality}. They are dressed in a vibrant, form-fitting superhero outfit that complements their features. Their eyes are glowing with determination and power. The backdrop is a bustling cityscape at sunset, casting long dramatic shadows. --style:comic --ar 3:2 --hd"
//
// function Superhero(props) {
//     const [comics, setComics] = useState(null);
//
//     useEffect(() => {
//         getComics('Hulk')
//             .then(response => {
//                 console.log(response);
//                 setComics(response.data.data.results);
//             })
//             .catch(error => console.error(error));
//     }, []);
//     return (
//         <div>
//             {comics && comics.map((comic, index) => <div key={index}>{comic.title}</div>)}
//         </div>
//     );
// }
//
// export default Superhero;