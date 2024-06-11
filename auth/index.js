const jwt = require('jsonwebtoken');
const config = require('../config.js'); 
const secret = config.jwt.secret;
const error = require('../utils/error');

function sign(data){
  return jwt.sign(data, secret);
}

function verify(token) {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error(error.message)
  }
}

const check = {
  own: function(req, owner) {
    const decoded = decodeHeader(req);
    if(decoded.id !== owner) {
      throw error('No puedes hacer esto', 401);
    }
  },
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}

function getToken(auth) {
  if(!auth) {
    throw error('No viene Token', 401);
  }

  if(auth.indexOf('Bearer ') === -1) {
    throw error('Formato invalido', 401);
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

module.exports = {
  sign,
  check,
};