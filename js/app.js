const API_KEY = '2a61739e21f2ca9dca35f8447613169f';  // Api key for themoviedb generated from account
const BASE_URL = 'https://api.themoviedb.org/3';      // Base URL for The Popular Movies Database API
const Poster_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie posters

// main container to render movies into
const movie = document.getElementById('movies-container');
const logo = document.querySelector('.logo');

// Nav links
const popularLink = document.getElementById('popular-movies');
const topRatedLink = document.getElementById('TopRated-movies');
const upcomingLink = document.getElementById('upcoming-movies');

// search button and input field
const searchInput = document.getElementById('search-input');
const searchButton = document.querySelector('.search-button');

const urls = {
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
};

//**********************************************************************************************
// to toggle which tab is active
function setActiveTab(linkTab) {
  document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
  if (linkTab) linkTab.classList.add('active');
}

//**********************************************************************************************
// function to fetch and render movie data
async function movieData(movie_url) {
  // fetch popular movies data from API
  const response = await fetch(movie_url);
  if (!response.ok) throw new Error(`Fetch failed`);
  const data = await response.json();  // parse response as JSON
  const results = data.results;
  console.log(results);

  // Pagination setUp (9 per page)
  const pageSize = 9;  // number of movies to show per page
  let currentPage = 1;   // current page number
  const totalPages = Math.max(1, Math.ceil(results.length / pageSize)); // calculate total pages based on results length and page size

  //******************************************************************************************************
  // function to render a specific page of movies(e.g., page 1, page 2, etc.) depends on user interaction.
  function renderPage(page) {
    currentPage = Math.min(Math.max(1, page), totalPages); // to keep page in bounds, by calculating max of 1 and page which is values then min of that and totalPages
    const start = (currentPage - 1) * pageSize;  // calculate start index of current page
    const pageItems = results.slice(start, start + pageSize);   // to get movies for current page. it shows from which index to which index.

    // clear container
    movie.innerHTML = ''; // we are clearing the movie container before rendering new content because we want to replace the old content with the new page content.

    // build list for current page
    const ul = document.createElement('ul'); // create unordered list element as a container for movie items
    ul.className = 'movie-list';

    //******************************************************************************************************
    // loop through each movie item for the current page
    pageItems.forEach(item => {
      const li = document.createElement('li'); // create list item for each movie
      li.className = 'movie-item';

      // add poster image if available
      if (item.poster_path) {  // check if poster path is available
        const img = document.createElement('img');  // create image element for movie poster
        img.className = 'movie-poster';
        img.src = Poster_URL + item.poster_path;  // set image source to full poster URL
        img.alt = item.title;
        img.width = 100;
        li.appendChild(img);
      }

      // to show movie title
      const title = document.createElement('div');
      title.className = 'movie-title';
      title.textContent = item.title || 'Untitled';
      li.appendChild(title);
      // to show movie overview
      const overView = document.createElement('p');
      overView.className = 'movie-overView';
      overView.textContent = item.overview
        || 'No overview available.';
      li.appendChild(overView);
      // to show movie popularity
      const popularity = document.createElement('div');
      popularity.className = 'movie-popularity';
      popularity.textContent = `Popularity: ${item.popularity || 'N/A'}`;
      li.appendChild(popularity);
      ul.appendChild(li); // append list item to unordered list

      li.addEventListener('click', () => {
        showMovieDetails(item.id);  // show movie details on click
      });
    });

    movie.appendChild(ul);  // append unordered list to main container

//******************************************************************************************************
    // pagination control buttons

    const pageNumberbutton = document.createElement('div');
    pageNumberbutton.className = 'pagination-controls';

    // show prev button
    const prev = document.createElement('button');
    prev.className = 'prev';
    prev.textContent = 'Prev';
    prev.disabled = currentPage === 1;  // disable prev button when current page is  first page
    prev.addEventListener('click', () => renderPage(currentPage - 1));
    /*we are adding an event listener to the prev button so that when it is clicked,
    it will call the renderPage function with the current page number decremented by 1.*/
    pageNumberbutton.appendChild(prev);   // append prev button to pagination controls

    // show only page number info without prev/next buttons
    const pageInfo = document.createElement('span');
    pageInfo.className = 'page-info';
    pageInfo.textContent = ` Page ${currentPage} of ${totalPages} `;
    pageNumberbutton.appendChild(pageInfo);

    // show next button
    const next = document.createElement('button');
    next.className = 'next';
    next.textContent = 'Next';
    next.disabled = currentPage === totalPages;  // disable next button when current page is last page
    next.addEventListener('click', () => renderPage(currentPage + 1));
    /* we are adding event listner to the next page , onClick to next button it will call
    renderPage Function with current page number increased by 1*/
    pageNumberbutton.appendChild(next);

    movie.appendChild(pageNumberbutton);
  }

  // initial render
  renderPage(1);

}

