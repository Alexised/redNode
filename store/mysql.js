const mysql = require('mysql2');
const config = require('../config');

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  port: config.mysql.port,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error('[db err]', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('DB Connected!');
    }
  });

  connection.on('error', err => {
    console.error('[db err]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ??`, [table], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};


const get = (table, id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      resolve(null); // Si el id está vacío, resolvemos con null sin realizar la consulta
    } else {
      connection.query(`SELECT * FROM ?? WHERE id = ?`, [table, id], (err, data) => {
        if (err) return reject(err);
        resolve(data[0] || null);
      });
    }
  });
};

const insert = (table, data) => {
  console.log(table)
  console.log(data)
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ?? SET ?`, [table, data], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const update = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ?? SET ? WHERE id = ?`, [table, data, data.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const query = (table, query,join) => {
  let joinQuery = '';
  if (join) {
      const key = Object.keys(join)[0];
      const val = join[key];
      joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
        if (err) return reject(err);
        resolve(res[0] || null);
    })
})
};

module.exports = {
  list,
  get,
  insert,
  update,
  query,
};
