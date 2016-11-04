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
	ready:function(){
		//下拉框样式
		$('.ui.styled.accordion')
		  .accordion({
		    selector: {
		      trigger: '.title .icon'
		    }
		  });
		//滑动按钮样式
		$('.ui.toggle.checkbox')
		  .checkbox()
		;
		
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
				var success=data.success;
				var title;
				var header;
				var description;
				var btn_msg;
				if(success){
					//注册成功,初始化提示框内容
						
					//弹出提示框
					title="恭喜您，注册成功了，请前往指定邮箱账户进行确认。。。";
					header="aaa";
					description="请于三十分钟内进行邮箱验证，过期讲删除注册信息！！";
					btn_msg="确认";
					app.$refs.dimmer.hide(false,true);
					app.$refs.modal.showModal(title,header,description,btn_msg);	
				}else{
					title="很遗憾，注册失败了";
					header="错误信息：";
					description="1.";
					btn_msg="确认";
					console.log("父类组件"+this.$refs);
					app.$refs.dimmer.hide(false,true);
					app.$refs.modal.showModal(title,header,description,btn_msg);
				}
				
				console.log(data);
			}
			sendRequest("register", "post","json",true, formDatas, callback);
			app.$refs.dimmer.show("正在注册...",true,false);
			
			
		},
		loginBtnClick:function(){
			app.currContent="login_page";
		}
		
	}
	
	
});

