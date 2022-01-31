const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const FETCH_URL = "https://script.google.com/macros/s/AKfycbyaubdUj6GE08cUlW1-cV3tSf2wHC6IqqsU0_nxcA1bTRGygGoJjR0wAOdUl6dy3Tihxw/exec";

async function fetchData(uid) {
    const url = FETCH_URL + `?uid=${ uid }`;
    const fetchs = await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        });

    return fetchs;
}