
const TABLA = 'auth';
const auth = require('../../../auth');  

module.exports = function (injectedStore) {
  let store = injectedStore || require('../../../store/dummy');

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

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    if (data.password === password) {
      // Generate token
      return auth.sign(data);
    } else {
      throw new Error('Información inválida');
    }
    return data;
  }

  return {
    upsert,
    login,
  };
}