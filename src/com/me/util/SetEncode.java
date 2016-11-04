package com.me.util;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequestWrapper;

import org.apache.log4j.Logger;

/**
 * Servlet Filter implementation class SetEncode
 */	
@WebFilter("/SetEncode")
public class SetEncode implements Filter {

	private Logger logger=Logger.getLogger(SetEncode.class);
    /**
     * Default constructor. 
     */
	
	
	String encode="utf-8";
	
	
    public SetEncode() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		// place your code here

		// pass the request along the filter chain
		System.out.println("拦截到请求Url："+((HttpServletRequest)request).getRequestURL());
		logger.debug("拦截到请求Url:"+request.getServletContext().getContextPath());
		HttpServletRequest httpRequest=(HttpServletRequest)request;
		HttpServletResponse httpResponse=(HttpServletResponse)response;
		
		
		
		httpRequest.setCharacterEncoding(encode);
		//httpResponse.setContentType("text/html;charset="+encode);
		httpResponse.setCharacterEncoding(encode);
		
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
