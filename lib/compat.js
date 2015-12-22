'use strict';

var iterators = (typeof Symbol !== 'undefined' && !!Symbol.iterator);

exports.iterators = iterators;
exports.iteratorSymbol = iterators
    ? Symbol.iterator
    : '__i_iter';
