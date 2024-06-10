const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

// Routes
router.post('/login', login)

// Internal functions
async function login(req, res) {
  try {
    const token = await Controller.login(req.body.username, req.body.password)
    response.success(req, res, token, 200)
  } catch (error) {
    response.error(req, res, 'informacion invalida', 400)
  }
}
module.exports = router;