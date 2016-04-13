'use strict';

var express = require('express');
var controller = require('./tag.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/select/tag',auth.hasRole(['admin']), controller.query);
router.post('/', auth.hasRole(['admin']), controller.create);
router.put('/:id', auth.hasRole(['admin']), controller.update);
router.delete('/:id', auth.hasRole(['admin']), controller.destory);

module.exports = router;