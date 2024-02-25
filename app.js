const form = document.querySelector('form');
const input = document.getElementById('searchTerm');
const results = document.getElementById('results');
const watcherLater = document.getElementById('watch-later');

const API_URL = 'http://www.omdbapi.com/?apikey=75116cd9&t=';

const state = {
    searchTerm: '',
    results: [],
    watcherLater: []
};

input.addEventListener('input', (event) => {
    state.searchTerm = event.target.value;
});

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
    event.preventDefault();
    const searchTerm = state.searchTerm;
    getResults(searchTerm);
}

async function getResults(searchTerm) {
    try {
        const response = await fetch(`${API_URL}${searchTerm}`);
        state.results = await response.json();
        showResults(state.results);
    } catch (error) {
        console.error('Error:', error);
    }
}

function showResults() {
    console.log(state.results);
    const section = results;
    section.innerHTML = `
        <h2>${state.results.Title}</h2>
        <img src="${state.results.Poster}" alt="${state.results.Title}">
        <p>${state.results.Plot}</p>
        <button data-id="${state.results.imdbID}" type="button" class="btn btn-danger m-2 watch-later-button">Watch Later</button>
    `;
    const watchLaterButton = section.querySelector('.watch-later-button');
    watchLaterButton.addEventListener('click', () => {
        const movie = {
            title: state.results.Title,
            imdbID: state.results.imdbID,
            poster: state.results.Poster,
            year: state.results.Year
        };
        state.watcherLater.push(movie);
        updateWatchLaterSection();
    });
}

function updateWatchLaterSection() {
    console.log(state.watcherLater);
    const section = watcherLater;
    section.innerHTML = '';
    state.watcherLater.forEach((movie) => {
        section.insertAdjacentHTML(
            'beforeend',
            `
        <h2>${movie.title}</h2>
        <img src="${movie.poster}" alt="${movie.title}">
        <p>${movie.year}</p>
        <button data-id="${movie.imdbID}" type="button" class="btn btn-danger m-2 remove-button">Remove</button>
    `
        );
    });
}
