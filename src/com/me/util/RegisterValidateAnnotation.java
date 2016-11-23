package com.me.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import com.me.service.UserInfoService;

public class RegisterValidateAnnotation {

	@Autowired
	private UserInfoService userinfoserice;
	@Scheduled(fixedRate=1000*1800)
	public void deleNoValidateUser(){
		System.out.println("开启终端");
		userinfoserice.deleteUser();
	}
}
