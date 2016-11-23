Vue.component("addfri_item_comp", {
	props : [ 'sender', 'account' ],
	data : function() {
		return {
			agree_disabled : false,
			agree_show : true,
			span_btn_show : true,
			span_btn_disabled : false,
			tip:"残忍拒绝",
			tip_show:false,
			tip_disabled:true,

		};
	},
	ready : function() {

	},
	template : loadHTML("components/addfi_item_comp/addfi_item_comp.html"),
	methods : {
		refuse : function() {
			// 拒绝
			sendmsg(JSON.stringify(getDateStructure(this.account, this.sender,
					"json", "system", {
						"sender" : this.account,
						"reciever" : this.sender,
						"type" : "resp_addfri",
						"msg" : "refuse"
					})));
			this.agree_disabled = true;
			this.agree_show = false;
			this.span_btn_show=false;
			this.span_btn_disabled=true;
			this.tip="已拒绝";
			this.tip_show=true;
			this.tip_disabled=false;
		},
		agree : function() {
			// 同意
			sendmsg(JSON.stringify(getDateStructure(this.account, this.sender,
					"json", "system", {
						"sender" : this.account,
						"reciever" : this.sender,
						"type" : "resp_addfri",
						"msg" : "agree"
					})));
			
			
			this.agree_disabled = true;
			this.agree_show = false;
			this.span_btn_show=false;
			this.span_btn_disabled=true;
			this.tip="已同意";
			this.tip_show=true;
			this.tip_disabled=false;

		}
	}

});