'use strict';

var chai = require('chai');
var assert = chai.assert;

var ifilter = require('../itertools').ifilter;

describe("ifilter test suite", function() {
    it("ifilter works with arrays", function() {
        var a = [0, 1, 2, 3, 4, 5, 6, 7];
        var expected = [0, 2, 4, 6];
        var filtered = ifilter(function(x) { return x % 2 === 0; }, a);
        var next = filtered.next();
        while (!next.done) {
            assert.equal(next.value, expected.shift());
            next = filtered.next();
        }
        assert.ok(next.done);
        assert.equal(0, expected.length, expected);
    });

    it("ifilter handles inappropriate tails correct", function() {
        var a = [0, 1, 2, 3, 4, 5, 6, 7];
        var filtered = ifilter(function(x) { return x < 3; }, a);
        for (var i = 0; i < 3; i++) {
            var next = filtered.next();
            assert.notOk(next.done);
            assert.equal(next.value, i);
        }
        assert.ok(filtered.next().done);
    });
});
