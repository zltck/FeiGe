$(document).ready(function(){
	

	
	
	
	new Vue({
		el:"#register_panel"
	});
	
	//下拉框样式
	$('.ui.styled.accordion')
	  .accordion({
	    selector: {
	      trigger: '.title .icon'
	    }
	  });
	//滑动按钮样式
	$('.ui.toggle.checkbox')
	  .checkbox()
	;
	
});

