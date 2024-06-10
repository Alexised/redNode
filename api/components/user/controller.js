
const TABLA = 'user';
const { nanoid }  = require('nanoid');
const auth = require('../auth');

module.exports = function (injectedStore) {
  let store = injectedStore ||  require('../../../store/dummy');

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  async function upsert(data) {
    const user = {
      name: data.name,
      username: data.username,
    }

    if (data.id) {
      user.id = data.id;
    } else {
      user.id = nanoid();
    }

    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: data.password,
      });
    }

    return store.upsert(TABLA, user);
  }

  return {
    list,
    get,
    upsert,
  };
}