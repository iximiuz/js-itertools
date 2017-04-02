'use strict';

var tools = require('./tools');

/**
 * Return successive r length permutations of elements in the iterable.
 *
 * @param {Iterator|Iterable|Array|String} iterable
 * @param {Number} r - length of permutations.
 * @returns {Iterator|Iterable}
 */
function permutations(iterable, r) {
    // (ABCD, 2) -> AB AC AD BA BC BD CA CB CD DA DB DC
    // (012,  3) -> 012 021 102 120 201 210
/*
    0 1 2 3, 3
    ______
    (0, 1, 2)
    (0, 1, 3)
    (0, 2, 1)
    (0, 2, 3)
    (0, 3, 1)
    (0, 3, 2)
    (1, 0, 2)
    (1, 0, 3)
    (1, 2, 0)
    (1, 2, 3)
    (1, 3, 0)
    (1, 3, 2)
    (2, 0, 1)
    (2, 0, 3)
    (2, 1, 0)
    (2, 1, 3)
    (2, 3, 0)
    (2, 3, 1)
    (3, 0, 1)
    (3, 0, 2)
    (3, 1, 0)
    (3, 1, 2)
    (3, 2, 0)
    (3, 2, 1)
*/

    var pool = tools.toArray(tools.ensureIter(iterable));
    var n = pool.length;
    r = r || n;
    if (r > n) {
        throw new Error(
            'Parameter r cannot be greater than amount of elements in the iterable [' + n + ']'
        );
    }
    var indices = tools.newArray(r, 0, 1);

    function fromIndices() {
        state.current = indices.map(function(idx) {
            state.used[idx] = true;
            return pool[idx];
        });
    }

    function next() {
        // 0. indices: 0, 1, 2
        // 1. indices: 0, 1, 3
        // 2. indices: 0, 1, 4 -> carry = t 0, 1, -1 -> 0, 1, 0 -> 0, 1, 1 -> 0, 1, 2
        var backtrack = null;
        var i = indices.length - 1;
        for (; i >= 0; i--) {
            indices[i]++;
            if (indices[i] === n) {
                // Time to reset current index and increase previous one.
                if (i === 0) {
                    // There is no previous index, so it's the end of generation.
                    continue;
                }

                delete state.used[indices[i - 1]]; // Release previous index
                backtrack = indices[i] - 1;        // Pre-save current index to be able to release it in future.
                indices[i] = -1;                   // Reset current index
                i++;
                continue;
            }

            if (state.used[indices[i]]) {
                // Trying to increase current index until find the
                // lowest free value or reach the end of the range.
                i++;
                continue;
            }

            // First free value found. Release previous one.
            if (backtrack !== null) {
                // If we need to backtrack, doing it!
                delete state.used[backtrack];
                backtrack = null;
                continue;
            }

            // Otherwise exiting from the generation.
            break;
        }

        if (i < 0) {
            state.finished = true;
        } else {
            fromIndices();
        }
    }

    var state = {current: null, finished: false, used: {}};
    var permutIter = {
        next: function() {
            state.current
                ? next()
                : fromIndices();

            return {
                done: state.finished,
                value: state.finished
                    ? undefined
                    : state.current
            };
        }
    };
    return tools.fuseIter(permutIter, function() { return permutIter; });
}

module.exports = permutations;
