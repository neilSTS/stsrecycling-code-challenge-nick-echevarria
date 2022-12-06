const express = require('express');
const followersController = require('../controllers/followersController');

const followersRouter = express.Router();

followersRouter.get(
  '/followers/:githubLogin',
  followersController.fetchFollowers,
  (req, res) => {
    return res.status(200).send(res.locals.followers);
  }
);

module.exports = followersRouter;