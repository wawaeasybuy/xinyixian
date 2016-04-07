'use strict';

var _ = require('lodash');
var ImageGroup = require('./image-group.model');
var User = require('../user/user.model');

var handleError = function (res, err) {
  console.log(err);
  return res.send(500, err);
}

var getNoRepeatArr=function (arr){
	var newArr=[];
	_.each(arr,function (a){
		if(newArr.indexOf(a)==-1){
			newArr.push(a);
		}
	});
	return newArr;
};

//create imageGroup
exports.create=function (req,res){
	var name=req.body.name;
	if(!name){return res.json(400,{error:{msg:'name is required'}});}
	var detail={
		name:name,
		images:[],
		createDate:new Date()
	};
	ImageGroup.create(detail,function (err,group){
		if(err){ return handleError(res,err);}
		return res.json(200,{group:group});
	});
};


//update 
exports.update=function (req,res){
	var id=req.params.id;
	var groupDetails=_.pick(req.body,'name','images');
	ImageGroup.findById(id,function (err,group){
		if(err){ return handleError(res,err);}
		if(!group){return res.json(404,{error:{msg:'group not found'}});}
		if(group.sgin==1){
			groupDetails=_.pick(groupDetails,'images');
		}
		group=_.assign(group,groupDetails);
		group.save(function (err,group){
			if(err){ return handleError(res,err);}
			return res.json(200,{group:group});
		});
	});
};


//移动图片分组A->B  A->B  
exports.move=function (req,res){
	var id=req.params.id;//A._id
	var aimId=req.body.id;//B._id
	var images=req.body.images;
	if(!images){return res.json(400,{error:{msg:'images is required'}});}
	if(!aimId){return res.json(400,{error:{msg:'id is required'}});}
	ImageGroup.findById(id,function (err,group1){
		if(err){ return handleError(res,err);}
		if(!group1){return res.json(404,{error:{msg:'group not found'}});}
		ImageGroup.findById(aimId,function (err,group2){
			if(err){ return handleError(res,err);}
			if(!group2){return res.json(404,{error:{msg:'group not found'}});}
			_.each(images,function (image){
				group1.images.pull(image);
				group2.images.push(image);
			});
			group1.images=getNoRepeatArr(group1.images);
			group2.images=getNoRepeatArr(group2.images);
			group1.save();
			group2.save();
			return res.json(200,{msg:'move success'});
		});
	});
};

//delete 
exports.destory=function (req,res){
	var id=req.params.id;
	ImageGroup.findById(id,function (err,group1){
		if(err){ return handleError(res,err);}
		if(!group1){return res.json(404,{error:{msg:'group not found'}});}
		if(group1.sign==1){ return res.json(400,{error:{msg:'defalut group can not delete'}});}
		ImageGroup.findOne({sign:1},function (err,group2){
			if(err){ return handleError(res,err);}
			if(!group2){return res.json(404,{error:{msg:'defalut group not found'}});}
			_.each(group1.images,function (image){
				group2.images.push(image);
			});
			group2.images=getNoRepeatArr(group2.images);
			group1.remove();
			group2.save();
			return res.json(200,{msg:'delete success'});
		});
	});
};

//index
exports.index=function (req,res){
	var page = req.query.page || 1,
    	itemsPerPage = req.query.itemsPerPage || 10;
    var count;
    ImageGroup.find({}).count(function (err,c){
    	if(err){ return handleError(res,err);}
    	count=c;
    });
    ImageGroup.find({},{},{
    	skip: (page - 1) * itemsPerPage,
        limit: itemsPerPage
    })
    .exec(function (err,groups){
    	if(err){ return handleError(res,err);}
    	return res.json(200,{
    		groups:groups,
    		count:count,
    		page:page
    	});
    });
};