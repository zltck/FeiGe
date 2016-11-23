package com.me.service;

import java.beans.IntrospectionException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.HibernateTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.me.bean.AddFri;
import com.me.bean.JsonDateStructure;
import com.me.entity.Friends;
import com.me.entity.SystemMsg;
import com.me.entity.UserInfo;
import com.me.util.GetTIme;
import com.me.util.JsonUtil;
import com.me.util.MapUtil;

@Service
public class SystemMsgDataService {
	@Autowired
	private SystemMsgService systemMsgService;
	@Autowired
	private WebSocketHandler webSocketHandler;
	@Autowired
	private FriendService friendService;
	@Autowired
	private UserInfoService userInfoService;

	/**
	 * @param msgContent
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 * @throws IntrospectionException
	 */
	@Transactional()
	public void init(Object msgContent) throws InstantiationException, IllegalAccessException, IntrospectionException {
		

		((Map) msgContent).put("time", GetTIme.getNowTime());// 插入时间
		
		SystemMsg sm = (SystemMsg) MapUtil.mapToBean((Map<Object, Object>) msgContent, SystemMsg.class);

		//System.out.println("得到系统消息请求类型:" + sm.getType());
		boolean flag = false;
		// 添加好友
		String reciever = sm.getReciever();
		HashMap<String, WebSocketSession> userlist = webSocketHandler.userlist;

		for (HashMap.Entry<String, WebSocketSession> entry : userlist.entrySet()) {
			System.out.println("key:" + entry.getKey() + "  value:" + entry.getValue());
			if (entry.getKey().equals(reciever)) {
				// 用户在线
				flag = true;
			}
		}
		if ("addfri".equals(sm.getType())) {
			((Map) msgContent).put("msg", "0");// 是否同意
			((Map) msgContent).put("isread", 0);// 是否已读

			

			if (flag) {
				// 用户在线,直接转发加好友请求并保存记录
				// 得到添加好友msgcontent
				System.out.println("用户:" + sm.getReciever() + " 在线");
				AddFri ad = new AddFri();
				ad.setSender(sm.getSender());
				ad.setReciever(reciever);
				ad.setType("addfri");

				// 构建响应数据结构
				JsonDateStructure jds = new JsonDateStructure();
				jds.setReceiver(reciever);
				jds.setSender(sm.getSender());
				jds.setMsgcontent(ad.toJson());
				jds.setResptype("system");
				jds.setDatetype("json");
				System.out.println("---jsonDateStructure:" + jds.toJson());
				TextMessage tm = new TextMessage(jds.toJson().getBytes());
				System.out.println("转发数据构建完成");
				webSocketHandler.sendMsgToUser(reciever, tm);
				try {
					systemMsgService.saveSystemMsg(sm);
				} catch (Exception e) {
					System.out.println(e.toString());
				}
				// sms.saveSystemMsg(sm);
			} else {
				// 用户不在线，讲请求保存在服务器中
				System.out.println("用户不在线：" + sm.getReciever());
				systemMsgService.saveSystemMsg(sm);
			}
		}
		// friendService=(FriendService)ApplicationContextUtil.getBean(FriendService.class);
		if ("resp_addfri".equals(sm.getType())) {
			// 用户回应加好友请求
			// ((Map) msgContent).put("msg", "0");// 是否同意
			((Map) msgContent).put("isread", 0);// 是否已读

			if (flag) {
				if ("agree".equals(sm.getMsg())) {
					// 同意,插入数据
					Friends friends = new Friends();

					friends.setUid(userInfoService.getUserIdByAccount(sm.getSender()));
					friends.setFid(userInfoService.getUserIdByAccount(sm.getReciever()));

					friendService.addFriend(friends);

					List<?> sender_result =   friendService.getAllFriendsByAccount(sm.getSender());
					List<?> receiver_result = friendService.getAllFriendsByAccount(sm.getReciever());
					List<Map<String,Object>> list_sender=new ArrayList<>();
					List<Map<String,Object>> list_receiver=new ArrayList<>();
					Object[][] arr_sender=new Object[sender_result.size()][2];
					Object[][] arr_receiver=new Object[receiver_result.size()][2];
					sender_result.toArray(arr_sender);
					receiver_result.toArray(arr_receiver);
					for(int i=0;i<arr_sender.length;i++){
						Map<String,Object> map=new HashMap<>();
						map.put("account", arr_sender[i][0]);
						map.put("username",arr_sender[i][1]);
							list_sender.add(map);
						
					}
					for(int i=0;i<arr_receiver.length;i++){
						Map<String,Object> map=new HashMap<>();
						map.put("account", arr_receiver[i][0]);
						map.put("username",arr_receiver[i][1]);
						list_receiver.add(map);
						
					}
					
					// 更新好友列表
					//-----构建响应数据结构-----				
					JsonDateStructure jds_sender = new JsonDateStructure();
					jds_sender.setSender(sm.getReciever());
					jds_sender.setReceiver(sm.getSender());
					jds_sender.setResptype("frilist_all");
					jds_sender.setDatetype("json");
					jds_sender.setMsgcontent(JsonUtil.listToJson(list_sender));

					
					JsonDateStructure jds_receiver = new JsonDateStructure();
					jds_receiver.setSender(sm.getSender());
					jds_receiver.setReceiver(sm.getReciever());
					jds_receiver.setResptype("frilist_all");
					jds_receiver.setDatetype("json");
					jds_receiver.setMsgcontent(JsonUtil.listToJson(list_receiver));

					
					Map<String,TextMessage> sends=new HashMap<>();
					sends.put(sm.getSender(), new TextMessage(jds_sender.toJson()));
					sends.put(sm.getReciever(), new TextMessage(jds_receiver.toJson()));
					
					webSocketHandler.sendMsgToUsers(sends);
				}
			} else {
				// 保存数据库

			}

		}

	}
}
