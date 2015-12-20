'use strict';

var chai = require('chai');
var assert = chai.assert;

var chain = require('../itertools').chain;

describe("chain test suite", function() {
    it("chain works with arrays", function() {
        var a1 = [1, 2, 3];
        var a2 = [4, 5, 6];
        var a3 = [7, 8, 9];
        var iter = chain(a1, a2, a3);
        var expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var next = iter.next();
        while (!next.done) {
            assert.equal(expected.shift(), next.value);
            next = iter.next();
        }
        assert.ok(next.done);
        assert.equal(0, expected.length, expected);
    });
});
