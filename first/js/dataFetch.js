const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const FETCH_URL = "https://script.google.com/macros/s/AKfycbwLwxMO595GuhYJa2sfsKUlbwKlpu4JvM8IInfZRQjenqXGf6GndTlzs9JnrOVq_u6lOg/exec";

async function fetchData(uid) {
    const url = FETCH_URL + `?uid=${ uid }`;
    const fetchs = await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        });

    return fetchs;
}