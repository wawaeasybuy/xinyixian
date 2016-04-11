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

//处理提示标签，两个标签之间用,隔开(英文)
var getTagArr=function (tagString){
	var tags=[];
	var deal=function(arr,tags_string){
		var index=tags_string.indexOf(',');
		if(index>0){
			arr.push(tags_string.substr(0,index));
			var newString=tags_string.substr(index+1);
			return deal(arr,newString);
		}else if(index==0){
			var newString=tags_string.substr(index+1);
			return deal(arr,newString);
		}else{
			if(tags_string.length>0){
				arr.push(tags_string);
			}
			return arr;
		}
	}
	return getNoRepeatArr(deal(tags,tagString));
	
};



//create article
exports.create=function (req,res){
	if(req.body._id){
		delete req.body._id;
	}
	// req.body.addDate=new Date();
	req.body.category=getNoRepeatArr(req.body.category);
	req.body.tags=getNoRepeatArr(req.body.tags);
	//先把String转换成数组
	req.body.remindTag=getTagArr(req.body.remindTag);
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
exports.update=function(req,res){
	var id=req.params.id;
	if(!id){return res.json(400,{error:{msg:'id is required'}});}
	
	var articleDetails=_.pick(req.body,'category','remindTag','tags','title','author','image','isBigImage','thumbnail','summary','updateDate','content','state','speciaLink');
	articleDetails.category=getNoRepeatArr(articleDetails.category);
	articleDetails.tags=getNoRepeatArr(articleDetails.tags);
	articleDetails.remindTag=getTagArr(articleDetails.remindTag);
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

//index
exports.index=function (req,res){
	var page = req.query.page || 1,
    	itemsPerPage = req.query.itemsPerPage || 10;
   	var count;
	var category=req.query.category;
	var tag=req.query.tag;
	var name=req.query.retrieval;
	var condition={};
	if(category){
		condition=_.merge(condition,{category:category});
	}
	if(tag){
		condition=_.merge(condition,{tags:tag});
	}
	if(name){
		condition=_.merge(condition,{title:{'$regex' : '.*' + name + '.*'}});
	}
	if(req.user){
		if(req.user.role=='admin'){
			var state=req.query.state;
			if(state){
				condition=_.merge(condition,{state:state});
			}
		}else{
			condition=_.merge(condition,{state:2});
		}
	}else{
		condition=_.merge(condition,{state:2});
	}
	console.log(condition);
	Article.find(condition).count(function (err,c){
		if(err){ return handleError(res,err);}
		count=c;
	});
	Article.find(condition,{},{
		skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage
	})
	.populate("tags")
	.sort({updateDate:-1})
	.exec(function (err,articles){
		if(err){ return handleError(res,err);}
		return res.json(200,{
			articles:articles,
			page:page,
			count:count
		});
	});

};

//show
exports.show=function (req,res){
	var id=req.params.id;
	Article.findById(id,function (err,article){
		if(err){ return handleError(res,err);}
		if(!article){return res.json(404,{error:{msg:'article not found'}});}
		return res.json(200,{article:article});
	});
};

//推荐
//上(下)一篇 index为当前文章的序号,state=1(上一篇),2(下一篇) ,id为当前文章的id
exports.change = function (req,res){
	var id=req.params.id;
	var index=req.query.index;
	var state=req.query.state;
	var category=req.query.category;
	var tag=req.query.tag;
	var condition={};
	if(!state||(state!=1&&state!=2)){return res.json(400,{error:{msg:'state is required or state is wrong'}});}
	if((!index&&index!=0)||index<0){return res.json(400,{error:{msg:'index is required or index is wrong'}});}

	
	if(category){
		condition=_.merge(condition,{category:category});
	}
	if(tag){
		condition=_.merge(condition,{tags:tag});
	}
	//获取上一篇或下一篇文章 condition为查询条件，number为admin那边文章总数的记录
	// var getArticle=function (index,state,condition,count){
	// 	if(state==1){
	// 		if(index==0){
	// 			return res.json(400,{error:{msg:'This article is the first article'}});
	// 		}
	// 		var aimNum=index-1;
	// 	}else{
	// 		if((index+1)==articles.length){
	// 			return res.json(400,{error:{msg:'This article is the last one'}});
	// 		}
	// 		var aimNum=index+1;
	// 	}
	// 	Article.findOne({index},function (){

	// 	});
	// };
	Article.findById(id,function (err,article){
		if(err){ return handleError(res,err);}
		if(!article){return res.json(404,{error:{msg:'article not found'}});}
		Article.find(condition)
		.sort({index:1})
		.limit(parseInt(index)+1)
		.exec(function (err,articles){
			if(err){ return handleError(res,err);}
			var num=articles.indexOf(article);//当前文章的下标
			// console.log("num",num);
			if(state==1){
				if(num==0){
					return res.json(400,{error:{msg:'This article is the first article'}});
				}
				var aimNum=num-1;
			}else{
				if((num+1)==articles.length){
					return res.json(400,{error:{msg:'This article is the last one'}});
				}
				var aimNum=num+1;
			}
			return res.json(200,{
				article:articles[aimNum]
			});
		});
	});
	
};