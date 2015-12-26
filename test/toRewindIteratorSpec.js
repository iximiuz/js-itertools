'use strict';

var chai = require('chai');
var assert = chai.assert;

var compat = require('../lib/compat');
var itertools = require('../itertools');
var toIterator = itertools.toIterator;
var toRewindIterator = itertools.toRewindIterator;

describe("toRewindIterator test suite", function() {
    function simpleTest(iterable, expected, doRewind) {
        var iter = toRewindIterator(iterable);
        if (doRewind) {
            iter.rewind();
        }
        var next = iter.next();
        while (!next.done) {
            assert.equal(next.value, expected.shift());
            next = iter.next();
        }
        assert.ok(next.done);
    }

    function rewindInTheMiddleTest(iterable, expected) {
        var iter = toRewindIterator(iterable);
        var next = iter.next();
        assert.equal(next.value, expected[0]);
        assert.notOk(next.done);

        next = iter.next();
        assert.equal(next.value, expected[1]);
        assert.notOk(next.done);

        iter.rewind();
        next = iter.next();
        assert.equal(next.value, expected[0]);
        assert.notOk(next.done);

        iter.rewind();
        next = iter.next();
        assert.equal(next.value, expected[0]);
        assert.notOk(next.done);

        next = iter.next();
        assert.equal(next.value, expected[1]);
        assert.notOk(next.done);

        iter.rewind();
        next = iter.next();
        assert.equal(next.value, expected[0]);
        assert.notOk(next.done);

        next = iter.next();
        assert.equal(next.value, expected[1]);
        assert.notOk(next.done);

        next = iter.next();
        assert.equal(next.value, expected[2]);
        assert.notOk(next.done);

        next = iter.next();
        assert.equal(next.value, expected[3]);
        assert.notOk(next.done);

        next = iter.next();
        assert.ok(next.done);
    }

    it("toRewindIterator - simple (array, string)", function() {
        simpleTest([1, 2, 3, 4], [1, 2, 3, 4]);
        simpleTest('abcd', ['a', 'b', 'c', 'd']);
    });
    it("toRewindIterator - simple (array iterator)", function() {
        simpleTest(toIterator([1, 2, 3, 4]), [1, 2, 3, 4]);
    });
    it("toRewindIterator - simple (user-defined iterator)", function() {
        simpleTest(_createUserIter(4), [1, 2, 3, 4]);
    });

    it("toRewindIterator - rewind before start (array, string)", function() {
        simpleTest([1, 2, 3, 4], [1, 2, 3, 4], true);
        simpleTest('abcd', ['a', 'b', 'c', 'd'], true);
    });
    it("toRewindIterator - rewind before start (array iterator)", function() {
        simpleTest(toIterator([1, 2, 3, 4]), [1, 2, 3, 4], true);
    });
    it("toRewindIterator - rewind before start (user-defined iterator)", function() {
        simpleTest(_createUserIter(4), [1, 2, 3, 4], true);
    });

    it("toRewindIterator - rewind in the middle (array, string)", function() {
        rewindInTheMiddleTest([1, 2, 3, 4], [1, 2, 3, 4]);
        rewindInTheMiddleTest('abcd', ['a', 'b', 'c', 'd']);
    });
    it("toRewindIterator - rewind in the middle (array iterator)", function() {
        rewindInTheMiddleTest(toIterator([1, 2, 3, 4]), [1, 2, 3, 4]);
    });
    it("toRewindIterator - rewind in the middle (user-defined iterator)", function() {
        rewindInTheMiddleTest(_createUserIter(4), [1, 2, 3, 4]);
    });

    function _createUserIter(maxVal) {
        var idx = 0;
        return {
            next: function() {
                return (idx++ < maxVal)
                    ? {done: false, value: idx}
                    : {done: true}
            }
        };
    }
});
