var tools = require('./tools');

module.exports = {
    chain: require('./chain'),
    ifilter: require('./ifilter'),
    product: require('./product'),
    toArray: tools.toArray,
    toIterable: tools.toIterable,
    toIterator: tools.toIterator,
    toRewindIterator: tools.toRewindIterator
};