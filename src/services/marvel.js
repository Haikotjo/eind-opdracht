import axios from 'axios';
import md5 from 'md5';

//-------------------------------------------------- Keys---------------------------------------------------------------
const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

//-------------------------------------------------- Toegang to Marvel---------------------------------------------------------------
const BASE_URL = 'http://gateway.marvel.com/v1/public/';

//-------------------------------------------------- Get functies ---------------------------------------------------------------
function createHash(timeStamp) {
    return md5(timeStamp + privateKey + publicKey);
}

export function getData(endpoint, queryParam, queryValue, limit = 20, offset = 0) {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash,
        limit: limit,
        offset: offset
    };

    if (queryParam && queryValue) {
        params[queryParam] = queryValue;
    }

    return axios.get(`${BASE_URL}${endpoint}`, { params });
}
export function getCharacterById(id) {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash,
    };
    return axios.get(`${BASE_URL}characters/${id}`, { params });
}

export function getTitleById(id) {
    const timeStamp = Date.now();
    const hash = createHash(timeStamp);

    let params = {
        ts: timeStamp,
        apikey: publicKey,
        hash: hash,
    };
    return axios.get(`${BASE_URL}comics/${id}`, { params });
}



