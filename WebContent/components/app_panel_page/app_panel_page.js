Vue.component("app_panel", {
	data : function() {
		var data = {
			username : "小情歌",
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

	},
	template : loadHTML("components/app_panel_page/app_panel_page.html"),
	methods : {
		setRightPanel:function(curr){
			this.rightCurrContent=curr;
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
				// 显示最近联系人
				this.recent_icon = "images/chat_no_icon.png";// 显示按下图标
				this.wenzhang_icon = "images/wenzhang_no_icon.png";
				this.contact_icon = "images/contact_yes_icon.png";
				this.tabShowRecent = false;// 显示最近联系人选项卡
				this.tabHideRecent = true;
				this.tabShowWenzhang = false;
				this.tabhideWenzhang = true;
				this.tabShowContact = true;
				this.tabHideContact = false;
			}
		}

	}
});