package com.me.util;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class JsonUtil {

	
	 public static <T> T fromJson(String str, Class<T> type) {  
	        Gson gson = new Gson();  
	        return gson.fromJson(str, type);  
	    }
	 public static String listToJson(List list){
		 Gson g=new GsonBuilder()
					.setDateFormat("yyyy-MM-dd HH:mm:ss")
					.create();
		 String str=g.toJson(list);
		 System.out.println("---------------list_to_json:"+str);
		 return str;
	 }
}
