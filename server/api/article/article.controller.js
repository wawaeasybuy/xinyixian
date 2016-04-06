'use strict';

var _ = require('lodash');
var Article = require('./article.model');
var User = require('../user/user.model');
var Category = require('../category/category.model');

var handleError = function (res, err) {
  console.log(err);
  return res.send(500, err);
};

var getNoRepeatArr=function (arr){
	var newArr=[];
	_.each(arr,function (a){
		if(newArr.indexOf(a)==-1){
			newArr.push(a);
		}
	});
	return newArr;
};

//create article
exports.create=function (req,res){
	if(req.body._id){
		delete req.body._id;
	}
	// req.body.addDate=new Date();
	req.body.category=getNoRepeatArr(req.body.category);
	req.body.tags=getNoRepeatArr(req.body.tags);
	req.body.remindTag=getNoRepeatArr(req.body.remindTag);
	if(!req.body.category){
		Category.findOne({sgin:1},function (err,category){
			if(err){ return handleError(res,err);}
			if(!category){return res.json(404,{error:{msg:'defalut category not found'}});}
			req.body.category=category._id;
			Article.create(req.body,function (err,article){
				if(err){ return handleError(res,err);}
				return res.json(200,{article:article});
			});
		});
	}else{
		Article.create(req.body,function (err,article){
			if(err){ return handleError(res,err);}
			return res.json(200,{article:article});
		});
	}
	
	
};

//update article (含发布，删除，更新，state改变即可)
exports.update=function(){
	var id=req.params.id;
	if(!id){return res.json(400,{error:{msg:'id is required'}});}
	
	var articleDetails=_.pick(req.body,'category','remindTag','tags','title','author','image','isBigImage','thumbnail','summary','updateDate','content','state','speciaLink');
	articleDetails.category=getNoRepeatArr(articleDetails.category);
	articleDetails.tags=getNoRepeatArr(articleDetails.tags);
	articleDetails.remindTag=getNoRepeatArr(articleDetails.remindTag);
	Article.findById(id,function (err,article){
		if(err){ return handleError(res,err);}
		if(!article){return res.json(404,{error:{msg:'article not found'}});}
		article=_.assign(article,articleDetails);
		article.save(function (err,article){
			if(err){ return handleError(res,err);}
			return res.json(200,{article:article});
		});
	});
};

//move to dustbin 删除（垃圾箱）
exports.dustbin=function (req,res){
	var id=req.params.id;
	if(!id){return res.json(400,{error:{msg:'id is required'}});}
	Article.findById(id,function (err,article){
		if(err){ return handleError(res,err);}
		if(!article){return res.json(404,{error:{msg:'article not found'}});}
		article.state=3;
		article.save(function (err,article){
			if(err){ return handleError(res,err);}
			return res.json(200,{article:article});
		});
	});
};

//delete 彻底删除
exports.destory=function (req,res){
	var id=req.params.id;
	if(!id){return res.json(400,{error:{msg:'id is required'}});}
	Article.findByIdAndRemove(id,function (err,article){
		if(err){ return handleError(res,err);}
		if(!article){return res.json(404,{error:{msg:'article not found'}});}
		return res.json(200,{msg:'delete success'});
	});
};

//move to dustbin 批量删除（垃圾箱）
exports.dustbin_all=function (req,res){
	var articles=req.body.articles;
	if(!articles){return res.json(400,{error:{msg:'articles is required'}});}
	Article.find({_id:{$in:articles}},function (err,articles){
		if(err){ return handleError(res,err);}
		_.each(articles,function (article){
			article.state=3;
			article.save();
		});
		return res.json(200,{msg:'remove success'});
	});
};

//delete 批量彻底删除
exports.destory_all=function (req,res){
	var articles=req.body.articles;
	if(!articles){return res.json(400,{error:{msg:'articles is required'}});}
	Article.find({_id:{$in:articles}},function (err,articles){
		if(err){ return handleError(res,err);}
		_.each(articles,function (article){
			article.remove();
		});
		return res.json(200,{msg:'delete success'});
	});
};

//index-update,文章调整序号index state=1(-,向前移动一位),2(+向后移动一位)
exports.index_update=function (req,res){
	var id=req.params.id;
	var state=req.query.state;
	if(!id){return res.json(400,{error:{msg:'id is required'}});}
	if(!state){return res.json(400,{error:{msg:'state is required'}});}
	if(state!=1&&state!=2){return res.json(400,{error:{msg:'state is wrong'}});}
	Article.findById(id,function (err,article_one){
		if(err){ return handleError(res,err);}
		if(!article_one){return res.json(404,{error:{msg:'article_one not found'}});}
		var index_one;
		var index_two=article_one.index;
		if(state==1){
			if(article_one.index==1){return res.json(400,{error:{msg:'article already is the frist'}});}
			index_one=article_one.index-1;
			var condition={index:index_one};
		}else{
			index_one=article_one.index+1;
			var condition={index:index_one};
		}
		Article.findOne(condition,function (err,article_two){
			if(err){ return handleError(res,err);}
			if(article_two){
				article_one.index=index_one;
				article_two.index=index_two;
				article_two.save();
				article_one.save(function (err,article){
					if(err){ return handleError(res,err);}
					return res.json(200,{article:article});
				});
			}else{
				article_one.index=index_one;
				article_one.save(function (err,article){
					if(err){ return handleError(res,err);}
					return res.json(200,{article:article});
				});
			}
		});
	});
};

