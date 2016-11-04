Vue.component(
				"regvalidate",
				{
					data : function() {
						var data = {
							header : null,
							account : null,
							msg : null,
							result:null,
							icon_src:null,
							red_src:null
							
						}
						return data;
					},
					
					template : loadHTML("components/registerValidate_comp/registerValidate_comp.html"),
					created:function(){
						console.log("created");
					},
					ready : function() {
						console.log("ready");
						var reqData = {
							"code" : getAttr("code")
						}
						sendRequest("registerValidate", "post", "json", false,
								reqData, function(data) {
							console.log(this);
									msg="sssssssssss";
									console.log(data+"  "+msg);
									if (data.success) {
										// 验证成功
										
										this.icon_src="images/success_icon.png";
										this.header = "恭喜您，注册成功了：";
										this.account = data.data;
										this.red_src="main.html";
										this.result="点击跳转";
										var i = 5;
										
										//this.reslut="";
										
										var timmer = setInterval(function() {
											this.msg = "将在" + i + "秒后返回首页";
											i--;
											if (i == 0) {
												//window.location.href="main.html";
												clearInterval(timmer);
											}
										}, 1000);

									} else {
										this.icon_src="images/error_icon.png";
										this.header = "很遗憾，注册失败了：";
										this.msg = "您未在指定时间内进行邮箱校验，请重新注册";
										this.result="重新注册";
										this.red_src="main.html?curr=register_page";
										
										
									}

								}.bind(this))

					},
					methods : {

					}

				});