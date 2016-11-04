$(document).ready(function(){

	
	
	Vue.component("login_page",{
		data:function(){
			return {error:"错误"}
		},
		template:"<a href='baidu.com'>baidu</a>{{error}}"
	});
	
	
	new Vue({
		el:"#root"
		
	});
	
	
});

