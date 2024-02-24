const form = document.querySelector('form');
const input = document.getElementById('searchTerm');
const results = document.getElementById('results');
const watcherLater = document.getElementById('watch-later');

const API_URL = 'http://www.omdbapi.com/?apikey=75116cd9&t=';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
    event.preventDefault();
    const { value: searchTerm } = input;
    getResults(searchTerm);
}

async function getResults(searchTerm) {
    try {
        const response = await fetch(`${API_URL}${searchTerm}`);
        const data = await response.json();
        showResults(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function showResults(data) {
    console.log(data);
    const section = results;
    section.innerHTML = `
        <h2>${data.Title}</h2>
        <img src="${data.Poster}" alt="${data.Title}">
        <p>${data.Plot}</p>
        <button data-id="${data.imdbID}" type="button" class="btn btn-danger m-2 watch-later-button">Watch Later</button>
    `;
    const watchLaterButton = section.querySelector('.watch-later-button');
    watchLaterButton.addEventListener('click', () => {
        const movie = {
            title: data.Title,
            imdbID: data.imdbID,
            poster: data.Poster,
            year: data.Year
        };

        const section = watcherLater;
        section.insertAdjacentHTML(
            'beforeend',
            `
    <h2>${data.Title}</h2>
    <img src="${data.Poster}" alt="${data.Title}">
    <p>${data.Plot}</p>
    <p>${data.Year}</p>

`
        );
    });
}
