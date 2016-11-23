package com.me.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.me.util.JsonUtil;

@Service
public class WebSocketHandler implements org.springframework.web.socket.WebSocketHandler {

	
	//已连接用户表
	public static final HashMap<String,WebSocketSession> userlist=new HashMap<String, WebSocketSession>();
	@Override
	public void afterConnectionClosed(WebSocketSession arg0, CloseStatus arg1) throws Exception {
		// TODO Auto-generated method stub
		String account=(arg0.getUri().toString()).split("=")[1];
		System.out.println("用户退出系统："+account);
		userlist.remove(account);
		
	}
	

	@Override
	public void afterConnectionEstablished(WebSocketSession arg0) throws Exception {
		// TODO Auto-generated method stub
	//Map<String, Object> map=arg0.getAttributes();
	
		String account=(arg0.getUri().toString()).split("=")[1];
		userlist.put(account,arg0);
		System.out.println("用户连接："+account+"  当前在线用户："+userlist.size());
		
		
	}

	@Override
	public void handleMessage(WebSocketSession arg0, WebSocketMessage<?> arg1) throws Exception {
		// TODO Auto-generated method stub
		
		
		ApplicationContextUtil.applicationContext.getAutowireCapableBeanFactory().autowireBean(this);
		
//		
		SystemMsgDataService systemMsgDataService = ApplicationContextUtil.applicationContext.getBean(SystemMsgDataService.class);
		String account=(arg0.getUri().toString()).split("=")[1];
		TextMessage tm=new TextMessage(arg1.getPayload()+"");
		System.out.println(""+account+"发来的消息:"+tm.getPayload());
		Map<Object,Object> map=JsonUtil.fromJson(tm.getPayload(), Map.class);
		String datetype=map.get("datetype").toString();
		String reqtype=map.get("reqtype").toString();
		if(datetype.equals("json")){
			//json字符消息
			if(reqtype.equals("system")){
				//系统消息
				System.out.println("------拦截到系统消息");
				//systemMsgDataService=new SystemMsgDataService();
				try{
				systemMsgDataService.init(map.get("msgcontent"));
				}catch(Exception e){
					e.printStackTrace();
					
				}
			}
			
		}
		if(datetype.equals("picture")){
			//图片消息
		}
	}

	@Override
	public void handleTransportError(WebSocketSession arg0, Throwable arg1) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("handletrsnsporterror");

	}

	@Override
	public boolean supportsPartialMessages() {
		// TODO Auto-generated method stub
		return false;
	}
	
	//将消息转发给全部用户
	public void sendMsgToUsers(TextMessage tm){
		
	}
	
	//将消息转发给指定用户
	public void sendMsgToUser(String account,TextMessage tm){
		System.out.println("------获取在线用户："+tm.getPayload());
		WebSocketSession user=userlist.get(account);
		System.out.println("------尝试转发消息");
		
			try{
				if(user.isOpen()){
					user.sendMessage(tm);
					System.out.println("------消息转发成功："+tm.getPayload());
				}
			}catch(IOException e){
				e.toString();
			}
		}
	//将指定消息转发给指定的多个用户
	public void sendMsgToUsers(Map<String,TextMessage> users){
		//遍历预发送map 
		for(HashMap.Entry<String, TextMessage> entry :users.entrySet() ){
			WebSocketSession user=userlist.get(entry.getKey());
			if(user.isOpen()){
				try {
					user.sendMessage(entry.getValue());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		
	}


	
	}



