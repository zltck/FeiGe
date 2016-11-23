package com.me.controllers;

import java.util.HashMap;
import java.util.List;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;

import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.me.bean.AjaxResp;
import com.me.entity.UserInfo;
import com.me.service.SendEmailService;
import com.me.service.UserInfoService;
import com.me.util.DataValidate;
import com.me.util.GetRandomStr;
import com.me.util.GetTIme;

import antlr.StringUtils;

@Controller
public class UserController {

	@Autowired
	private UserInfoService userInfoService;
	@Autowired
	private SendEmailService sendEmailService;

	private Logger logger = Logger.getLogger(UserController.class);

	@RequestMapping("/getUserInfo")
	@ResponseBody
	public AjaxResp getUserInfo(String account){
		AjaxResp ar=new AjaxResp();
		ar.setSuccess(true);
		
		List list=userInfoService.getUserByAccount(account);
		if(list.isEmpty()){
			ar.setSuccess(false);
			return ar;
		}
		ar.setData(list);
		return ar;
	}
	
	

	@RequestMapping("/login")
	@ResponseBody()
	public AjaxResp login(String account, String password,HttpSession session) {
		logger.debug("得到用户名：" + account + "，和密码：" + password);
		
		AjaxResp ar = new AjaxResp();
		HashMap<String, Object> errorInfo = new HashMap<>();
		ar.setError(errorInfo);
		ar.setSuccess(false);
		if ("".equals(account) || "".equals(password) || null==account || null==password) {
			errorInfo.put("empty", true);
			return ar;
		}
		List list = userInfoService.getUserByAccount(account);
		if (list.size() == 0) {
			errorInfo.put("noExist", true);
			return ar;
		}
		if (((UserInfo) list.get(0)).getIsvalidate() == 0) {
			errorInfo.put("isvalidate", false);//是否已验证
		}
		if (!((UserInfo) list.get(0)).getAccount().equals(account) || !((UserInfo) list.get(0)).getPassword().equals(password)) {
			errorInfo.put("msg", "账号或密码错误");
		}
		 else {
			ar.setSuccess(true);
			UserInfo user = new UserInfo();
			user.setAccount(account);
			ar.setData(user);
			session.setAttribute("account", account);
		}
		return ar;
	}

	@RequestMapping("/curr")
	@ResponseBody()
	public AjaxResp curr(HttpSession session) {

		String account = (String) session.getAttribute("account");
		if ("".equals(account) || account == null) {
			return new AjaxResp(false);
		}
		AjaxResp ar = new AjaxResp(true);
		ar.setData(account);
		return ar;

	}

	@RequestMapping("/register")
	@Transactional()
	@ResponseBody()
	public AjaxResp register(String account, String password, String username, String email,String sex,String city, HttpSession session) {
		
		System.out.println("得到注册表单数据："+account+" "+password+" "+username+" "+email+" "+sex+" "+city+" ");
		UserInfo user = new UserInfo();
		
		
		AjaxResp ar = new AjaxResp();
		ar.setSuccess(false);
		
		HashMap<String , Object> errorMsg=new HashMap<>();
		ar.setError(errorMsg);
		if ("".equals(account) || null == account || "".equals(password) || null == password || "".equals(username) || null == username || "".equals(email) || null == email ) {
			System.out.println("存在注册表单数据为空："+account+" "+password+" "+username+" "+email);
			errorMsg.put("empty", true);
			return ar;
		}
		if (userInfoService.UserIsExist(account)) {
			errorMsg.put("exist", true);
		}
		
		if ("".equals(email) || null == email || !DataValidate.val_email(email)) {
			errorMsg.put("emailError", true);//邮箱格式错误
		}
		if(errorMsg.size()>0){
			return ar;
		}
		user.setAccount(account);
		user.setPassword(password);
		user.setEmail(email);
		user.setIsvalidate(0);
		user.setUsername(username);
		user.setRegistertime(GetTIme.getNowTime());
		user.setSex(sex);
		user.setCity(city);
		user.setHidden(0);//默认显示位置信息
		String code = GetRandomStr.encodeToHex(account + GetTIme.getNowTime());
		user.setMd5(code);
		// 发送验证邮件

		StringBuffer content = new StringBuffer("您好：" + username + "，请点击下面的链接完成账号注册，链接只能使用一次，半小时内有效，请尽快激活！！</br>");
		content.append("<a style='font-size:25px;color:red;' href='http://127.0.0.1:8080/FeiGe/main.html?curr=regvalidate&code="+code+"'/>我要激活</a>");

		// 发送
		int EmailFlag = sendEmailService.send(email, content.toString());
		if (EmailFlag == 1) {
			errorMsg.put("emailSendError", true);//邮件发送失败
		}
		try {
			userInfoService.save(user);
			user.setAccount(account);
			ar.setSuccess(true);
			//session.setAttribute("account", account);
			ar.setData(user);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			errorMsg.put("dataInsertError", true);
			
		}
		return ar;

	}
	
	
	@RequestMapping("/registerValidate")
	@Transactional()
	@ResponseBody()
	public AjaxResp  registerValidate(String code){
		AjaxResp ar=new AjaxResp();
		HashMap<String, Object> errorMsg=new HashMap<>();
		ar.setError(errorMsg);
		logger.debug("注册验证----秘钥："+code);
		List list=userInfoService.getUser("from UserInfo where md5='"+code+"'");
		if(list.isEmpty()){
			//未找到用户
			ar.setSuccess(false);
			errorMsg.put("empty", true);
			return ar;
			//return "redirect:main.html?currContent=registerValidate_page&account="+account+"&result=error&errormsg=用户不存在！";
		}
		UserInfo user=(UserInfo)list.get(0);
		
		
		user.setIsvalidate(1);
		userInfoService.update(user);
		ar.setSuccess(true);
		ar.setData(user.getAccount());
		//return ar;
		
		
		
		
		return ar;
		//return "redirect:main.html?currContent=registerValidate_page&account="+account+"&result=error&errormsg=";
	}
	

	

}
