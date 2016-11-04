
function sendRequest(url,type,dataType,async,data,callback){

	$.ajax({
		url:url,
		dataType:dataType,
		async:async,
		type:type,
		data:data,
		
		success:callback,
	
	});

}


function getAttr(attrName){
	var url=location.search;
	if(url==""){
		return;
	}
	url=url.replace("?","");
	console.log("url---:"+url);
	var attrArr=url.split("&");
	var datas={};
	for(var i=0;i<attrArr.length;i++){
		//console.log(attrArr[i]);
		var key=(attrArr[i].split("="))[0];
		
		var value=(attrArr[i].split("="))[1];
		//console.log(value);
		datas[key]=value;
	}
	//console.log();
	return datas[attrName];
}