Vue.component("userinfo_comp",{
	props:['account'],
	data:function(){
		var data={
				title:null,
				username:null,
				position:null,
				btn_msg:null,
				icon_src:null,
				friaccount:null
		}
		return data;
	},
	template:loadHTML("components/userinfo_comp/userinfo_comp.html"),
	methods:{
		init:function(data){
			//根据账号获取用户信息
			this.title="用户信息";	
			this.btn_msg=data.btn_msg;
			this.friaccount=data.friaccount;
			
			sendRequest("getUserInfo", "post", "json", true, {"account":data.friaccount}, function(data){
				if(data.success){
					this.username=data.data[0].username;
					this.position=data.data[0].city;
					if(data.data[0].sex=="男"){
						this.icon_src="images/man_icon.png";
					}else{
						this.icon_src="images/wman_icon.png";
					}
				}
				
			}.bind(this));
			
			
			
			
			
			
		},
		click:function(){
			if(this.btn_msg=="添加好友"){
				var msg={
						"sender":this.account,
						"reciever":this.friaccount,
						"type":"addfri",
						"msg":""
				};
				
				sendmsg(JSON.stringify(getDateStructure(this.account,this.friaccount, "json", "system", msg)));
			}
			if(this.btn_msg=="发送消息"){
				var data={
						show_page:"chat_panel_comp",
						opts:{
							title:this.username,
							friaccount:this.friaccount,
							
						}
				};
				this.$emit("curr_right_content",data);
			}
		}
		
	}
});