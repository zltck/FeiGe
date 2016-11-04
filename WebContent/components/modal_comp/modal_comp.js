Vue.component("modal_comp", {
	//props : [ "modalTitle", "modalHeader", "modalDescription", "modalBtnMsg" ],
	data : function() {

		data = {
				modalTitle:null,
				modalHeader:null,
				modalDescription:null,
				modalBtnMsg:null
		}
		return data;
	},
	ready : function() {

	},
	template : loadHTML("components/modal_comp/modal_comp.html"),
	methods : {
		showModal : 
			 function(title,header,description,btn_msg) {
					console.log("弹出层参数传递---"+title+" "+header+" "+description+" "+btn_msg);
					
					this.modalTitle = title;
					this.modalHeader=header;
					this.modalDescription=description;
					this.modalBtnMsg=btn_msg;
					
					
				
			
			$('.ui.modal').modal('show');

		}

	}
});