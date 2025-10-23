const API_KEY = '2a61739e21f2ca9dca35f8447613169f';  // Api key for themoviedb generated from account
const BASE_URL = "https://api.themoviedb.org/3";      // Base URL for The Popular Movies Database API
const Poster_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie posters

const movies = document.getElementById('movies-container'); //getting movie div from html file
//popular movies
const movie_url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;//url created for popular movies for batter syntax
const movieData = async () => {
  const response = await fetch(movie_url);
  const data = await response.json();
  const result = data.results;
  const ul = document.getElementById('movie-list');
  result.forEach(movie => {
    let li = document.createElement('li');
    li.className = 'movie-item';
    li.innerText = movie.title;
    ul.appendChild(li);
    movie.innerHTML = '';
    movies.appendChild(ul);
  });

}
movieData();
/*
//top rated movies
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
*!/
*/
