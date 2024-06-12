const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();
// Routes
router.get('/', list)
router.post('/follow/:id', secure('follow'), follow);
router.get('/:id/following', following);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

// Internal functions
async function list(req, res ,next) {
  try {
    const list = await Controller.list()
    response.success(req, res, list, 200)
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const user = await Controller.get(req.params.id)
    response.success(req, res, user, 200)
  } catch (error) {
    next(error);
  }
}

async function upsert(req, res, next) {
  try {
    const user = await Controller.upsert(req.body)
    response.success(req, res, user, 201)
  } catch (error) {
    next(error);
  }
}

async function follow(req, res, next) {
  try {
    const data = {
      user: req.user.id,
      follow: req.params.id,
    }
    const user = await Controller.follow(data)
    response.success(req, res, user, 201)
  } catch (error) {
    next(error);
  }
}

function following(req, res, next) {
	return Controller.following(req.params.id)
		.then( (data) => {
			return response.success(req, res, data, 200);
		})
		.catch(next);
}


module.exports = router;