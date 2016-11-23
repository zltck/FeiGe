Vue.config.debug = true;
Vue.config.devtools = true;

$(document).ready(function() {
	function isLogin() {
		var islogin;
		sendRequest("curr", "post", "json", false, {}, function(data) {
			islogin = data;

		});
		console.log( islogin);
		return islogin;
	}

	window.app = new Vue({
		el : 'body',
		data : {
			currContent : null,
			// textMsg : null,
			account:null,
			modalTitle : null,
			modalHeader : null,
			modalDescription : null,
			modalBtnMsg : null
		},
		created : function() {

		},
		compiled : function() {

		},
		ready : function() {
			
			// 获得url参数
			console.log(getAttr("curr"));
			if (getAttr("curr") != null) {
				this.currContent = getAttr("curr");
				return;
			}

			// 检测用户是否登录

			var islogin = isLogin();

			if (islogin.success == false) {
				// 未登录
				console.log("未登录");
				this.currContent = "login_page";
			} else {
				console.log("已登录");
				console.log(islogin.data);
				
				this.currContent = "app_panel";
				this.account=islogin.data;
				
				
			}

			
			
			
		},
		methods : {
			
		}
	});
});

