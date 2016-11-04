Vue.component("register_page",{
	data:function(){
		data={		
			account:{
				isShow:false,
				isHidden:true,
				formData:''
					},
			username:{
				isShow:false,
				isHidden:true,
					formData:''
					},
			password:{
				isShow:false,
				isHidden:true,
					formData:''
                 	},
            repassword:{
            	isShow:false,
				isHidden:true,
				formData:''
            			},
            email:{
            	isShow:false,
				isHidden:true,
				formData:''
            	},
            agree:{
            	isShow:false,
				isHidden:true,
				formData:''
            }
			}
		return data;
	},
	template:loadHTML("components/register_comp/Register.html"),
	methods:{
		btn_click:function(){
			if(this.account.formData=="" || this.account.formData==null || isNaN(this.account.formData) || this.account.formData.length<6 || this.account.formData.length>10){
				this.account.isShow=true;
				this.account.isHidden=false;
				return;
			}else{
				
				this.account.isShow=false;
				this.account.isHidden=true;
			}
			if(this.password.formData=="" || this.password.formData==null){
				this.password.isShow=true;
				this.password.isHidden=false;
				return;
			}else{
				this.password.isShow=false;
				this.password.isHidden=true;
			}
			if(this.repassword.formData!=this.password.formData){
				this.repassword.isShow=true;
				this.repassword.isHidden=false;
				return;
			}else{
				this.repassword.isShow=false;
				this.repassword.isHidden=true;
			}
			if(this.username.formData=="" || this.username.formData==null){
				this.username.isShow=true;
				this.username.isHidden=false;
				return;
			}else{
				this.username.isShow=false;
				this.username.isHidden=true;
			}
			if(this.email.formData=="" || this.email.formData==null){
				this.email.isShow=true;
				this.email.isHidden=false;
				return;
			}else{
				this.email.isShow=false;
				this.email.isHidden=true;
			}
			if(this.agree.formData==false){
				this.agree.isShow=true;
				this.agree.isHidden=false;
				return;
			}else{
				this.agree.isShow=false;
				this.agree.isHidden=true;
			}
			
			var formDatas={
					account:this.account.formData,
					password:this.password.formData,
					username:this.username.formData,
					email:this.email.formData
			}
			var callback=function(data){
				
			}
			sendRequest("register", "post", formDatas, callback);
			
		}
		
	}
	
	
});

