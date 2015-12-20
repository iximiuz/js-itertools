# Itertools
Couple of functions to operate with collections/iterators.

### Currently supported tools:
 - chain(iterable1, iterable2, ...) see <a href="https://docs.python.org/2/library/itertools.html#itertools.chain">itertools.chain</a>

## Install
    npm install Ostrovski/iv-itertools

## Usage
    var chain = require('iv-itertools').chain
    
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