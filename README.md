# Itertools

[![Build Status](https://travis-ci.org/Ostrovski/js-itertools.svg)](https://travis-ci.org/Ostrovski/js-itertools)

Couple of functions to operate with collections/iterators.

### Currently supported tools:
 - `chain(iterable1, iterable2, ...)` see <a href="https://docs.python.org/2/library/itertools.html#itertools.chain">itertools.chain</a>
 - `ifilter(predicate, iterable)` see <a href="https://docs.python.org/2/library/itertools.html#itertools.ifilter">itertools.ifilter</a>
 - `product(iterable1, iterable2, ..., repeat=1)` see <a href="https://docs.python.org/2.7/library/itertools.html#itertools.product">itertools.product</a> 
 - `toArray(iterable)` unrolls an iterable to an array. If an argument is array by itself it'll be 
    returned as is. Be sure that you are not passing infinite iterator.
 - `makeIter(iterable)` accepts iterable|subscriptable (Array, String, etc) data type 
    and wraps it with explicit iterator object if required.  
 - `fuseIter(object, iterProvider)` mixes in an iterator provider function. 
    Uses Symbol.iterator if available.
   
## Install
    npm install Ostrovski/js-itertools

## Usage
    var chain = require('iv-itertools').chain;
    
    // ES6
    for (let el of chain([1, 2], [3, 4])) {
        console.log(el);  // 1 2 3 4
    }
    
    // ES5
    var iter = chain([1, 2], [3, 4]);
    var next = iter.next();
    while (!next.done) {
        console.log(next.value);
        next = iter.next();
    }

## Test
    npm run test
