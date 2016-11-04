Vue.component("friend_list",{
	props:['rightCurrContent'],
	data:function(){
		var data={
				friends:[
				         {
				        	 'aaaaa':'dddddd',
				        	 
				         },
				         {
				        	 'aaaaa':'dddddd',
				        	
				         },
				         {'aaaaa':'dddddd'},
				         {'aaaaa':'dddddd'},
				         {'aaaaa':'dddddd'},
				         {'aaaaa':'dddddd'},
				         {'aaaaa':'dddddd'}, 
				         {'aaaaa':'dddddd'}, 
				         
				         
				         ],
				      itemSelected:null,
				         
		}
		return data;
	},
	ready:function(){
		//获取好友列表数据
	},
	template:loadHTML("components/friendlist_comp/friendlist_comp.html"),
	methods:{
		itemClick:function(a){
			this.itemSelected=a.$index;
		}
	}
	
	
});