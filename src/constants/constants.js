const TMDB_API_URL = 'https://api.themoviedb.org';
const VERSION = 3;
const ENDPOINTS = {
  discover: 'discover',
  genre: 'genre'
};
const DEFAULT_APP_SETTINGS = {
  api_key: '960c2f4daaf90d65b71f323700d3cb66',
  language: 'en_En',
};

module.exports = { ENDPOINTS, VERSION, TMDB_API_URL, DEFAULT_APP_SETTINGS };