'use strict';

var compat = require('./compat');
var iterSymbol = compat.iteratorSymbol;

var isArray = Array.isArray
    ? Array.isArray
    : function(arg) { return Object.prototype.toString.call(arg) === '[object Array]'; };

/**
 * Builds an iterator from a passed argument (if possible).
 * In case of an argument iterator already is an iterator just returns it.
 *
 * @param iterable
 * @returns {Iterator}
 */
function ensureIter(iterable) {
    return (typeof iterable.next === 'function')
        ? iterable
        : makeIter(iterable);
}

/**
 * Mixes in an iterator provider function to a passed object.
 *
 * Call fuseIter(target, function() { ... }) makes the `target`
 * object iterable.
 *
 * @param object
 * @param iterProvider
 * @returns {*}
 */
function fuseIter(object, iterProvider) {
    object[iterSymbol] = iterProvider;
    return object;
}

/**
 * Makes a new iterator from iterable.
 *
 * NOTE: an existing iterator can be passed to this function.
 *
 * @param {Iterable|Array|String} iterable
 * @returns {Iterator}
 */
function makeIter(iterable) {
    if (typeof iterable[iterSymbol] === 'function') {
        // passed argument can create iterators - create new one.
        return iterable[iterSymbol]();
    }

    if (!_isSubscriptable(iterable)) {
        throw Error('Unsupported argument type');
    }

    // passed argument can be indexed, eg. string, array, etc.
    // - create new iter object.
    var idx = -1;
    return {
        next: function() {
            return ++idx < iterable.length
                ? {done: false, value: iterable[idx]}
                : {done: true};
        }
    };
}

function newArray(size, val) {
    return Array.apply(null, Array(size)).map(function() { return val; });
}

/**
 * Unrolls passed iterable producing new array.
 * @param {Iterable|Iterator|Array|String} iterable
 * @returns Array
 */
function toArray(iterable) {
    // kinda optimisations
    if (isArray(iterable)) {
        return iterable.slice();
    }
    if (typeof iterable === 'string') {
        return iterable.split('');
    }

    var iter = ensureIter(iterable);
    var result = [];
    var next = iter.next();
    while (!next.done) {
        result.push(next.value);
        next = iter.next();
    }
    return result;
}

function _isSubscriptable(iterable) {
    return (typeof iterable.length === 'number');
}

exports.ensureIter = ensureIter;
exports.fuseIter = fuseIter;
exports.isArray = isArray;
exports.makeIter = makeIter;
exports.newArray = newArray;
exports.toArray = toArray;
