'use strict';

var tools = require('./tools');


/**
 * @param {Function} predicate
 * @param {Iterator|Iterable|Array|String} iterable
 * @returns {Iterator}
 */
function ifilter(predicate, iterable) {
    predicate = predicate || function(x) { return x; };
    var iterator = tools.ensureIter(iterable);
    var filteredIter = {
        next: function() {
            while (true) {
                var next = iterator.next();
                if (next.done) {
                    return {done: true};
                }

                if (predicate(next.value)) {
                    return {done: false, value: next.value};
                }
            }
        }
    };

    return tools.fuseIter(filteredIter, function() { return filteredIter; });
}

module.exports = ifilter;
