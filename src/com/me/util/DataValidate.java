package com.me.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DataValidate {

	
	public static boolean val_email(String email){
		
	        boolean tag = true;
	        final String pattern1 = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
	        final Pattern pattern = Pattern.compile(pattern1);
	        final Matcher mat = pattern.matcher(email);
	        if (!mat.find()) {
	            tag = false;
	        }
	        return tag;
	    
	}
}
