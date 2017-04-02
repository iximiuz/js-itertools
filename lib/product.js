'use strict';

var tools = require('./tools');


/**
 * @param {Iterator|Iterable} iter1
 * @param {Iterator|Iterable} iter2
 * ...
 * @param {Number} repeat
 * @returns {Iterator|Iterable}
 */
function product() {
    var args = Array.prototype.slice.call(arguments);
    var repeat = (typeof args[args.length - 1] === 'number')
        ? args.pop()
        : 1;
    if (repeat < 0) {
        throw new Error('Cannot handle negative repeat [' + repeat + ']');
    }

    var argsCount = args.length;
    var poolsCount = args.length * repeat;
    var pools = repeat
        ? args.map(tools.toArray)
        : [];
    var indices = tools.newArray(poolsCount, 0);
    for (var i = argsCount; i < poolsCount; i++) {
        pools.push(pools[i - argsCount]);
    }

    function first() {
        state.finished = (pools.length === 0);
        state.current = pools.map(function(pool) {
            state.finished = (pool.length === 0);
            return pool[0];
        });
    }

    function next() {
        var i = poolsCount - 1;
        for (; i >= 0; i--) {
            var pool = pools[i];
            indices[i]++;
            if (indices[i] === pool.length) {
                indices[i] = 0;
                state.current[i] = pool[indices[i]];
            } else {
                state.current[i] = pool[indices[i]];
                break;
            }
        }
        state.finished = (i < 0);
    }

    var state = {current: null, finished: false};
    var productIter = {
        next: function() {
            state.current
                ? next()
                : first();

            return {
                done: state.finished,
                value: state.finished
                    ? undefined
                    : state.current.slice()
            };
        }
    };

    return tools.fuseIter(productIter, function() { return productIter; });
}

module.exports = product;
