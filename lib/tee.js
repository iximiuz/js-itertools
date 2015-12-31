//function toRewindIterator(iterable) {
//    if (
//        typeof iterable.next === 'function'
//        && typeof iterable.rewind === 'function'
//    ) {
//        return iterable;
//    }
//
//    var isSubscriptable = _isSubscriptable(iterable);
//    iterable = toIterator(iterable);
//    if (isSubscriptable) {
//        return iterable;
//    }
//
//    var produced = [];
//    var producedIter = toIterator(produced);
//    var fromProduced = false;
//    return {
//        next: function() {
//            var next;
//            if (fromProduced) {
//                next = producedIter.next();
//                fromProduced = !next.done;
//                if (!next.done) {
//                    return next;
//                }
//            }
//
//            next = iterable.next();
//            if (!next.done) {
//                produced.push(next.value);
//            }
//            return next;
//        },
//        rewind: function () {
//            producedIter.rewind();
//            fromProduced = true;
//        }
//    };
//}