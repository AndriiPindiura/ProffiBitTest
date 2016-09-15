'use strict';

var express = require('express');
var controller = require('./movie.controller');
var bodyParser = require('body-parser');

var router = express.Router();

var rawParser = bodyParser.raw({ type: 'application/vnd.custom-type' });

function raw(req, res, next) {
  req.rawBody = '';
  req.on('data', chunk => {
    req.rawBody += chunk;
  });
  req.on('end', () => next());
}

router.get('/', controller.index);
router.get('/wipe', controller.wipe);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/import', raw, rawParser, controller.importMovies);
// router.put('/:id', controller.upsert);
// router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
