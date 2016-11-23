package com.me.service;

import java.util.List;

import org.hibernate.FlushMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.me.entity.UserInfo;

@Service()
public class UserInfoService {

	@Autowired
	private HibernateTemplate hibernateTemplate;

	public List getUserByAccount(String account) {

		String hql = "from UserInfo where account='" + account + "'";

		List list = hibernateTemplate.find(hql);
		return list;

	}

	@Transactional(propagation = Propagation.REQUIRED)
	public void save(UserInfo user) throws Exception {

		hibernateTemplate.save(user);
	}
	
	//指定用户是否已存在用户表中
	public boolean UserIsExist(String account){
		String hql="from UserInfo where Account='"+account+"'";
		List list=hibernateTemplate.find(hql);
		if(list.size()==0){
			return false;
		}
		else{
			return true;
		}
	}
	
	public void deleteUser(){
		
		List list=hibernateTemplate.find("from UserInfo where isvalidate=0");
		hibernateTemplate.deleteAll(list);
	}
	public void update(UserInfo user){
		hibernateTemplate.update(user);
	}
	//根据查询字符串查找用户
	public List getUser(String hql){
		List list=hibernateTemplate.find(hql);
		return list;
	}
	public int getUserIdByAccount(String account){
		List list=hibernateTemplate.find("from UserInfo where account='"+account+"'");
		if(list.isEmpty()){
			return -1;//未找到
		}
		return ((UserInfo)list.get(0)).getId();
	}

}
