'use strict';

var tools = require('./tools');


/**
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
    var iterables = args.map(tools.toIterator);

    var productIter = {
        next: function() {

        }
    };

    return tools.toIterable(productIter, function() { return productIter; });
}

module.exports = product;
