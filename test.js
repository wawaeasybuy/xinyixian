var aString='a,bbb,aas,fd,wed,,fsd,a,bbb';
var _ = require('lodash');

var getNoRepeatArr=function (arr){
	var newArr=[];
	_.each(arr,function (a){
		if(newArr.indexOf(a)==-1){
			newArr.push(a);
		}
	});
	return newArr;
};

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

console.log('String',aString);
console.log('Arr',getTagArr(aString));