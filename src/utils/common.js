import jwt from "jsonwebtoken";
import { DEFAULT_APP_SETTINGS } from '../constants/constants';
import { COOKIE_REGEXP } from "../constants/regexp";
import { User } from "../models/user";

export const normalizeUrl = (baseUrl, params = {}) => Object.entries({...DEFAULT_APP_SETTINGS, ...params}).reduce((acc, [key, value]) => {
  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((subAcc, [subKey, subValue]) => `${subAcc}&${key}.${subKey}=${subValue}`, acc);
  }

  return `${acc}&${key}=${value}`;
}, `${baseUrl}?`);

export const getCookie = (cookie, name) => {
  const dynamicRegExp = new RegExp(`(?:^|; )${name.replace(COOKIE_REGEXP, '\\$1')}=([^;]*)`);
  const matches = cookie?.match(dynamicRegExp);

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getUser = (jwtToken) => {
  try {
    const {_id} = jwt.verify(jwtToken, process.env.JWT_SECRET);

    return User.findOne({_id});
  } catch (e) {
    return null;
  }
};
