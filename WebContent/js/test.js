window.onload=function(){
	var MyComPonent=Vue.extend({
		template:'<div>sssssssss</div>'
	});
	
	Vue.component('my-component',MyComPonent);
	new Vue({
		el:'#ex'
	});
	
	
}