package com.me.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class GetRandomStr {

	
public static byte[] EncodeToBytes(String str){
		
		
		byte[] result=null;
		try {
			MessageDigest md=MessageDigest.getInstance("MD5");
			md.reset();
			md.update(str.getBytes("utf-8"));
			result=md.digest();
			
			
		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return result;
		
	}
	/**
	 * 将字符串加密为32位16进制数
	 * @param str 代价密字符串
	 * @return
	 */
	
	public static String encodeToHex(String str){
		byte[] data=EncodeToBytes(str);
		StringBuffer sb=new StringBuffer();
		for(int i=0;i<data.length;i++){
			String hex=Integer.toHexString(0xff & data[i]);
			if(hex.length()==1){
				sb.append("0");
			}
			sb.append(hex);
			
			
		}
		return sb.toString();
	}
	
}
