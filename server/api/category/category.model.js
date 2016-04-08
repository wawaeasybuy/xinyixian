'use strict';

var User = require('../user/user.model');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
	sign:String,//分类的标志(有一个默认分类，该分类前台不可查看 sign=1)
	name:String,//分类名
	image:String,//分类图标
	tags:[{
		type:String,
		ref:'Tag'
	}],
	createDate:Date,//创建日期
	url:String//url名,state跟在？后 url为id=_id(pre中完成)


});

module.exports = mongoose.model('Category', CategorySchema);

// var article =  mongoose.model('article', ArticleSchema);

//生成id
CategorySchema.pre('save', function(next){
	var self=this;
	//如果为新的，文章id赋值,admin中下个catgeory编号+1
	if(self.isNew || !self.sign){
		User.findOne({role:'admin'},function (err,admin){
			if (err) next(err);
			self.sign=admin.nextCategoryNumber;
			admin.nextCategoryNumber+=1;
			admin.save(function (err){
				if (err) next(err);
				next();
			});
		});
	}else{
		next();
	}
});

//添加url ,默认分类的URL为空
CategorySchema.post('save', function(){
	var self=this;
	//添加url
	if(self.sign!=1 && !self.url){
		self.url='id='+self._id;
		self.save();
	}
	
});