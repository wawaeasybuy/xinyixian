'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	index:Number,//序号
	category:{
		type:String,
		ref:'Category'
	},//分类
	remindTag:[String],//提示Tag,不加入tag库
	tags:[{
		type:String,
		ref:'Tag'
	}],//Tag库
	title:String,//标题
	author:String,//作者
	image:String,//题图
	isBigImage:{
		type:Boolean,
		default:false
	},//是否为大图模式
	thumbnail:String,//缩略图
	summary:String,//摘要
	addDate:Date,//文章添加日期
	updateDate:Date,//修改日期，默认为发布日期
	content:String,//文章内容，整个html代码，包含标签，编辑处和展示处宽度一致
	state:{
		type: Number,
		default: 1 
	},//1.草稿（未发布），2.发布，3.回收站
	speciaLink:String,//特殊链接
	pv:{
		type: Number,
		default: 0 
	}//浏览量
});

module.exports = mongoose.model('Article', ArticleSchema);

// var article =  mongoose.model('article', ArticleSchema);

var User = require('../user/user.model');
//生成id
ArticleSchema.pre('save', function(next){
	var self=this;
	//如果是第一次发布，则生成addDate
	if(self.state==2 && !self.addDate){
		self.addDate=new Date();
	}
	//如果为新的，文章id赋值,admin中下篇文章编号+1
	
	if(self.isNew || !self.index){
		User.findOne({role:'admin'},function (err,admin){
			if (err) next(err);
			self.index=admin.nextArticleNumber;
			
			admin.nextArticleNumber+=1;
			admin.save(function (err){
				if (err) next(err);
				next();
			});
		});
	}else{
		next();
	}
});