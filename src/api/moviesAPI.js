import fetch from 'node-fetch';
import { ENDPOINTS, VERSION, TMDB_API_URL } from '../constants/constants';
import { normalizeUrl } from '../utils/common';

const baseUrl = `${TMDB_API_URL}/${VERSION}`;
const endpoints = {
  discover: `${baseUrl}/${ENDPOINTS.discover}/movie`,
  genres: `${baseUrl}/${ENDPOINTS.genre}/movie/list`,
};

class Api {
  getMovie(params) {
    const url = normalizeUrl(endpoints.discover, params);

    return fetch(url).then(res => res.json()).then(res => res).catch(console.error);
  }

  getGenres(params) {
    const url = normalizeUrl(endpoints.genres, params);

    return fetch(url).then(res => res.json()).then(res => res).catch(console.error);
  }
}

module.exports = new Api();