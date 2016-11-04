Vue.component("login_page",
		{
			data : function() {

				var data = {
					btnIsShow : {
						loginBtnDisplay : '',
						loadingBtnDisplay : '',
					},
					loginForm : {
						account : '',
						password : ''
					},
					errorIsShow : {
						accountDisplay : '',
						paswordDisplay : ''
					},
					error : {
						errorMsg_account : '',
						errorMsg_password : ''
					}

				}

				return data;
			},
			template : loadHTML("components/login_comp/Login.html"),
			methods : {
				loginbtnClick : function() {

					var me = this;
					if (this.loginForm.account == ""
							|| this.loginForm.account == null) {
						this.error.errorMsg_account = "您还没有输入账号！"
						this.errorIsShow.accountDisplay = "block";
						return;
					} else {
						this.error.errorMsg_account = "";
						this.errorIsShow.accountDisplay = "none";
					}
					if (this.loginForm.password == ""
							|| this.loginForm.password == null) {
						this.error.errorMsg_password = "您还没输入密码！";
						this.errorIsShow.paswordDisplay = "block";
						return;
					} else {
						this.error.errorMsg_password = "";
						this.errorIsShow.paswordDisplay = "none";
					}
					this.btnIsShow.loginBtnDisplay = "none";
					this.btnIsShow.loadingBtnDisplay = "block";
					// 表单数据
					var formData = {
						account : this.loginForm.account,
						password : this.loginForm.password
					}

					var callback = function(data) {

						console.log(data);

						if (data.success == true) {
							// 登录成功
							console.log("------登陆成功------");
							app.currContent = "app_panel";
							return;
						}
						if (data.success == false) {
							// 登录失败
							this.error.errorMsg_account = "登录失败！请检查";
							this.errorIsShow.accountDisplay = "block";
							console.log(this.error.errorMsg_account);
							this.btnIsShow.loadingBtnDisplay = "none";
							this.btnIsShow.loginBtnDisplay = "block";
						}
					}.bind(this);
					sendRequest("login", "post", "json", true, formData,
							callback);

				},
				registerBtnClick : function() {
					app.currContent = "register_page";
				}

			}

		});

function login_data() {

	var data = {
		btnIsShow : {
			loginBtnDisplay : '',
			loadingBtnDisplay : '',
		},
		loginForm : {
			account : '',
			password : ''
		},
		errorIsShow : {
			accountDisplay : '',
			paswordDisplay : ''
		},
		error : {
			errorMsg_account : "",
			errorMsg_password : ""
		}

	}

	return data;
}

