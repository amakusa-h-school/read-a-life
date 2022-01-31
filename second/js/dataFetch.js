const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const FETCH_URL = "https://script.google.com/macros/s/AKfycbx6n2gPRYjTBXkQLVkqwQZcePhfLMgUQvnwbS7H5pwjzM4D6eWPMJy-kfhTdP-M0m75/exec";

async function fetchData(uid) {
    const url = FETCH_URL + `?uid=${ uid }`;
    const fetchs = await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        });

    return fetchs;
}