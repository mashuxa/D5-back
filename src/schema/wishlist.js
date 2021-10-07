import { Wishlist } from '../models/wishlist';
import { composeWithMongoose } from "graphql-compose-mongoose";
import { withWishlistAuthValidation, withUserAuthValidation } from "../utils/decorators";

const WishlistTC = composeWithMongoose(Wishlist);

WishlistTC.addResolver({
  name: 'wishlistGetById',
  args: { id: 'String' },
  type: WishlistTC,
  resolve: withWishlistAuthValidation((_, wishlist) => wishlist),
});

WishlistTC.addResolver({
  name: 'wishlistsGetByUserId',
  type: [WishlistTC],
  resolve: withUserAuthValidation((args, user) => Wishlist.find({ user: user._id })),
});

WishlistTC.addResolver({
  name: 'wishlistCreate',
  args: { name: 'String' },
  type: WishlistTC,
  resolve: withUserAuthValidation((args, user) => Wishlist.create({ name: args.name, movies: [], user: user._id })),
});

WishlistTC.addResolver({
  name: 'wishlistUpdate',
  args: { id: 'String', name: 'String' },
  type: WishlistTC,
  resolve: withWishlistAuthValidation((args) =>
    Wishlist.findOneAndUpdate({ _id: args.id }, { name: args.name }, { new: true })),
});

WishlistTC.addResolver({
  name: 'wishlistDelete',
  args: { id: 'String' },
  type: WishlistTC,
  resolve: withWishlistAuthValidation((args) => Wishlist.findOneAndDelete({ _id: args.id })),
});

WishlistTC.addResolver({
  name: 'addMovieToWishlist',
  args: { id: 'String', movieId: 'String' },
  type: WishlistTC,
  resolve: withWishlistAuthValidation((args, wishlist) =>
    Wishlist.findOneAndUpdate({ _id: args.id }, { movies: [...wishlist.movies, args.movieId] }, { new: true })),
});

WishlistTC.addResolver({
  name: 'deleteMovieFromWishlist',
  args: { id: 'String', movieId: 'String' },
  type: WishlistTC,
  resolve: withWishlistAuthValidation((args, wishlist) => {
    const movies = wishlist.movies.filter((value) => value !== args.movieId);

    return Wishlist.findOneAndUpdate({ _id: args.id }, { movies }, { new: true });
  }),
});

export const WishlistQuery = {
  wishlist: WishlistTC.getResolver('wishlistGetById'),
  wishlists: WishlistTC.getResolver('wishlistsGetByUserId'),
};

export const WishlistMutation = {
  wishlistCreate: WishlistTC.getResolver('wishlistCreate'),
  wishlistUpdate: WishlistTC.getResolver('wishlistUpdate'),
  wishlistDelete: WishlistTC.getResolver('wishlistDelete'),
  addMovieToWishlist: WishlistTC.getResolver('addMovieToWishlist'),
  deleteMovieFromWishlist: WishlistTC.getResolver('deleteMovieFromWishlist'),
};
