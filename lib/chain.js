'use strict';

var tools = require('./tools');


/**
 * @param {Iterator|Iterable|Array|String} iter1
 * @param {Iterator|Iterable|Array|String} iter2
 * ...
 *
 * @returns {Iterator}
 */
function chain() {
    var iterators = Array.prototype.slice.call(arguments).map(tools.ensureIter);
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
    return tools.fuseIter(chainIter, function() { return chainIter; });
}

module.exports = chain;
