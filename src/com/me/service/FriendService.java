package com.me.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.me.bean.AjaxResp;
import com.me.entity.Friends;
import com.me.entity.UserInfo;

@Service
public class FriendService {

	@Autowired
	HibernateTemplate hibernateTemplate;
	@Autowired
	UserInfoService userInfoService;

	public void getFriendById() {

	}

	public void addRecentList(int id) {
		
		String hql = "from ";
		
	}

	// 得到所有好友
	public List<?> getAllFriendsByAccount(String account) {
		int id = userInfoService.getUserIdByAccount(account);

		List<?> list = hibernateTemplate.find("select account,username from UserInfo where id in (select fid from Friends where uid="+id+") or id in (select uid from Friends where fid="+id+")");
	
		return list;
	}
	
	@Transactional
	public void addFriend(Friends fri){
		hibernateTemplate.save(fri);
	}

}
