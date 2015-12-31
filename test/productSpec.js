'use strict';

var chai = require('chai');
var assert = chai.assert;

var itertools = require('../itertools');
var product = itertools.product;
var toArray = itertools.toArray;

describe("product test suite", function() {
    it("product produces empty set in case of repeat == 0", function() {
        var productIter = product('ABC', 'xy', 0);
        assert.ok(productIter.next().done);
    });

    it("product - repeat equivalence", function() {
        assert.deepEqual(
            toArray(product([1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3])),
            toArray(product([1, 2, 3], 5))
        );
    });

    it("product produces empty set in case of empty arg", function() {
        var productIter = product([1, 2, 3], [1, 2], []);
        assert.ok(productIter.next().done);
    });

    it("product works with strings", function() {
        var productIter = product('ABC', 'xy');
        var expected = [['A', 'x'], ['A', 'y'], ['B', 'x'],
                         ['B', 'y'], ['C', 'x'], ['C', 'y']];
        assert.deepEqual(toArray(productIter), expected);
    });
});
