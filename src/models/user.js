import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
 import bcrypt from 'bcrypt';
 import { SALT_ROUNDS } from "../constants/constants";

export const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: 'users',
  }
);

UserSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
});
UserSchema.plugin(timestamps);
UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model('User', UserSchema);
