Vue.component("friend_list",{
	props:['rightCurrContent','account'],
	data:function(){
		var data={
				comp_ident:null,//组件标识：contact:全部好友，，，recent:最近联系人
				friends:[
			
				         ],
				      itemSelected:null,
				         
		}
		return data;
	},
	ready:function(){
		//获取好友列表数据
		
	},
	template:loadHTML("components/friendlist_comp/friendlist_comp.html"),
	methods:{
		itemClick:function(a){
			
			if(a==null){
				this.itemSelected=null;
				return;
			}
			if(a!=null){
				this.$refs.system_msg_title_comp.selected=false;
			}
			this.itemSelected=a.$index;
			if(this.comp_ident=="contact"){
				var data={
				          show_page:"userinfo_comp",
				          opts:{
				        	  btn_msg:"发送消息",
				        	  friaccount:this.friends[a.$index].friaccount
				          }
				          
					};
				this.$emit("curr_right_content",data);
			}
		},
		
		init:function(flag,param){
			//初始化列表数据:flag:列表标识，，param：参数
			console.log("显示："+flag);
			if(flag=="recent"){
				sendRequest("getFriList_"+flag, "post", "json", true,param , function(data){
					console.log(data);
					
				}.bind(this));
			}
			if(flag=="contact"){
				sendRequest("getFriList_"+flag, "post", "json", true,param , function(data){
					if(data.data.length!=0){
						console.log(data);
						this.friends=[];
						for(var i=0;i<data.data.length;i++){
							this.friends.push({"username":data.data[i][1],"friaccount":data.data[i][0]});
						}
					}
					
					
				}.bind(this));
			}
			
			
			
		},
		set_right_panel:function(curr){
			//console.log("set_right_panel----friendlist:"+curr);
			this.$emit("curr_right_content",curr);
		},
		init_data:function(frilist){
			console.log("------friendlist------");
			console.log(frilist);
			this.friends=[];
			var frilistjson=JSON.parse(frilist);
			this.friends.push({"username":frilistjson.username,"friaccount":frilistjson.account});
		}
		
	}
	
	
});