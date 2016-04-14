'use strict';

var _ = require('lodash');
var fs = require('fs');
var ImageGroup = require('../image-group/image-group.model');


exports.upload=function (req,res){
	var data = _.pick(req.body, 'type'), 
		file = req.files.file;

        console.log(file); //original name (ie: sunset.png)
        console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
        console.log(file.name);
        var filename=req.body.filename;
        console.log(filename);
        fs.rename(file.path,__dirname+"/../../../client/assets/upload/upload_images/"+filename,function(err){
			 if(err){
			    console.log("重命名失败！");
			    return res.json(400,{error:{msg:'图片上传失败'}});
			 }else{
			    console.log("重命名成功！");
			    return res.json(200,{msg:'图片上传成功'});
			 }
		});
    // console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
	// return res.json(200);
};	

exports.uploadToLib=function (req,res){
	var data = _.pick(req.body, 'type'), 
		file = req.files.file;

        console.log(file); //original name (ie: sunset.png)
        console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
        console.log(file.name);
        var filename=req.body.filename;
        var groupId=req.body.groupId;
        // console.log(__dirname+"/images/"+file[0].name);
        // console.log(__dirname+"/../../../client/assets/upload_iamges/");
        fs.rename(file.path,__dirname+"/../../../client/assets/upload/images_lib/"+filename,function(err){
			 if(err){
			    console.log("重命名失败！");
			    return res.json(400,{error:{msg:'图片上传失败'}});
			 }else{
			    console.log("重命名成功！");
			    ImageGroup.findById(groupId,function (err,group){
			    	if(err){ return handleError(res,err);}
					if(!group){return res.json(404,{error:{msg:'group not found'}});}
					group.images.unshift(filename);
					group.save(function (err,group){
						if(err){ return handleError(res,err);}
						return res.json(200,{msg:'图片上传成功'});
					});
			    });
			 }
		});
    // console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
	// return res.json(200);
};	
