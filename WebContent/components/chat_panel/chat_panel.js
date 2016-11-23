Vue.component("chat_panel_comp",{
	props:['account'],
	data:function(){
		
		return {
			title:"aaa"
			
		};
	},
	template:loadHTML("components/chat_panel/chat_panel.html"),
	ready:function(){
		
	},
	methods:{
		init:function(data){
			console.log(data);
			this.title=data.title;
		}
	}
});