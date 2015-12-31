'use strict';

var tools = require('./tools');


/**
 * @param {Function} predicate
 * @param {Iterator|Iterable|Array|String} iterable
 * @returns {Iterator}
 */
function ifilter(predicate, iterable) {
    predicate = predicate || function(x) { return x; };
    iterable = tools.ensureIter(iterable);
    var ifilterIter = {
        next: function() {
            while (true) {
                var next = iterable.next();
                if (next.done) {
                    return {done: true};
                }

                if (predicate(next.value)) {
                    return {done: false, value: next.value};
                }
            }
        }
    };

    return tools.fuseIter(ifilterIter, function() { return ifilterIter; });
}

module.exports = ifilter;
