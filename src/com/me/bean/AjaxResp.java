package com.me.bean;

import java.util.HashMap;

public class AjaxResp {
	private Object data;
	private boolean success;
	private HashMap error;

	public AjaxResp(){}
	public AjaxResp(boolean success) {
		this.success = success;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	

	public HashMap getError() {
		return error;
	}

	public void setError(HashMap error) {
		this.error = error;
	}

	public void putError(String key,String value){
		this.error.put(key, value);
	}
	
}
