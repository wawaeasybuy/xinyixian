'use strict';

var _ = require('lodash');
var fs = require('fs');



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
			 }else{
			    console.log("重命名成功！");
			 }
		});
    // console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
	return res.json(200);
};	

exports.uploadToLib=function (req,res){
	var data = _.pick(req.body, 'type'), 
		file = req.files.file;

        console.log(file[0]); //original name (ie: sunset.png)
        console.log(file[0].path); //tmp path (ie: /tmp/12345-xyaz.png)
        console.log(file[0].name);
        var filename=req.body.filename;
        // console.log(__dirname+"/images/"+file[0].name);
        // console.log(__dirname+"/../../../client/assets/upload_iamges/");
        fs.rename(file[0].path,__dirname+"/../../../client/assets/upload/images_lib/"+filename,function(err){
			 if(err){
			    console.log("重命名失败！");
			 }else{
			    console.log("重命名成功！");
			 }
		});
    // console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
	return res.json(200);
};	
