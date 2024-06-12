const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

// Internal functions
const login = async (req, res) => {
  try {
    const token = await Controller.login(req.body.username, req.body.password)
    response.success(req, res, token, 200)
  } catch (error) {
    response.error(req, res, 'informacion invalida', 400)
  }
}

// Routes
router.post('/login', login)

module.exports = router;