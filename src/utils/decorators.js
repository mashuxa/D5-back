import { Wishlist } from '../models/wishlist';
import { ForbiddenError, AuthenticationError } from "apollo-server";

export const withUserAuthValidation = (callback) => async ({ args, context: { user } }) => {
  if (user) {
     return callback(args, user);
  }

  throw new AuthenticationError('You must be logged in');
};

export const withWishlistAuthValidation = (callback) => withUserAuthValidation(async (args, user) => {
  const wishlist = await Wishlist.findById(args.id);

  if (wishlist.user.equals(user._id)) {
    return callback(args, wishlist);
  }

  throw new ForbiddenError('You don’t have permission');
});
