
// NOTE: This API key is for school demonstration only (read-only access)

const API_KEY = "2a61739e21f2ca9dca35f8447613169f";

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching popular movies:", error);
  });
