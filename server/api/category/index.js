'use strict';

var express = require('express');
var controller = require('./category.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole(['admin']), controller.index);
router.post('/', auth.hasRole(['admin']), controller.create);
router.put('/:id', auth.hasRole(['admin']), controller.update);
router.delete('/:id', auth.hasRole(['admin']), controller.destory);

module.exports = router;