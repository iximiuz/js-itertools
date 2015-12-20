'use strict';

var hasIters = require('./compat').iterators;
var _iterSymbol = hasIters
    ? Symbol.iterator
    : false;

function argsToIters() {
    var iters = [];
    for (var i = 0, l = arguments.length; i < l; i++) {
        var arg = arguments[i];
        var type, value;
        switch (true) {
            case arg.next === 'function':
                type = 'i';
                value = arg;
                break;
            case _iterSymbol && arg[_iterSymbol]:
                type = 'i';
                value = arg[_iterSymbol];
                break;
            case typeof arg.length === 'number':
                type = 's';
                value = arg;
                break;
            default:
                throw Error('Unsupported argument type');
        }

        iters.push({type: type, value: value});
    }
    return iters;
}

/**
 * @param1 {Iterator|Iterable},
 * @param2 {Iterator|Iterable}
 * ...
 * @returns {Iterator}
 */
function chain() {
    var args = argsToIters.apply(null, arguments);
    var argNo = 0;
    var inArgIdx = 0;
    var chainIter = {
        next: function() {
            if (argNo >= args.length) {
                return {done: true};
            }

            var arg = args[argNo];
            if (arg.type === 'i') {
                var next = arg.value.next();
                if (!next.done) {
                    return next;
                }
            } else if (inArgIdx < arg.value.length) {
                return {value: arg.value[inArgIdx++], done: false};
            }

            argNo++;
            inArgIdx = 0;
            return this.next();
        }
    };
    if (_iterSymbol) {
        chainIter[_iterSymbol] = function() { return this; };
    }
    return chainIter;
}

module.exports = chain;
