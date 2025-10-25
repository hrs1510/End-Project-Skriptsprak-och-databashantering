'FILMLY'

This web app is 'Movie Browser' with the help of using https://developer.themoviedb.org/docs/getting-started OPEN API
This app is created using plain JS and CSS.
this app is divided into 3 man sections:Header, Main and Footer.
Header has movie browser title, navigation bar for filtering and search input to search movies by their title.

Main section has movie cards. Each card has movie poster, title, release date and average vote.
we created ul and li elements dynamically to show movie cards. because number of movies can vary based on filter or search query.

In pagination we are showing 10 movies per page. We can navigate between pages using previous and next buttons. total number of pages is calculated on the basis of total results returned by API and number of movies per page.
prev and next buttons are disabled when we are on first or last page respectively.
Page info is also shown between prev and next buttons to indicate current page number and total pages.

To run this app, you need to get your own API key from https://www.themoviedb.org/settings/api.
this data dosn't include movie posters. it just has poster path property, so you need to get it from image url using poster path query.

Footer has social media links and copyright information.






