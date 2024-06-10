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
  await db[tabla].push(data);
}

async function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};