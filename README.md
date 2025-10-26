'FILMLY'

This web app is 'Movie Browser' with the help of using https://developer.themoviedb.org/docs/getting-started OPEN API
This app is created using plain JS and CSS.
this app is divided into 3 man sections:Header, Main and Footer.
Header has movie browser title, navigation bar for filtering and search input to search movies by their title.

Main section has movie cards. Each card has movie-poster,movie-title, movie-overview and movie-popularity.
some css styles are added to make it look better on hovering over movie cards.

I have created ul and li elements dynamically to show movie cards. because number of movies can vary based on filter or search query.
movie data is fetched from API using fetch method of JS. Url is constructed dynamically based on filter or search query.
In search input, I have added event listener for input event. so whenever user types something in search box, API is called with search query and results are shown accordingly.
search box also has placeholder text 'Search movies...' to indicate user about its functionality. and when data fetched , its value set to empty to clear previous search query.
The logo FILMLY is also clickable and on clicking it, user is redirected to home page showing popular movies.

In pagination we are showing 10 movies per page. We can navigate between pages using previous and next buttons. total number of pages is calculated on the basis of total results returned by API and number of movies per page.
prev and next buttons are disabled when we are on first or last page respectively.
Page info is also shown between prev and next buttons to indicate current page number and total pages.



To run this app, you need to get your own API key from https://www.themoviedb.org/settings/api.
this data dosn't include movie posters. it just has poster path property, so you need to get it from image url using poster path query.

Footer has social media links and copyright information.






