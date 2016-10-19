var btnIsShowData={
	loginBtnDisplay:'',
	loadingBtnDisplay:'',
}
var loginFormData={
		account:'',
		password:''
}
var errorIsShowData={
		accountDisplay:'',
		paswordDisplay:''
}
$(document).ready(function(){
		new Vue({
			el:"#login_panel",	
			data:{
				btnIsShow:btnIsShowData,
				loginForm:loginFormData	,
				errorIsShow:errorIsShowData
			},
			methods:{
				loginbtnClick:function(){
						
					
					if(loginFormData.account=="" || loginFormData.account==null){
						errorIsShowData.accountDisplay="block";
						return;
					}else{
						errorIsShowData.accountDisplay="none";
					}
					if(loginFormData.password=="" || loginFormData.password==null){
						errorIsShowData.paswordDisplay="block";
						return;
					}else{
						errorIsShowData.paswordDisplay="none";
					}
					btnIsShowData.loginBtnDisplay="none";
					btnIsShowData.loadingBtnDisplay="block";
					
					
					
				}
			}
			
		});
		
	
	
});