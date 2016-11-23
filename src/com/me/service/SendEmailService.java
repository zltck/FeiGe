package com.me.service;

import java.security.GeneralSecurityException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.sun.mail.util.MailSSLSocketFactory;

@Service()
public class SendEmailService {
	
	
	private static String HOST="smtp.qq.com";
	private static String PROTOCOL="smtp";
	private static int port=465;
	private static String sender="438569837@qq.com";
	private static String senderPwd="ecfxhusflytjbifa";
	
	
	
	
	private static Session getSession(){
		Properties properties=new Properties();
		MailSSLSocketFactory sf;
		try {
			sf = new MailSSLSocketFactory();
			sf.setTrustAllHosts(true);
			properties.put("mail.smtp.ssl.enable", "true");
			properties.put("mail.smtp.ssl.socketFactory", sf);
		} catch (GeneralSecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		properties.put("mail.debug", "true");
		properties.put("mail.smtp.host",HOST );
		properties.put("mail.store.protocol", PROTOCOL);
		properties.put("mail.smtp.port", port);
		properties.put("mail.smtp.auth" , true);
		
		
		Authenticator authenticator=new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				// TODO Auto-generated method stub
				return new PasswordAuthentication(sender, senderPwd);
			}
		};
		
		Session session=Session.getDefaultInstance(properties,authenticator);
		return session;
		
		
		
		
	}
	

	
	public int send(String receiver,String content){
		int flag=0;
		Session session=getSession();
		
		
		try {
			Message msg=new MimeMessage(session);
			msg.setFrom(new InternetAddress(sender));
			InternetAddress[] ia={new InternetAddress(receiver)};
			msg.setRecipients(Message.RecipientType.TO, ia);
			msg.setSubject("飞鸽-账号激活");
			msg.setSentDate(new Date());
			msg.setContent(content,"text/html;charset=utf-8");
			Transport.send(msg);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			flag=1;
			e.printStackTrace();
			
			
		}
		return flag;
		
		
		
	}
	

}
