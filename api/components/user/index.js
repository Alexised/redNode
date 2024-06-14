const store = require('../../../store/remote-mysql');
const ctrl = require('./controller');
const cache = require('../../../store/remote-cache');

module.exports = ctrl(store, cache);
