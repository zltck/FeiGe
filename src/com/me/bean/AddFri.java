package com.me.bean;

import com.google.gson.Gson;

public class AddFri {

	private String sender;
	private String reciever;
	private String type;
	private String msg;
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReciever() {
		return reciever;
	}
	public void setReciever(String reciever) {
		this.reciever = reciever;
	}

	
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String toJson(){
		Gson g=new Gson();
		return g.toJson(this);
	}
}
