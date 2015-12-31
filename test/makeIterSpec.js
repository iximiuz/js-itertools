'use strict';

var chai = require('chai');
var assert = chai.assert;

var compat = require('../lib/compat');
var itertools = require('../itertools');
var fuseIter = itertools.fuseIter;
var makeIter = itertools.makeIter;

describe("makeIter test suite", function() {
    it("makeIter works with arrays", function() {
        var a = [1, 2, 3];
        var expectedVals = a.slice();
        var expectedLen = a.length;

        var iter = makeIter(a);
        var next = iter.next();
        while (!next.done) {
            assert.equal(next.value, expectedVals.shift());
            next = iter.next();
        }
        assert.ok(next.done);
        assert.equal(a.length, expectedLen);
    });

    it("makeIter works with strings", function() {
        var str = 'abc';
        var expectedVals = str.split('');

        var iter = makeIter(str);
        var next = iter.next();
        while (!next.done) {
            assert.equal(next.value, expectedVals.shift());
            next = iter.next();
        }
        assert.ok(next.done);
    });

    it("makeIter works with iterables", function() {
        var createIterable = function() {
            var iter = {
                idx: -1,
                next: function() {
                    return (this.idx++ < 3)
                        ? {done: false, value: this.idx}
                        : {done: true}
                }
            };
            return fuseIter({}, function() { return iter; });
        };

        var expectedVals = [0, 1, 2, 3];
        var iter = makeIter(createIterable());
        var next = iter.next();
        while (!next.done) {
            assert.equal(next.value, expectedVals.shift());
            next = iter.next();
        }
        assert.ok(next.done);
    });

    it("makeIter don't not work with iterators", function() {
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

        var thrown = false;
        try {
            makeIter(createIterator());

        } catch(e) {
            thrown = true;
        }
        assert.ok(thrown, 'makeIter() must not accept an iterators.');
    });
});
