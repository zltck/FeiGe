Vue.component("active_inverted_dimmer",{
	data:function(){
		var data={
				loading_msg:null,
				dimmer_disabled:true,
				dimmer_active:false,
		}
		return data;
	},
	ready:function(){
		
	},
	template:loadHTML("components/loading_comp/loading_comp.html"),
	methods:{
		show:function(msg,show,hidden){
			console.log("------显示遮罩层："+msg);
			this.loading_msg=msg
			this.dimmer_disabled=hidden;
			this.dimmer_active=show;
		},
		hide:function(show,hidden){
			console.log("------隐藏遮罩层：");
			this.loading_msg=null;
			this.dimmer_disabled=hidden;
			this.dimmer_active=show;
		}
		
	}
	
});