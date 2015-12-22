'use strict';

var tools = require('./tools');


/**
 * @param {Iterator|Iterable} iter1
 * @param {Iterator|Iterable} iter2
 * ...
 *
 * @returns {Iterator}
 */
function chain() {
    var iterators = Array.prototype.slice.call(arguments).map(tools.toIterator);
    var iterNo = 0;
    var chainIter = {
        next: function() {
            if (iterNo >= iterators.length) {
                return {done: true};
            }

            var next = iterators[iterNo].next();
            if (!next.done) {
                return next;
            }

            iterNo++;
            return this.next();
        }
    };
    return tools.toIterable(chainIter, function() { return chainIter; });
}

module.exports = chain;
