package com.me.controllers;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.me.bean.AjaxResp;
import com.me.entity.SystemMsg;
import com.me.service.ApplicationContextUtil;
import com.me.service.SystemMsgService;

@Controller
public class SystemMsgControler {

	@Autowired
	private SystemMsgService systemMsgService;
	@ResponseBody
	@RequestMapping("/getSystemMsgNoReadNum")
	public AjaxResp getSystemMsgNoReadNum(String account){
		//systemMsgService=(SystemMsgService)ApplicationContextUtil.getBean(SystemMsgService.class);
		AjaxResp ar=new AjaxResp();
		ar.setSuccess(true);
		
		
		int num=systemMsgService.getNoReadNumByAccount(account);
		ar.setData(num);
		return ar;
	}
	
	@RequestMapping("/getNoReadSystemMsg")
	@ResponseBody
	public AjaxResp getNoReadSystemMsg(String account){
		
		AjaxResp ar=new AjaxResp();
		ar.setSuccess(true);
		if("".equals(account) || account==null){
			ar.setSuccess(false);
			HashMap<String, Boolean> error=new HashMap<>();
			
			error.put("isEmpty", true);
			ar.setError(error);
			return ar;
		}
		List list=systemMsgService.getNoReadByAccount(account);
		ar.setData(list);
		return ar;
	}
	
	
	
}
