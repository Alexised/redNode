const redis = require('redis');
const config = require('../config');

// Crear un cliente de Redis
const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
});

// Manejo de eventos
client.on('connect', function() {
  console.log('Conectado a Redis');
});

client.on('error', function(err) {
  console.error('Error de Redis:', err);
});

// Función para listar datos
const list = (table) => {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject(err);
      let res = data || null;
      if (data) {
        res = JSON.parse(data);
      }
      resolve(res);
    });
  });
};

// Función para obtener datos por id
const get = (table, id) => {
  const key = `${table}_${id}`;
  return list(key);
}

// Función para insertar o actualizar datos
const upsert = (table, data) => {
  return new Promise((resolve, reject) => {
    let key = table;
    if (data && data.id) {
      key = `${key}_${data.id}`;
    }
    client.set(key, JSON.stringify(data), (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
}

// Función para cerrar el cliente de Redis
const close = () => {
  client.quit();
}

module.exports = {
  list,
  get,
  upsert,
  close
};
