const express = require('express');
const config = require('../config.js');
const router = require('./network');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router)

app.listen(config.mysqlService.port, () => {
  console.log(`Server mysql is running on port ${config.mysqlService.port}`);
});