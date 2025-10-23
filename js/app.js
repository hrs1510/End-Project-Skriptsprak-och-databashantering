const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTYxNzM5ZTIxZjJjYTlkY2EzNWY4NDQ3NjEzMTY5ZiIsIm5iZiI6MTc2MDY0Njk0NC4zOTYsInN1YiI6IjY4ZjE1NzIwYmZjNTZlYmFjNTFlMjMyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4uKFLTWJMHZEnexIkFDSOgxEcWPrvLdTuK3hleMOzk0'
  }
};
 //popular movies
fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

/*
//top rated movies
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/
