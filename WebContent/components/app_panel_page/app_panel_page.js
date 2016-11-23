Vue.component("app_panel", {
	props:['account'],
	data : function() {
		var data = {
			username : "小情歌",
		//	account:null,
			recent_icon : "images/chat_yes_icon.png",
			wenzhang_icon : "images/wenzhang_no_icon.png",
			contact_icon : "images/contact_no_icon.png",
			tabShowRecent : true,
			tabHideRecent : false,
			tabShowWenzhang : false,
			tabHideWenzhang : true,
			tabShowContact : false,
			tabHideContact : true,
			rightCurrContent:"logo_comp"

		}
		return data;
	},
	
	created : function() {
		console.log("创建主面板组件");
	},
	ready : function() {

		// 匹配到的搜索内容
		var content = [ {
			title : 'd'
		},

		];
		// 搜索框动态效果
		$('.contact_searchbar .ui.search').search({
			source : content,
			error : {
				noResults : '找不到匹配的结果'
			}

		});

		
	//	console.log(websocket);
		if(typeof(websocket)=="undefined"){
			//socket断开,重新连接
			console.log("重新建立socket连接");
			
				this.openSocket(this.account);
			
			
			
			
		}
		
		console.log("app_panel_page:");
		console.log(this);
		//默认显示最近联系人
		this.$refs.friend_list_recent.comp_ident="recent";
		this.tabItemClick("recent");
	},
	template : loadHTML("components/app_panel_page/app_panel_page.html"),
	events:{
		
	},
	methods : {
		set_right_panel:function(data){
			//console.log("set_right_panel----app:"+data);
			this.rightCurrContent=data.show_page;
			
			this.$nextTick(function(){
				//延迟回调，等待动态组件加载完毕传递初始化数据
				this.$refs.right_panel.init(data.opts);
				//this.$refs.right_panel.account=this.account;
			});
			
		},	
		
		tabItemClick : function(val) {
			console.log("------切换标签页------" + val);
			if (val == "recent") {
				// 显示最近联系人
				this.recent_icon = "images/chat_yes_icon.png";// 显示按下图标
				this.wenzhang_icon = "images/wenzhang_no_icon.png";
				this.contact_icon = "images/contact_no_icon.png";
				this.tabShowRecent = true;// 显示最近联系人选项卡
				this.tabHideRecent = false;
				this.tabShowWenzhang = false;
				this.tabhideWenzhang = true;
				this.tabShowContact = false;
				this.tabHideContact = true;
				this.$refs.friend_list_recent.comp_ident="recent";
				this.$refs.friend_list_recent.init(val,{"account":this.account});
			}
			if (val == "wenzhang") {
				// 显示最近联系人
				this.recent_icon = "images/chat_no_icon.png";// 显示按下图标
				this.wenzhang_icon = "images/wenzhang_yes_icon.png";
				this.contact_icon = "images/contact_no_icon.png";
				this.tabShowRecent = false;// 显示最近联系人选项卡
				this.tabHideRecent = true;
				this.tabShowWenzhang = true;
				this.tabhideWenzhang = false;
				this.tabShowContact = false;
				this.tabHideContact = true;
			}
			if (val == "contact") {
				// 显示全部好友
				this.recent_icon = "images/chat_no_icon.png";// 显示按下图标
				this.wenzhang_icon = "images/wenzhang_no_icon.png";
				this.contact_icon = "images/contact_yes_icon.png";
				this.tabShowRecent = false;// 显示最近联系人选项卡
				this.tabHideRecent = true;
				this.tabShowWenzhang = false;
				this.tabhideWenzhang = true;
				this.tabShowContact = true;
				this.tabHideContact = false;
				this.$refs.friend_list_all.comp_ident="contact";
				this.$refs.friend_list_all.init(val,{"account":this.account});
			}
		},
		changeIcon:function(){
			console.log("修改头像");
		},
		showAddFriPanel:function(){
			console.log("显示添加好友面板");
			this.rightCurrContent="addFriPanel";
		},
		openSocket:function(account){
			//打开websocket通道
			websocket_open(account,function(event){
				console.log("打开websocket通道");
			},function(event){
				//接收消息回调函数，将消息分发给子组件
				
				console.log("接收到消息：");
				//console.log(JSON.parse(event.data));
				var respDate=JSON.parse(event.data);
				if(respDate.datetype=="json"){
					if(respDate.resptype=="system"){
						//系统消息响应,将消息内容分发给组件
						console.log("------system----");
						console.log(JSON.parse(event.data));
						this.$refs.friend_list_recent.$refs.system_msg_title_comp.init(respDate.msgcontent);
						
					}
					if(respDate.resptype=="frilist_all"){
						console.log("------frilist_all----");
						console.log(JSON.parse(event.data));
						this.$refs.friend_list_all.init_data(respDate.msgcontent);
					}
					if(respDate.resptype=="frilist_recent"){
						console.log("------frilist_recent----");
						console.log(JSON.parse(event.data));
						this.$refs.friend_list_recent.init_data(respDate.msgcontent);
					}
				}
				
				
			}.bind(this));
		}
		

	}
});