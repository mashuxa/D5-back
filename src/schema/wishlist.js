import { Wishlist } from '../models/wishlist';
import { composeWithMongoose } from "graphql-compose-mongoose";

const WishlistTC = composeWithMongoose(Wishlist);

export const WishlistQuery = {
  wishlistById: WishlistTC.getResolver('findById'),
  wishlistByIds: WishlistTC.getResolver('findByIds'),
  wishlistOne: WishlistTC.getResolver('findOne'),
  wishlistMany: WishlistTC.getResolver('findMany'),
  wishlistCount: WishlistTC.getResolver('count'),
  wishlistConnection: WishlistTC.getResolver('connection'),
  wishlistPagination: WishlistTC.getResolver('pagination'),
};

export const WishlistMutation = {
  wishlistCreateMany: WishlistTC.getResolver('createMany'),
  wishlistUpdateById: WishlistTC.getResolver('updateById'),
  wishlistUpdateOne: WishlistTC.getResolver('updateOne'),
  wishlistUpdateMany: WishlistTC.getResolver('updateMany'),
  wishlistRemoveById: WishlistTC.getResolver('removeById'),
  wishlistRemoveOne: WishlistTC.getResolver('removeOne'),
  wishlistRemoveMany: WishlistTC.getResolver('removeMany'),
};
