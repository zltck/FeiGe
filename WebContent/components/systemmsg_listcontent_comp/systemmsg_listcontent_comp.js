Vue.component(
				"systemmsg_listcontent_comp",
				{
					props : [ 'account' ],
					data : function() {
						return {
							items : [

							],
							sender:null,
							resp_data:null

						};
					},
					template : loadHTML("components/systemmsg_listcontent_comp/systemmsg_listcontent_comp.html"),

					ready : function() {

						sendRequest(
								"getNoReadSystemMsg",
								"post",
								"json",
								false,
								{
									"account" : this.account
								},
								function(data) {
									console.log(data);
									this.resp_data=data.data;
									for (var i = 0; i < data.data.length; i++) {
										if (data.data[i].type == "addfri") {
											this.sender=data.data[i].sender;
											console.log("------systemmsg_content_comp:渲染添加好友模版");
											this.items.push({
												"item" : "addfri_item_comp"
											});
												

										}
										if (data.data[i].type == "broadcast") {
											this.sender=data.data[i].sender;
											this.items.push({
												"item" : "broadcast_item_comp"
											});
											
										}
										

									}
								}.bind(this));
					},
					methods : {
						init : function() {

						},

					}

				});