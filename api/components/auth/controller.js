const bcrypt = require('bcrypt');
const TABLA = 'auth';
const auth = require('../../../auth');  

module.exports = function (injectedStore) {
  let store = injectedStore || require('../../../store/dummy');

  async function upsert(data) {
    const authdata = {
      id: data.id,
    }
    if (data.username) {
      authdata.username = data.username;
    }
    if (data.password) {
      authdata.password = await bcrypt.hash(data.password, 5);
    }
    return store.upsert(TABLA, authdata);
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });

    const equals = await bcrypt.compare(password, data.password);
    if (!equals) {
      throw new Error('information not valid');
    }
    return auth.sign(data);
  }

  return {
    upsert,
    login,
  };
}