const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const FETCH_URL = "https://script.google.com/macros/s/AKfycbwSZxyAT9lYom9aR4Mv8aflp053Y1tXe6W1yLOLaVpMtB4Xc8UhodX7PiFE0JRO9wDx/exec";

async function fetchData(uid) {
    const url = FETCH_URL + `?uid=${ uid }`;
    const fetchs = await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        });

    return fetchs;
}