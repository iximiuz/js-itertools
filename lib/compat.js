'use strict';

var nativeIterators = (typeof Symbol !== 'undefined' && !!Symbol.iterator);

exports.nativeIterators = nativeIterators;
exports.iteratorSymbol = nativeIterators
    ? Symbol.iterator
    : '__i_iter';
