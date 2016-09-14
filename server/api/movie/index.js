'use strict';

var express = require('express');
var controller = require('./movie.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/import', controller.importMovies);
// router.put('/:id', controller.upsert);
// router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
