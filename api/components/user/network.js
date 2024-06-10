const express = require('express');

const response = require('../../../network/response');
const router = express.Router();
console.log("zzzz");
router.get('/', function(req, res) {
  console.log("ffff");
  response.success(req, res, 'OK', 200 );
});

module.exports = router;