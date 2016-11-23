package com.me.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.me.bean.AjaxResp;
import com.me.service.FriendService;
@Controller
public class FriendsController {
	
	@Autowired
	FriendService friendService;
	
	@RequestMapping("/getFriList_recent")
	@ResponseBody
	public AjaxResp getRecentFriList(String account){
		AjaxResp ar=new AjaxResp();
		return ar;
	}
	
	@RequestMapping("/getFriList_contact")
	@ResponseBody
	public AjaxResp getAllFriends(String account){
		AjaxResp ar=new AjaxResp();
		ar.setSuccess(true);
		List list=friendService.getAllFriendsByAccount(account);
		ar.setData(list);
		return ar;
	}
	
}
