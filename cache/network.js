const express = require('express');

const response = require('../network/response');
const Store = require('../store/redis');

const router = express.Router();

const list = async (req, res, next) => {
  const datos = await Store.list(req.params.table)
  response.success(req, res, datos, 200);
}

const get = async (req, res, next) => {
  const datos = await Store.get(req.params.table, req.params.id)
  response.success(req, res, datos, 200);
}

const upsert = async (req, res, next) => {
  const datos = await Store.upsert(req.params.table, req.body)
  response.success(req, res, datos, 200);
}

router.get('/:table', list);
router.get('/:table/:id', get);
router.put('/:table', upsert);
module.exports = router;