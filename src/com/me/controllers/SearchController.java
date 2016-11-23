package com.me.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.me.bean.AjaxResp;
import com.me.service.UserInfoService;

@Controller
public class SearchController {

	@Autowired
	private UserInfoService userInfoService;
	
	@RequestMapping("/searchfri_account")
	@Transactional
	@ResponseBody
	public AjaxResp searchfri_account(String account){
		System.out.println("搜索");
		AjaxResp ar=new AjaxResp();
		ar.setSuccess(true);
		if("".equals(account) || null==account){
			ar.setSuccess(false);
			return ar;
		}
		List list=userInfoService.getUserByAccount(account);
		if(list.isEmpty()){
			//无用户
			ar.setSuccess(false);
			return ar;
		}
		
		ar.setData(list.get(0));
		return ar;
	}
	
	
	@RequestMapping("/searchfri_key")
	@ResponseBody
	@Transactional
	public AjaxResp search_key(String key){
		AjaxResp ar=new AjaxResp();
		ar.setSuccess(true);
		if("".equals(key) || null==key){
			ar.setSuccess(false);
			return ar;
		}
		List list=userInfoService.getUser("from UserInfo where username like '%"+key+"%'");
		if(list.isEmpty()){
			//无用户
			ar.setSuccess(false);
			return ar;
		}
		ar.setData(list);
		return ar;
	}
}
