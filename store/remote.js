const axios = require('axios');
const { nanoid } = require('nanoid');

function createRemoteDB(host, port) {
  const URL = 'http://' + host + ':' + port;

  function get(table, id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        resolve(null); // Si el id está vacío, resolvemos con null sin realizar la consulta
      } else {
        resolve(req('GET', `${table}/${id}`));
      }
    });
  }

  function list(table) {
    return req('GET', table);
  }

  function insert(table, data) {
    return req('POST', table, data);
  }

  function update(table, data) {
    return req('PUT', table, data);
  }

  const upsert = async (table, data) => {
    const row = await get(table, data.id);
    if (!row) {
      data.id = nanoid();
      return insert(table, data);
    } else {
      return update(table, data);
    }
  };


  async function req(method, table, data) {
    const url = `${URL}/${table}`;
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      
    };
    if (data) {
      config.data = data;
    }
    try {
      const response = await axios(config);
      return response.data.body;
    } catch (error) {
      console.error('Error con la base de datos remota', error);
      throw new Error(error.message);
    }
  }

  return {
    list,
    insert,
    update,
    get,
    upsert,
  };
}

module.exports = createRemoteDB;