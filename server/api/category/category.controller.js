'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var User = require('../user/user.model');
var Article = require('../article/article.model');


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
exports.update=function(req,res){
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
			Category.findOne({sign:1},function (err,category){
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


//index
exports.index=function (req,res){
	var page = req.query.page || 1,
    	itemsPerPage = req.query.itemsPerPage || 10;
   	var count;
    Category.find({sign:{$ne:1}}).count(function (err,c){
    	if(err){ return handleError(res,err);}
    	count=c;
    });

    Category.find({sign:{$ne:1}},{},{
    	skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage
    })
    .sort({createDate:1})
    .exec(function (err,categories){
    	if(err){ return handleError(res,err);}
    	return res.json(200,{
    			categories:categories,
    			count:count,
    			page:page
    		});
    	
    });
};

//admin的category列表获取
exports.index_admin=function(req,res){
	var page = req.query.page || 1,
    	itemsPerPage = req.query.itemsPerPage || 10;
   	var count;
   	var isReturn=function(index,len,categories){
    	if(index==len){
    		return res.json(200,{
    			categories:categories,
    			count:count,
    			page:page
    		});
    	}
    };
    Category.find({}).count(function (err,c){
    	if(err){ return handleError(res,err);}
    	count=c;
    });

    Category.find({},{},{
    	skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage
    })
    .sort({createDate:1})
    .exec(function (err,categories){
    	if(err){ return handleError(res,err);}
		for(var i=0;i<categories.length;i++){
    		categories[i]=categories[i].toObject();
    	}
    	var index=0;
    	_.each(categories,function (category){
    		Article.find({category:category._id}).count(function (err,c){
    			if(err){ return handleError(res,err);}
    			index++;
    			category.articleCount=c;
    			isReturn(index,categories.length,categories);
    		});
    	});
    });
};

//admin getAll
exports.all_index=function (req,res){
	Category.find({})
	.sort({createDate:1})
	.exec(function (err,categories){
		if(err){ return handleError(res,err);}
		res.json(200,{categories:categories});
	});
};

//批量删除
exports.destory_all=function(req,res){
	var ids=req.body.categories;
	if(!ids){return res.json(400,{error:{msg:'categories is required'}});}
	Category.find({_id:{$in:ids}},function (err,categories){
		if(err){ return handleError(res,err);}
		
		Category.findOne({sign:1},function (err,category){
			if(err){ return handleError(res,err);}
			if(!category){return res.json(404,{error:{msg:'defalut category not found'}});}
			Article.find({category:{$in:ids}},function (err,articles){
				if(err){ return handleError(res,err);}
				//删除分类
				_.each(categories,function (category){
					category.remove();
				});
				//将文章的category移动至默认分类
				_.each(articles,function (article){
					article.category=category._id;
					article.save();
				});
				return res.json(200,{msg:'delete success'});
			});
		});
		
	});
};

//admin get category by id
exports.show=function (req,res){
	var id=req.params.id;
	Category.findById(id)
	.populate('tags')
	.exec(function (err,category){
		if(err){ return handleError(res,err);}
		if(!category){return res.json(404,{error:{msg:'category not found'}});}
		return res.json(200,{category:category});
	});
};