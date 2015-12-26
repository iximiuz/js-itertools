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

    if (!_isSubscriptable(iterable)) {
        throw Error('Unsupported argument type');
    }

    var idx = -1;
    return {
        next: function() {
            return ++idx < iterable.length
                ? {done: false, value: iterable[idx]}
                : {done: true};
        },
        rewind: function() {  // non-standard
            idx = -1;
        }
    };
}

function toRewindIterator(iterable) {
    if (
        typeof iterable.next === 'function'
        && typeof iterable.rewind === 'function'
    ) {
        return iterable;
    }

    var isSubscriptable = _isSubscriptable(iterable);
    iterable = toIterator(iterable);
    if (isSubscriptable) {
        return iterable;
    }

    var produced = [];
    var producedIter = toIterator(produced);
    var fromProduced = false;
    return {
        next: function() {
            var next;
            if (fromProduced) {
                next = producedIter.next();
                fromProduced = !next.done;
                if (!next.done) {
                    return next;
                }
            }

            next = iterable.next();
            if (!next.done) {
                produced.push(next.value);
            }
            return next;
        },
        rewind: function () {
            producedIter.rewind();
            fromProduced = true;
        }
    };
}

function toIterable(iterable, iterator) {
    iterable[iterSymbol] = iterator;
    return iterable;
}

function _isSubscriptable(iterable) {
    return (typeof iterable.length === 'number');
}

exports.toArray = toArray;
exports.toIterable = toIterable;
exports.toIterator = toIterator;
exports.toRewindIterator = toRewindIterator;
