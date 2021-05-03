const { DEFAULT_APP_SETTINGS } = require('../../src/constants/constants');

const normalizeUrl = (baseUrl, params) => Object.entries({ ...DEFAULT_APP_SETTINGS, ...params }).reduce((acc, [key, value]) => {
  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((subAcc, [subKey, subValue]) => `${subAcc}&${key}.${subKey}=${subValue}`, acc);
  }

  return `${acc}&${key}=${value}`;
}, `${baseUrl}?`);


module.exports = { normalizeUrl };
