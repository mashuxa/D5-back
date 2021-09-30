import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

export const WishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    movies: {
      type: [String],
      trim: true,
      required: false,
    },
  },
  {
    collection: 'wishlists',
  }
);

WishlistSchema.plugin(timestamps);
WishlistSchema.index({ createdAt: 1, updatedAt: 1 });

export const Wishlist = mongoose.model('Wishlist', WishlistSchema);
