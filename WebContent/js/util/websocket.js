var websocket;


function websocket_open(account,fun_onopen,fun_onmessage){
	websocket=new WebSocket("ws://127.0.0.1:8080/FeiGe/websocketserver?account="+account);
	websocket.onopen=fun_onopen
	websocket.onmessage=fun_onmessage
}


function sendmsg(data){
	console.log("即将发送数据：");
	console.log(JSON.stringify(data));
	websocket.send(data);
}

function getDateStructure(sender,receiver,datetype,reqtype,msgctent){
	return {
		"sender":sender,
		"receiver":receiver,
		"datetype":datetype,
		"reqtype":reqtype,
		"msgcontent":msgctent
	};
	
}