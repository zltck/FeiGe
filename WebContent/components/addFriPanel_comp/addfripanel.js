Vue.component("addFriPanel", {
	data : function() {
		var data = {
			searchKey : null,
			flag : true,
			timmerHandle : null,
			resultTitleShow : false,
			resultTitleHidden : true
		};
		return data;
	},
	template : loadHTML("components/addFriPanel_comp/addfripanel.html"),
	methods :
	{
		set_right_panel:function(data){
			console.log(data);
			//this.rightCurrContent=curr;
			this.$emit("curr_right_content",data);
		},
		keyup : function() {
			if (this.timmerHandle) {
				clearTimeout(this.timmerHandle);
			}
			if (this.searchKey == null || this.searchKey == "") {
				// 清除搜索结果
				console.log("关键字为空");
				this.resultTitleShow = false;
				this.resultTitleHidden = true;
				this.$refs.search_list_account.items=[];
				this.$refs.search_list_key.items=[];
				this.$refs.search_list_account.nodata_show=false;
				this.$refs.search_list_key.nodata_show=false;
				this.$refs.search_list_account.nodata_hidden=true;
				this.$refs.search_list_key.nodata_hidden=true;
				return;
				
			}

			this.timmerHandle = setTimeout(function() {
				console.log("发送请求");
				this.resultTitleShow = true;
				this.resultTitleHidden = false;
				this.$refs.search_list_account.getdata_account(this.searchKey);
				this.$refs.search_list_key.getdata_username(this.searchKey);

			}.bind(this), 1000);
		}

	}

});