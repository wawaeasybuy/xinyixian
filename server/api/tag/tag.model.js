'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
	// id:String,//分类Id
	name:String,//Tag名
	createDate:Date//创建日期
});

module.exports = mongoose.model('Tag', TagSchema);

// var article =  mongoose.model('article', ArticleSchema);

//生成id
// TagSchema.pre('save', function(next){
// 	var self=this;
// 	//如果为新的，文章id赋值,admin中下个Tag编号+1
// 	if(self.isNew || !self.id){
// 		User.findOne({role:'admin'},function (err,admin){
// 			if (err) next(err);
// 			self.id=admin.nextTagNumber;
// 			admin.nextTagNumber+=1;
// 			admin.save(function (err){
// 				if (err) next(err);
// 				next();
// 			});
// 		});
// 	}
// });