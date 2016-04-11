'use strict';

var express = require('express');
var controller = require('./upload.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.post('/',controller.upload);
router.post('/lib',controller.uploadToLib);


module.exports = router;