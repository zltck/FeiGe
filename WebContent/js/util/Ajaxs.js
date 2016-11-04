
function sendRequest(url,type,data,callback){

	$.ajax({
		url:url,
		type:type,
		data:data,
		
		success:callback,
	
	});

}