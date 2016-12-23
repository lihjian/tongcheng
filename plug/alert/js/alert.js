(function($){
	$.alert=function(opts){
		var _default = {
			title:"温馨提示",
			content:"保存成功！",
			btn:"确定"
		};
		opts = $.extend(true,_default,opts);
		var $alert=$(".alert").length;
		//console.log($alert)
		if($alert==0){
			$("<div class='alert'><div class='title'></div><div class='content'></div><div class='o_line'></div><div class='footer'></div></div>").appendTo("body");
			$("<button>"+opts.btn+"</button>").appendTo(".footer");
			$(".title").text(opts.title);
			$(".content").text(opts.content);
			$("button").click(function(){
				$(".alert").remove();
				$("body").removeClass("change");
			});
			$("body").addClass("change");
		}else{
			
		}
	}
})(jQuery)
