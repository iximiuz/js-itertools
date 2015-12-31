'use strict';

var chai = require('chai');
var assert = chai.assert;

var itertools = require('../itertools');
var product = itertools.product;
var toArray = itertools.toArray;

describe("product test suite", function() {
    xit("product works with strings", function() {
        var productIter = product('ABC', 'xy');
        var exptected = [['A', 'x'], ['A', 'y'], ['B', 'x'],
                         ['B', 'y'], ['C', 'x'], ['C', 'y']];
        assert.equal(toArray(productIter), exptected);
    });
});
