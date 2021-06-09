import moviesAPI from '../api/moviesAPI';

export default {
  Query: {
    movie: (_, { filters }) => moviesAPI.getMovie(filters),
    genre: (_, { filters }) => moviesAPI.getGenres(filters),
  },
};