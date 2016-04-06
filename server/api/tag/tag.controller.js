'use strict';

var _ = require('lodash');
var Tag = require('./tag.model');
var User = require('../user/user.model');
var Article = require('../article/article.model');
var Category = require('../category/category.model');


var handleError = function (res, err) {
  console.log(err);
  return res.send(500, err);
}

//create tag
exports.create=function (req,res){
	if(req.body._id){
		delete req.body._id;
	}
	req.body.createDate=new Date();
	Tag.create(req.body,function (err,tag){
		if(err){ return handleError(res,err);}
		return res.json(200,{tag:tag});
	});
};

//update tag
exports.update=function (req,res){
	var id=req.params.id;
	if(req.body._id){
		delete req.body._id;
	}
	Tag.findById(id,function (err,tag){
		if(err){ return handleError(res,err);}
		if(!tag){return res.json(404,{error:{msg:'tag not found'}});}
		tag=_.assign(tag,req.body);
		tag.save(function (err,tag){
			if(err){ return handleError(res,err);}
			return res.json(200,{tag:tag});
		});
	});
};

//delete tag
exports.destory=function (req,res){
	var id=req.params.id;
	if(req.body._id){
		delete req.body._id;
	}
	Tag.findById(id,function (err,tag){
		if(err){ return handleError(res,err);}
		if(!tag){return res.json(404,{error:{msg:'tag not found'}});}
		Article.find({tags:id},function (err,articles){
			if(err){ return handleError(res,err);}
			Category.find({tags:id},function (err,categories){
				if(err){ return handleError(res,err);}
				tag.remove();
				_.each(articles,function (article){
					article.tags.pull(id);
					article.save();
				});
				_.each(categories,function (category){
					category.tags.pull(id);
					category.save();
				});
				return res.json(200,{msg:'delete success'});
			});
		});
		
	});
};

//index
exports.index=function (req,res){
	var page = req.query.page || 1,
    itemsPerPage = req.query.itemsPerPage || 10;
    var isReturn=function(index,len){
    	if(index==len){return res.json();}
    };
    Tag.find({},{},{
    	skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage
    })
    .sort({createDate:-1})
    .exec(function (err,tags){
    	if(err){ return handleError(res,err);}
    	for(var i=0;i<tags.length;i++){
    		tags[i]=tags[i].toObject();
    	}
    	var index=0;
    	_.each(tags,function (tag){
    		Article.find({tags:tag._id}).count(function (err,c){
    			if(err){ return handleError(res,err);}
    			index++;
    			tag.articleCount=c;
    			isReturn(index,tags.length);
    		});
    	});
    });
};