Vue.component("dropdown_comp", {
	data : function() {
		var data = {}
		return data;

	},
	template : loadHTML("components/dropdown_comp/dropdown_comp.html"),
	ready : function() {
		console.log("注册下拉菜单点击事件");
		// 下拉菜单弹出动画
		$('.ui.top.right.dropdown.button').dropdown({
			action : 'hide'
		});
	},
	methods : {
		showDropDown : function() {
			//console.log("下拉菜单打开");
			
		}
	}
});