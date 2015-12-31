'use strict';

var chain = require('../itertools').chain;
var tools = require('./tools');


/**
 * Should be pretty effective in case of using arrays/strings.
 * However, requires extra memory for caching produced values
 * in case of user-defined iterators.
 *
 * @param {Iterator|Iterable} iter1
 * @param {Iterator|Iterable} iter2
 * ...
 * @param {Number} repeat
 * @returns {Iterator}
 */
function product() {
    var args = Array.prototype.slice.call(arguments);
    var repeat = (typeof args[args.length - 1] === 'number')
        ? args.pop()
        : 1;
    var iterables = tools.toArray(chain(args.map(tools.ensureIter)));

    function firstProd(iterables) {
        var result = [];
        for (var i = 0, l = iterables.length; i < l; i++) {
            var next = iterables[i].next();
            if (!next.done) {
                result.push(next.value);
            }
        }
        return result;
    }

    var prod;
    var productIter = {
        next: function() {
            if (!prod) {
                prod = firstProd(iterables);
                return {done: prod.length === 0, value: prod.slice()};
            }

            return {done: true}
        }
    };

    return tools.fuseIter(productIter, function() { return productIter; });
}

module.exports = product;
