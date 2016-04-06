'use strict';

var express = require('express');
var controller = require('./image-group.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.hasRole(['admin']), controller.create);
router.put('/:id', auth.hasRole(['admin']), controller.update);
router.put('/:id/move', auth.hasRole(['admin']), controller.move);
router.delete('/:id', auth.hasRole(['admin']), controller.destory);

module.exports = router;