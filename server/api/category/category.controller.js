'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var User = require('../user/user.model');


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

//create category
exports.create=function (req,res){
	var categoryDetails=_.pick(req.body,'name','image','tags');
	if(!categoryDetails.name){return res.json(400,{error:{msg:'name is required'}});}
	categoryDetails.tags=getNoRepeatArr(categoryDetails.tags);
	categoryDetails.createDate=new Date();
	Category.create(categoryDetails,function (err,category){
		if(err){ return handleError(res,err);}
		return res.json(200,{category:category});
	});
	// Category.findOne({name:categoryDetails.name},function (err,category){
	// 	if(err){ return handleError(res,err);}
	// 	if(category){return res.json(400,{error:{msg:'this category is already existd'}});}
	// 	Category.create(categoryDetails,function (err,category){
	// 		if(err){ return handleError(res,err);}
	// 		return res.json(200,{category:category});
	// 	});
	// });
	
};

//update category
exports.update=function(){
	var id=req.params.id;
	if(!id){return res.json(400,{error:{msg:'id is required'}});}
	
	var categoryDetails=_.pick(req.body,'name','image','tags');
	categoryDetails.tags=getNoRepeatArr(categoryDetails.tags);
	Category.findById(id,function (err,category){
		if(err){ return handleError(res,err);}
		if(!category){return res.json(404,{error:{msg:'category not found'}});}
		category=_.assign(category,categoryDetails);
		category.save(function (err,category){
			if(err){ return handleError(res,err);}
			return res.json(200,{category:category});
		});
	});
};

//delete category
exports.destory=function (req,res){
	var id=req.params.id;
	if(!id){return res.json(400,{error:{msg:'id is required'}});}

	Category.findById(id,function (err,category_destory){
		if(err){ return handleError(res,err);}
		if(!category_destory){return res.json(404,{error:{msg:'category not found'}});}
		if(category_destory.sign==1){
			return res.json(400,{error:{msg:'defalut category can not remove'}});
		}else{
			category.findOne({sign:1},function (err,category){
				if(err){ return handleError(res,err);}
				if(!category){return res.json(404,{error:{msg:'defalut category not found'}});}
				Article.find({category:id},function (err,articles){
					if(err){ return handleError(res,err);}
					_.each(articles,function (article){
						article.category=category._id;
						article.save();
					});
					category_destory.remove();
					return res.json(200,{msg:'delete success'});
				});
			});
		}
		
		
	});
};