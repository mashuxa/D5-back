const moviesAPI = require('../api/moviesAPI');

module.exports = {
  Query: {
    movie: (_, { filters }) => moviesAPI.getMovie(filters),
    genre: (_, { filters }) => moviesAPI.getGenres(filters),
  },
};