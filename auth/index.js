const jwt = require('jsonwebtoken');
const config = require('../config.js'); 
const secret = config.jwt.secret;
function sign(data){
  return jwt.sign(data, secret);
}

function verifyToken(token) {
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
      throw new Error('No puedes hacer esto');
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
    throw new Error('No viene Token');
  }

  if(auth.indexOf('Bearer ') === -1) {
    throw new Error('Formato invalido');
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

module.exports = {
  sign,
  check,
};