const API_KEY = '04c35731a5ee918f014970082a0088b1';
const API_URL = 
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");

const form = document.getElementById("form");

const search = document.getElementById("search");

getMovies(API_URL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);

    showMovies(respData.results)
}

function showMovies(movies){
    main.innerHTML = '';
    movies.forEach(movie => {
        const {backdrop_path, original_title, vote_average, overview} = movie;
        const movieE1 = document.createElement("div");
        movieE1.classList.add("movie");
        movieE1.innerHTML =  `
            <img 
                src="${IMGPATH + backdrop_path}" 
                alt="${original_title}">
            <div class="movie-info">
                <h3 class="title">${original_title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
         `;
         main.appendChild(movieE1);
    });
}

function getClassByRate(vote) {
    if (vote > 8){
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm){
        getMovies(SEARCH_API + searchTerm)
        searchTerm = '';
    }
});
