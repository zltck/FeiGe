<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/vue.js"></script>
<link rel="stylesheet" type="text/css" href="css/semantic.min.css">
<link rel="stylesheet" type="text/css" href="css/login.css">
<script src="js/semantic.min.js"></script>
<script src="js/login.js"></script>

<title>【飞鸽登陆】欢迎使用飞鸽即时聊天系</title>
</head>
<body>
	
		<div class="login_panel" id="login_panel">
			<h2 class="ui dividing header">Login</h2>					
			<form class="ui form">
			<div class="accountPanel">
				<div class="input_panel">
				<input id="account" v-model="loginForm.account" type="text" id="account" class="ui corner labeled input" placeholder="请输入账号">
					<a href="getAccountByEmail.jsp">忘记账号？</a>
				</div>
					<div class="ui pointing label" v-bind:style="{display:errorIsShow.accountDisplay}">
     				 您还没有输入账号！
    				</div>
			
			</div>
			<div class="passwordPanel">
				<div class="input_panel">
				
				<input v-model="loginForm.password" type="password" id="password" class="ui corner labeled input" placeholder="请输入密码">
				
				<a href="getPasswordByEmail.jsp">忘记密码？</a>
				</div>
					<div class="ui pointing label" v-bind:style="{display:errorIsShow.paswordDisplay}">
     				 您还没有输入密码！
    			</div>
			
			</div>
				<input v-on:click="loginbtnClick" v-bind:style="{display:btnIsShow.loginBtnDisplay}" type="button" class="ui primary button" value="登录">
  				<button v-bind:style="{display:btnIsShow.loadingBtnDisplay}" class="ui primary loading button" disabled="disabled">Loading</button>	
			
			</form>
		</div>
	
</body>
</html>