
//系统消息组件
Vue.component("system_msg_title_comp",{
	props:['account'],
	data:function(){
		return {
			simple_msg:null,
			curr_content:null,
			selected:false,
			num:0,
			is_show:false,
			is_hidden:true
			
		};
	},
	ready:function(){
		//组件加载初始化数据,x从服务器获取此用户相关的未读系统消息数目并显示最新一条
		sendRequest("getSystemMsgNoReadNum", "post", "json", "true", {"account":this.account}, function(data){
			console.log(data.data);
			if(data.data==0){
				
				return;
			}
			this.is_hidden=false;
			this.is_show=true;
			this.num=data.data;
		}.bind(this));
	},
	template:loadHTML("components/system_msg_title_comp/system_msg_title_comp.html"),
	methods:{
		init:function(data){
			
			data=JSON.parse(data);
			//console.log(data);
			this.is_hidden=false;
			this.is_show=true;
			this.num+=1;
			if(data.type=="addfri"){
				//系统消息为加好友请求
				//构建提示消息
				this.simple_msg=data.sender+"请求加您为好友";
				
			}
			
		},
		
		click:function(){
			//查看系统消息
			this.num=0;
			this.is_show=false;
			this.is_hidden=true;
			this.selected=true;
			this.curr_content="addfri";
			var data = {
					opts:{
						"num":5,//未读系统消息数
					},
					
					show_page:"systemmsg_listcontent_comp"
			};
			
			this.$emit("friend_list",null);
			this.$emit("curr_right_content",data);
			
			
		}
	}
});