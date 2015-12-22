'use strict';

var compat = require('./compat');
var iterSymbol = compat.iteratorSymbol;


function toIterator(iterable) {
    if (typeof iterable.next === 'function') {
        return iterable;
    }

    if (typeof ((iterable[iterSymbol] || {}).next) === 'function') {
        return iterable[iterSymbol];
    }

    if (typeof iterable.length !== 'number') {
        throw Error('Unsupported argument type');
    }

    var idx = -1;
    return {
        next: function() {
            return ++idx < iterable.length
                ? {done: false, value: iterable[idx]}
                : {done: true};
        }
    };
}

function toIterable(iterable, iterator) {
    iterable[iterSymbol] = iterator;
    return iterable;
}

exports.toIterable = toIterable;
exports.toIterator = toIterator;
