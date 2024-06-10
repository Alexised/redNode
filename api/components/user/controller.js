
const TABLA = 'user';
const e = require('express');
const nanoid = require('nanoid');

module.exports = function (injectedStore) {
  let store = injectedStore ||  require('../../../store/dummy');

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  function upsert(data) {
    const user = {
      name: data.name,
    }

    if (data.id) {
      user.id = data.id;
    } else {
      user.id = nanoid();
    }

    return store.upsert(TABLA, user);
  }

  return {
    list,
    get,
    upsert,
  };
}