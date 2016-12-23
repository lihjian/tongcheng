$(function() {
	//对象
	function Classify() {

	};
	Classify.prototype.header = function() {
		
	};
	Classify.prototype.footer = function() {
		foot(0);
		//移除底部高亮样式
		$(".quanbu-ul1 li").removeClass("current");
	};
	Classify.prototype.loadlist = function() {
		//页面加载中显示遮罩层
		loading();

		$.ajax({
			dataType: "json",
			type: "post",
			url: channelLink.baseUrl+"/store/getSortList.do",
			async: true,
			data: {
				code: channelLink.code,
				ciphertext: channelLink.ciphertext,
			},
			success: function(datas) {
				//console.log(datas)
				$.each(datas.result, function(index, content) {
					$("<li id='" + content.id + "'>" + content.name + "</li>").appendTo(".container_left ul");

				})
				var pagecount = 1;
				$(".good_list_top").html("<h6>" + datas.result[0].name + "</h6>");
				//默认加载手机数码类的第一页
				listdetails(id = $(".container_left ul li").eq(0).attr("id"), pagecount);
				//加载成功后   遮罩层消失
				$(".loading").remove();
				//默认第一个分类节点的样式
				$(".container_left ul li").eq(0).css({
						"background": "rgb(241,245,246)",
						"color": "#E74E5D"
					})
					//定义变量id
				var id;
				//点击分类选项  加载对应的分类选项的商品内容
				$(".container_left ul li").on("touchstart", function() {
					$(".backtop").hide();
					$(".good_list_top a").remove();
					pagecount = 1;
					loading();
					//获取当前点击节点的id
					id = $(this).attr("id");
					//console.log(id);
					//改变当家点击节点的样式
					$(this).css({
						"background": "rgb(241,245,246)",
						"color": "red"
					}).siblings("li").css({
						"background": "white",
						"color": "black"
					});
					$(".good_list_top ").html("<h6>" + $(this).text() + "</h6>");
					listdetails(id, pagecount);
					$(".loading").remove();

				});
				myScroll.on('scrollEnd', function() {
					if(myScroll.y <= -600) {
						$(".backtop").show();
					} else {
						$(".backtop").hide();
					};
					if(myScroll.y == myScroll.maxScrollY) {
						loading();
						pagecount++
						//console.log(pagecount);
						listdetails(id, pagecount);
					}
				});
				//回到顶部的功能实现
				$(".backtop").on("touchstart", function() {
					myScroll.scrollTo(0, 0, 1000, IScroll.utils.ease.elastic);
				});
			}

		});

	}

	//加载分类详情的方法
	function listdetails(id, pagecount) {
		$.ajax({
			dataType: "json",
			type: "post",
			url: channelLink.baseUrl+"/store/getBySort.do",
			async: true,
			data: {
				code: channelLink.code,
				ciphertext: channelLink.ciphertext,
				sortId: id,
				pageId: pagecount
			},
			success: function(datas) {
//				console.log(datas)
//				console.log(id);
//				console.log(pagecount);
				$(".loading").remove();
				if(datas.result.length == 0) {
//					$.alert({
//						title: "温馨提示",
//						content: "没有更多的商品啦",
//						btn: "确定"
//					});

				} else {
					var percent = 0,
						percnetwidth = 0+"px";
					$.each(datas.result, function(index, content) {
						var snum = content.sNum;
						var num = content.num;
						//console.log(num);
						//计算百分比以及进度条高度
						if(snum && num) {
							//获取进度条父元素的宽度
							var pwidth = 78;
							percent = ((num - snum) / num).toFixed(2) * 100;
							percnetwidth = ((num - snum) / num).toFixed(2) * pwidth + "px";
							//console.log(percnetwidth)
						} else {
							percent = 0;
							percnetwidth = 0;
						};
						//生成商品列表
						$("<a class='col-xs-5' id='" + content.periodId + "'>" + "<div class='pic>'><img src='" + content.facePic + "'/></div>" + "<p style='overflow: hidden;'>" + content.name + "</p>" + "<p class='price'>" + "募集价" + "<span>" + "￥" + content.price + "</span>" + "</p>" + "<p clsss='percent'>" + "进度 " + "<span>" + percent + "</span>" + "%" + "</p>" + "<i><b class='percentwidth' style='width:" + percnetwidth + "'>" + "</b></i>" + "<img src='images/sjsc-09.gif' class='car shop'/>" + "</a>").appendTo(".good_list_top");

					});
					$(".good_list_top a").on("touchstart", function() {
						var thisid = $(this).attr("id");
						//console.log(thisid);
						if(thisid != "undefined") {
							$.loadPeriod(thisid);
						} else {
							console.log("a")
							$.alert({
								title: "温馨提示",
								content: "暂时没有该商品",
								btn: "确定"
							})
						}
					})
					$(".car ").on("touchstart", function(e) {
						var e = e || window.event;
						e.stopPropagation();
						var goodid = $(this).parent().attr("id");
						if(goodid != "undefined") {
							var e = e || window.event;
							e.stopPropagation();
							var img = $(this).siblings("div").find("img");
							var flyElm = img.clone().css('opacity', 0.75);
							$('body').append(flyElm);
							flyElm.css({
								'z-index': 9000,
								'display': 'block',
								'position': 'absolute',
								'top': img.offset().top + 'px',
								'left': img.offset().left + 'px',
								'width': img.width() + 'px',
								'height': img.height() + 'px'
							});
							flyElm.animate({
								top: $('.gwc').offset().top - 60,
								left: $('.gwc').offset().left + 5,
								width: 10,
								height: 17
							}, 'slow', "swing", function() {
								flyElm.remove();
							});
							$.shop_add($(this).parent().attr("id"));

						} else {
							$.alert({
								title: "温馨提示",
								content: "该商品还没参与夺宝",
								btn: "确定"
							});
						}
					})
					myScroll.refresh();
				}
			}
		});
	}
	//滚动
	var myScroll = new IScroll('.container_right', {
		bounceTime: 1200,
		scrollbars: false,
		click: true
	});

	//实例
	var classify = new Classify();
	classify.header();
	classify.footer();
	classify.loadlist();

});