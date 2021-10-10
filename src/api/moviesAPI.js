import fetch from 'node-fetch';
import { ENDPOINTS, VERSION, TMDB_API_URL } from '../constants/constants';
import { normalizeUrl } from '../utils/common';

const baseUrl = `${TMDB_API_URL}/${VERSION}`;
const endpoints = {
  upcoming: `${baseUrl}/${ENDPOINTS.upcoming}`,
  popular: `${baseUrl}/${ENDPOINTS.popular}`,
  discover: `${baseUrl}/${ENDPOINTS.discoverMovie}`,
  movie: `${baseUrl}/${ENDPOINTS.movie}`,
  genres: `${baseUrl}/${ENDPOINTS.genre}/movie/list`,
};

class Api {
  getPopular(page) {
    const url = normalizeUrl(endpoints.popular, { page });

    return fetch(url).then(res => res.json()).then(res => res).catch(console.error);
  }

  getUpcoming(page) {
    const url = normalizeUrl(endpoints.upcoming, { page });

    return fetch(url).then(res => res.json()).then(res => res).catch(console.error);
  }

  getByFilters(params) {
    const url = normalizeUrl(endpoints.discover, params);

    return fetch(url).then(res => res.json()).then(res => res).catch(console.error);
  }

  getById(id) {
    const url = normalizeUrl(`${endpoints.movie}/${id}`);

    return fetch(url).then(res => res.json()).then(res => res).catch(console.error);
  }

  getGenres() {
    const url = normalizeUrl(endpoints.genres);

    return fetch(url).then(res => res.json()).then(res => res).catch(console.error);
  }
}

module.exports = new Api();