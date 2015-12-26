'use strict';

var chai = require('chai');
var assert = chai.assert;

var compat = require('../lib/compat');
var itertools = require('../itertools');
var toIterable = itertools.toIterable;
var toIterator = itertools.toIterator;

describe("toIterator test suite", function() {
    it("toIterator works with arrays", function() {
        var a = [1, 2, 3];
        var expectedVals = a.slice();
        var expectedLen = a.length;

        var iter = toIterator(a);
        var next = iter.next();
        while (!next.done) {
            assert.equal(next.value, expectedVals.shift());
            next = iter.next();
        }
        assert.ok(next.done);
        assert.equal(a.length, expectedLen);
    });

    it("toIterator works with strings", function() {
        var str = 'abc';
        var expectedVals = str.split('');

        var iter = toIterator(str);
        var next = iter.next();
        while (!next.done) {
            assert.equal(next.value, expectedVals.shift());
            next = iter.next();
        }
        assert.ok(next.done);
    });

    it("toIterator works with iterators", function() {
        var createIterator = function() {
            return {
                idx: -1,
                next: function() {
                    return (this.idx++ < 3)
                        ? {done: false, value: this.idx}
                        : {done: true}
                }
            };
        };

        var iter = createIterator();
        var expectedVals = [0, 1, 2, 3];
        iter = toIterator(iter);
        var next = iter.next();
        while (!next.done) {
            assert.equal(next.value, expectedVals.shift());
            next = iter.next();
        }
        assert.ok(next.done);
    });

    it("toIterator works with iterables", function() {
        var createIterable = function() {
            var iter = {
                idx: -1,
                next: function() {
                    return (this.idx++ < 3)
                        ? {done: false, value: this.idx}
                        : {done: true}
                }
            };

            return toIterable({}, iter);
        };

        var iter = createIterable();
        var expectedVals = [0, 1, 2, 3];
        iter = toIterator(iter);
        var next = iter.next();
        while (!next.done) {
            assert.equal(next.value, expectedVals.shift());
            next = iter.next();
        }
        assert.ok(next.done);
    });
});
