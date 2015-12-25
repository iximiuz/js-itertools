'use strict';

var compat = require('./compat');
var iterSymbol = compat.iteratorSymbol;

var isArray = Array.isArray
    ? Array.isArray
    : function(arg) { return Object.prototype.toString.call(arg) === '[object Array]'; };

function toArray(iterable) {
    if (isArray (iterable)) {
        return iterable;
    }
    iterable = toIterator(iterable);
    var result = [];
    var next = iterable.next();
    while (!next.done) {
        result.push(next.value);
        next = iterable.next();
    }
    return result;
}

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

exports.toArray = toArray;
exports.toIterable = toIterable;
exports.toIterator = toIterator;
