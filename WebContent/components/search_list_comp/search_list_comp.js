Vue.component("search_list_comp", {
	data : function() {
		var data = {
			searchKey : null,
			items : [],
			nodata : null,
			nodata_show : false,
			nodata_hidden : true
		};
		return data;
	},
	ready : function() {

	},
	template : loadHTML("components/search_list_comp/search_list_comp.html"),
	methods : {

		getdata_account : function(param) {
			this.nodata_show = false;
			this.nodata_hidden = true;
			if (param == null || param == "") {
				this.items = [];
				this.nodata_show = false;
				this.nodata_hidden = true;
				return;
			}
			console.log(param);
			// 账号精确查找
			sendRequest("searchfri_account", "post", "json", true, {
				"account" : param
			}, function(data) {
				console.log("-------账号查找回调-------：");
				console.log(data);
				this.items = [];
				if (data.success) {
					// 显示搜索结果，注入数据
					console.log("---------items.length:" + this.items.length);
					this.items.push({
						"account" : data.data.account,
						"username" : data.data.username,
						"sex" : data.data.sex,
						"city" : data.data.city
					});

					for (var j = 1; j < data.length; j++) {
						this.items.push({
							"account" : data[j].account,
							"username" : data[j].username,
							"sex" : data[j].sex,
							"city" : data[j].city
						});
					}

				} else {
					this.items = [];
					this.nodata = "暂无数据..";
					this.nodata_show = true;
					this.nodata_hidden = false;

				}
			}.bind(this));
		},
		choice : function(item) {
			//构造好友信息面板初始化数据
			var data = {
					opts:{
						"friaccount":this.items[item.$index].account,
		            	 "username":this.items[item.$index].username,
		            	 "sex":this.items[item.$index].sex,
		            	 "city":this.items[item.$index].city,
		            	 "btn_msg":"添加好友",
					},
					
					show_page:"userinfo_comp"
			};
			this.$emit("curr_right_content", data);
		},
		getdata_username : function(param) {
			this.nodata_show = false;
			this.nodata_hidden = true;
			if (param == null || param == "") {
				this.items = [];
				this.nodata_show = false;
				this.nodata_hidden = true;
				return;
			}
			// 用户名关键字模糊查询
			sendRequest("searchfri_key", "post", "json", true, {
				"key" : param
			}, function(data) {
				console.log("-------关键字查找回调-------：");
				this.items = [];
				console.log(data);
				if (data.success) {
					// 显示搜索结果，注入数据

					for (var i = 0; i < data.data.length; i++) {
						this.items.push({
							"account" : data.data[i].account,
							"username" : data.data[i].username,
							"sex" : data.data[i].sex,
							"city" : data.data[i].city
						});
					}

				} else {
					this.items = [];
					this.nodata = "暂无数据..";
					this.nodata_show = true;
					this.nodata_hidden = false;
				}
			}.bind(this));
		}
	}

});