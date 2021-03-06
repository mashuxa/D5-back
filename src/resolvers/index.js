import moviesAPI from '../api/moviesAPI';

export default {
  Query: {
    popularMovies: (_, { page }) => moviesAPI.getPopular(page),
    upcomingMovies: (_, { page }) => moviesAPI.getUpcoming(page),
    moviesByFilters: (_, { filters }) => moviesAPI.getByFilters(filters),
    movieById: (_, { id }) => moviesAPI.getById(id),
    genres: () => moviesAPI.getGenres(),
  },
};