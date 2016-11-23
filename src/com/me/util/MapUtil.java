package com.me.util;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

public class MapUtil {

	
	public static Object mapToBean(Map map,Class type) throws IntrospectionException, InstantiationException, IllegalAccessException{
		BeanInfo beanInfo=Introspector.getBeanInfo(type);
		Object bean=type.newInstance();
		PropertyDescriptor[] propertyDescriptors=beanInfo.getPropertyDescriptors();
		for(int i=0;i<propertyDescriptors.length;i++){
			PropertyDescriptor propertyDescriptor=propertyDescriptors[i];
			String propertyName=propertyDescriptor.getName();
			if(map.containsKey(propertyName)){
				Object value=map.get(propertyName);
				Object[] args=new Object[1];
				args[0]=value;
				try {
					propertyDescriptor.getWriteMethod().invoke(bean, args);
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return bean;
	}
}
