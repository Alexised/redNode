
const TABLA = 'user';
const auth = require('../auth');

module.exports = function (injectedStore, injectedCache) {
  let store = injectedStore || require('../../../store/mysql');
  let cache = injectedCache || require('../../../store/redis');

  function list() {
    return store.list(TABLA);
  }

  const list = async () => {
    let users = await cache.list(TABLA);
    if (!users) {
      console.log('No estaba en cache. Buscando en DB');
      users = await store.list(TABLA);
      cache.upsert(TABLA, users);
    }
    return users;
  

  function get(id) {
    return store.get(TABLA, id);
  }

  async function upsert(data) {
    const user = {
      name: data.name,
      username: data.username,
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