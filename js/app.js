const API_KEY = "2a61739e21f2ca9dca35f8447613169f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

// Wait for DOM to ensure the #results container exists
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('results');
  if (!container) {
    console.error('No element with id "results" found in the document.');
    return;
  }

  container.textContent = 'Loading movies…';

  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const movies = Array.isArray(data.results) ? data.results : [];
      if (movies.length === 0) {
        container.textContent = 'No movies found.';
        return;
      }

      container.innerHTML = movies.map(movie => {
        const title = escapeHtml(movie.title || 'Untitled');
        const poster = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null;
        const vote = movie.vote_average ?? 'N/A';
        const date = movie.release_date ?? '';

        return `
          <div class="card">
            ${poster ? `<img src="${poster}" alt="${title}">` : ''}
            <h3>${title}</h3>
            <p>⭐ ${vote}</p>
            <p>${date}</p>
          </div>
        `;
      }).join('');
    })
    .catch(err => {
      console.error('Failed to load movies:', err);
      container.textContent = 'Failed to load movies. See console for details.';
    });
});

// Minimal HTML-escaping helper
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[s]));
}
