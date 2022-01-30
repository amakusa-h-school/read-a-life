const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const FETCH_URL = "https://script.google.com/macros/s/AKfycbzZvdqgwkUpThEfLr4Ka3GTlIFCMUf36vDta1rojrJ2Xks7OFMWaWRaGZcERMvNFK1L/exec";

async function fetchData(uid) {
    const url = FETCH_URL + `?uid=${ uid }`;
    const fetchs = await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        });

    return fetchs;
}