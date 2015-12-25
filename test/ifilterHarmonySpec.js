'use strict';

var chai = require('chai');
var assert = chai.assert;

var ifilter = require('../itertools').ifilter;

describe("ifilter test suite (ES6 support)", function() {
    it("ifilter works with arrays", function() {
        var a = [0, 1, 2, 3, 4, 5, 6, 7];
        var expected = [0, 2, 4, 6];
        var filtered = ifilter(function(x) { return x % 2 === 0; }, a);
        for (let el of filtered) {
            assert.equal(expected.shift(), el);
        }
        assert.equal(0, expected.length, expected);
    });
});
