
const TABLA = 'auth';
const { nanoid }  = require('nanoid');

module.exports = function (injectedStore) {
  let store = injectedStore ||  require('../../../store/dummy');

  function upsert(data) {
    const authdata = {
      id: data.id,
    }
    if (data.username) {
      authdata.username = data.username;
    }
    if (data.password) {
      authdata.password = data.password;
    }

    return store.upsert(TABLA, authdata);
  }

  return {
    upsert,
  };
}