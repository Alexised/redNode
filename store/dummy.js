const db = {
  'user': [
    { id: '1', name: 'alexis' },
  ],
};

async function list (tabla) {
  return db[tabla] || [];
}

async function get(tabla, id) {
  let col = await list(tabla);
  return col.find(item => item.id === id) || null
}

async function upsert(tabla, data) {
  if(!db[tabla]) {
    db[tabla] = [];
  }
  await db[tabla].push(data);
  return data;
}

async function remove(tabla, id) {
  return true;
}


async function query(tabla, q) {
  let col = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];
  return col.find(item => item[key] === q[key]) || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};