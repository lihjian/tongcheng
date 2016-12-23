//底部加载
$(function() {
	foot(3);
});
//定义应用
var app = angular.module("myapp", []);
//添加控制器
app.controller("myctrl", function($scope, $http) {
	//定义数组，存储加载回来的数据
	var alldata = [];
	//定义请求数据的页码，初始值为第一页
	var pageid = 1;
	//加载中奖列表的方法
	function loadwinner(pageid) {
		$http({
			dataType: "json",
			method: "post",
			url: channelLink.baseUrl + "/actor/selfOrderList.do",
			async: true,
			params: {
				code: channelLink.code,
				ciphertext: channelLink.ciphertext,
				pageId: pageid,
				userId: channelLink.userId,
				winUserId: channelLink.userId
			}
		}).success(function(datas) {
			//取到返回的数据
			var arr = datas.result;
			//如果第一页的数据都没有，中奖列表没有数据
			if(arr.length == 0 && pageid == 1) {
				$(".spxq-k").html("");
			} else {
				//如果有数据，遍历数组，将数组元素存入定义的alldata
				$.each(arr, function(index, content) {
					alldata.push(content);
				});
				//将定义的数组赋给scope对象的属性
				$scope.dataarr = alldata;
				//console.log(alldata);
				$scope.goshare = function(key) {
					var id = key.winListId;
					window.location.href = "addshare.html?id=" + id;
				}
			}
		});
	};
	loadwinner(pageid);
	//滚动条
	var myScroll = new IScroll('.z_container', {
		bounceTime: 1200,
		scrollbars: false,
		click: true
	});
	//每次滚动判断是否到达页面底部，如果到达底部则加载下一页
	myScroll.on('scrollEnd', function() {
		if(myScroll.y == myScroll.maxScrollY) {
			pageid++;
			loadwinner(pageid);
		};
	});
	//点击屏幕的屏幕的时候，刷新滚动条
	$(document).on("touchstart", function() {
		myScroll.refresh();
	})
});