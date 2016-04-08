'use strict';

var User = require('../user/user.model');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageGroupSchema = new Schema({
	sign:String,//分组标记，默认分组为1
	name:String,//图片分组名称
	images:[String],//图片url
	createDate:Date//创建日期
});

module.exports = mongoose.model('ImageGroup', ImageGroupSchema);

// var article =  mongoose.model('article', ArticleSchema);

//生成sign
ImageGroupSchema.pre('save', function(next){
	var self=this;
	//如果为新的，文章id赋值,admin中下个group编号+1
	if(self.isNew || !self.sign){
		User.findOne({role:'admin'},function (err,admin){
			if (err) next(err);
			self.sign=admin.nextGroupNumber;
			admin.nextGroupNumber+=1;
			admin.save(function (err){
				if (err) next(err);
				next();
			});
		});
	}else{
		next();
	}
});
