package com.me.service;

import java.beans.IntrospectionException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.Gson;
import com.me.bean.AddFri;
import com.me.bean.JsonDateStructure;
import com.me.entity.SystemMsg;

import com.me.util.GetTIme;
import com.me.util.JsonUtil;
import com.me.util.MapUtil;

@Service
public class SystemMsgService {
	
	@Autowired
	private HibernateTemplate hibernateTemplate;

	@Transactional()
	public void saveSystemMsg(SystemMsg systemMsg) {
		System.out.println("-------插入数据-systemmsg");
		try {
			hibernateTemplate.save(systemMsg);
		} catch (Exception e) {
			System.out.println(e.toString());
		}
	}

	public void updateSystemMsg() {

	}
	
	//获取未读系统消息数
	public int getNoReadNumByAccount(String account){
		List list=hibernateTemplate.find("from SystemMsg where reciever='"+account+"' and isread=0");
		
		return list.size();
		}
	
	
	//读取未读系统消息
	public List getNoReadByAccount(String account){
		List list=hibernateTemplate.find("from SystemMsg where reciever='"+account+"' and isread=0");
		
		return list;
		}

}
