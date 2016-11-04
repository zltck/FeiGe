

function loadHTML(url){
//	alert("加载html");
	var html;
	$.ajax({
	url:url,
	async:false,
	type:"post",
	success:function(data){
		html=data;
	}
		
	});
	
	
	return html;
}