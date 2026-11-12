/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

/**
 * Returns true if the value is a finite number (not NaN, not ±Infinity).
 * Unlike the default export, non-number values (e.g. '3') always return false.
 */

module.exports.isFiniteNumber = function(num) {
  return typeof num === 'number' && isFinite(num);
};
