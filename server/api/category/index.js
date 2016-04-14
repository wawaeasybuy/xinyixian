'use strict';

var express = require('express');
var controller = require('./category.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/all/category', auth.hasRole(['admin']), controller.all_index);
router.get('/admin/category',auth.hasRole(['admin']),controller.index_admin);
router.get('/',controller.index);
router.get('/:id',auth.hasRole(['admin']),controller.show);
router.post('/', auth.hasRole(['admin']), controller.create);
router.put('/:id', auth.hasRole(['admin']), controller.update);
router.put('/destory/all', auth.hasRole(['admin']), controller.destory_all);
router.delete('/:id', auth.hasRole(['admin']), controller.destory);

module.exports = router;