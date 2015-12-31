var tools = require('./tools');

module.exports = {
    chain: require('./chain'),
    ifilter: require('./ifilter'),
    product: require('./product'),
    ensureIter: tools.ensureIter,
    fuseIter: tools.fuseIter,
    makeIter: tools.makeIter,
    toArray: tools.toArray
};