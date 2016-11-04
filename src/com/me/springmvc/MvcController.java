package com.me.springmvc;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MvcController {
	@RequestMapping("/login")
	public void login(String account,String password,PrintWriter pw){
		System.out.println("得到用户名："+account+"，和密码："+password);
		if(account.equals("123") && password.equals("123")){
			pw.print(0);//登录成功
			return;
		}
		pw.print(1);
	}
	@RequestMapping("/register")
	public void register(String account,String password,String username,String email){
		
	}

	
}
