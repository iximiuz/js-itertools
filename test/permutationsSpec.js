'use strict';

var chai = require('chai');
var assert = chai.assert;

var itertools = require('../itertools');
var permutations = itertools.permutations;
var toArray = itertools.toArray;

describe("permutations test suite", function() {
    it("permutations (full)", function() {
        var actual = toArray(permutations([0, 1, 2]));
        var expected = [[0,1,2], [0,2,1], [1,0,2], [1,2,0], [2,0,1], [2,1,0]];
        assert.deepEqual(actual, expected, JSON.stringify(actual));
    });

    it("permutation (partial)", function() {
        assert.deepEqual(
            toArray(permutations('ABCD', 2)),
            toArray([['A','B'], ['A','C'], ['A','D'],
                     ['B','A'], ['B','C'], ['B','D'],
                     ['C','A'], ['C','B'], ['C','D'],
                     ['D','A'], ['D','B'], ['D','C']])
        );
    });
});
