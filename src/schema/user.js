import { User } from '../models/user';
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server";
import { composeWithMongoose } from "graphql-compose-mongoose";
import jwt from "jsonwebtoken";

const UserTC = composeWithMongoose(User);

UserTC.addResolver({
  name: 'login',
  args: { email: 'String', password: 'String' },
  type: UserTC,
  resolve: async ({ args, context: { res } }) => {
    const user = await User.findOne({ email: args.email });

    if (!user || !await bcrypt.compare(args.password, user.password)) {
      throw new ApolloError('Invalid user or password', '401');
    }

    const token = jwt.sign( { _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie("jwttoken", token, { secure: true, httpOnly: true });

    return user;
  },
});

UserTC.addResolver({
  name: 'logout',
  type: UserTC,
  resolve: async ({ context: { res } }) => {
    res.clearCookie("jwttoken");

    return {};
  },
});

UserTC.addResolver({
  name: 'getUser',
  type: UserTC,
  resolve: ({ context: { user } }) => user,
});

UserTC.removeField('password');

export const UserQuery = {
  user: UserTC.getResolver('getUser'),
  logout: UserTC.getResolver('logout'),
};
export const UserMutation = {
  registration: UserTC.getResolver('createOne'),
  login: UserTC.getResolver('login'),
  userUpdateById: UserTC.getResolver('updateById'),
  userRemoveById: UserTC.getResolver('removeById'),
};
