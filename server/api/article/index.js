'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/admin/index',auth.hasRole(['admin']), controller.admin_index);
router.get('/:id', controller.show);
router.get('/push/article', controller.pushArticle);
router.get('/:id/changeArticle', auth.hasRole(['admin']), controller.change);
router.post('/', auth.hasRole(['admin']), controller.create);
router.put('/:id', auth.hasRole(['admin']), controller.update);
router.put('/:id/updateIndex', auth.hasRole(['admin']), controller.index_update);
router.put('/:id/dustbin', auth.hasRole(['admin']), controller.dustbin);
router.put('/:id/pv', controller.addPv);
router.put('/dustbin/all', auth.hasRole(['admin']), controller.dustbin_all);
router.put('/destory/all', auth.hasRole(['admin']), controller.destory_all);
router.delete('/:id', auth.hasRole(['admin']), controller.destory);

module.exports = router;