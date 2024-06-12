
const TABLA = 'user';
const { nanoid } = require('nanoid');
const auth = require('../auth');

module.exports = function (injectedStore) {
  let store = injectedStore || require('../../../store/dummy');

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

  function follow(data) {
    const { user, follow } = data;
    return store.upsert(TABLA + '_follow', {
      user_from: user,
      user_to: follow,
    });
  }

  async function following(user) {
    const join = {}
    join[TABLA] = 'user_to'; // { user: 'user_to' }
    const query = { user_from: user };
    return await store.query(TABLA + '_follow', query, join);
  }

  return {
    list,
    get,
    upsert,
    follow,
    following,
  };
}