'use strict';


/**
 * @param {Function} predicate
 * @param {Iterator|Iterable} iterable
 * @returns {Iterator}
 */
function ifilter(predicate, iterable) {
    predicate = predicate || function(x) { return x; };
    return {
        next: function() {
            while (true) {
                var next = iterable.next();
                if (next.done) {
                    return {done: true};
                }

                if (predicate(next.value)) {
                    return {done: false, value: value};
                }
            }
        }
    };

}

module.exports = ifilter;