// all nav link event listeners
// function for Popular-movies by default on first visit
const firstVisit = () => {
  setActiveTab(popularLink);
  movieData(urls.popular).catch(err => {
    console.error(err);
    if (movie) movie.textContent = 'Failed to load movies.'; // first check if there is any movie and then display error message in movie container if fetch fail
  });
}
firstVisit();
popularLink.addEventListener('click', firstVisit); //popular-movie function called on click

topRatedLink.addEventListener('click', (e) => {
  e.preventDefault();
  setActiveTab(topRatedLink);  // set top-rated tab as active
  movieData(urls.topRated).catch(err => {   // fetch and render top-rated movies
    console.error(err);
    if (movie) movie.textContent = 'Failed to load movies.';
  });
});

upcomingLink.addEventListener('click', (e) => {
  e.preventDefault();
  setActiveTab(upcomingLink);
  movieData(urls.upcoming).catch(err => {
    console.error(err);
    if (movie) movie.textContent = 'Failed to load movies.';
  });
});

//**********************************************************************************************
// Search Movies Function
function searchMovies(movieName) {
  if (!movieName.trim()) {
    movie.textContent = "Please enter a movie name.";
    return;
  }
  const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(movieName)}&page=1`; // construct search URL with encoded movie name
  setActiveTab(null); // to deactivate all tabs when searching
  movieData(searchUrl)
    .then(() => {
      searchInput.value = ""; // it clears input after results load
    })
    .catch(err => {
      console.error(err);
      movie.textContent = "Movie not found!";
      searchInput.value = ""; // it clears even if an error occurs
    });

}

// Handle search button click
searchButton.addEventListener('click', () => {
  const movie_name = searchInput.value;
  searchMovies(movie_name);
});
// Handle Enter key press in search input
document.getElementById("search-input").addEventListener('keypress', (e) => {
  console.log(e.key);
  if (e.key === 'Enter') {
    const movie_name = searchInput.value;
    searchMovies(movie_name);
  }
});

//**********************************************************************************************
//resets to the first page of the current dataset on logo click
logo.addEventListener('click', (e) => {
  e.preventDefault();   // prevent default link behavior to avoid page reload
  firstVisit()   // reset to first page of current dataset
});

//**********************************************************************************************
//this bock containes functions to show movie details in modal

// this function sets text content of an element by its ID or 'N/A' if text is empty
function setTextContent(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text || 'N/A';
  }
}

// this function sets image source of an element by its ID or empty string if src is empty
function setImageSource(id, src) {
  const element = document.getElementById(id);
  if (element) {
    element.src = src || '';
  }
}

// Function to show movie details in a modal
async function showMovieDetails(movieId) {
  const movieDetailsUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;  // Movie details URL created using movie ID,api key and base URL
  const response = await fetch(movieDetailsUrl);
  if (!response.ok) throw new Error(`Fetch failed`);  // check if response is ok
  const data = await response.json();   // parse response as JSON

  const model = document.getElementById('movie-modal');
  const modalBody = document.getElementById('modal-body');

  // here we are using helper functions to set text content and image source in the modal
  setTextContent('modal-title', data.title); // here we are setting various movie details in the modal using helper functions
  setImageSource('modal-poster', data.poster_path ? (Poster_URL + data.poster_path) : '');
  setTextContent('modal-tagline', data.tagline);   //this is additional title or slogan for the movie
  setTextContent('modal-rating', `Rating: ${data.vote_average || 'N/A'}`);
  setTextContent('modal-runtime', `Runtime: ${data.runtime ? data.runtime + ' mins' : 'N/A'}`);  // movie duration in minutes
  setTextContent('modal-release-date', `Release Date: ${data.release_date || 'N/A'}`);
  setTextContent('modal-genres', `Genres: ${data.genres && data.genres.length > 0 ? data.genres.map(g => g.name).join(', ') : 'N/A'}`);  // movie genres get from genres array using map function
  setTextContent('modal-overview-text', data.overview || 'No overview available.');
  setTextContent('modal-languages', `Original Language:${data.spoken_languages && data.spoken_languages.length > 0 ? data.spoken_languages.map(l => l.name) : 'N/A'}`);

  // close-modal
  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.onclick = function () {
    model.style.display = 'none';
  }

  model.style.display = 'block';
}

