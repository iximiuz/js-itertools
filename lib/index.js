var tools = require('./tools');

module.exports = {
    chain: require('./chain'),
    ifilter: require('./ifilter'),
    toArray: tools.toArray,
    toIterable: tools.toIterable,
    toIterator: tools.toIterator
};