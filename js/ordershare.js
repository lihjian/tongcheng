foot(3);
var app = angular.module("myapp", []);
app.controller("myctrl", function($scope, $http) {
	var alldata = [];
	var pageid = 1;

	function loadlist() {
		$http({
			method: "post",
			dataType: "json",
			url: channelLink.baseUrl + "/show/listByUser.do",
			async: true,
			params: {
				code: channelLink.code,
				ciphertext: channelLink.ciphertext,
				userId: channelLink.userId,
				pageId: pageid
			}
		}).success(function(datas) {
			var arr = datas.result;
			if(arr.length == 0 && pageid == 1) {
				$(".share_list").html("");
			} else {
				//创建时间戳转化为时间
				$.each(arr, function(ide, content) {
					var timestamp = content.createDate;
					var d = new Date(timestamp).format("yyyy-MM-dd hh:mm:ss"); //根据时间戳生成的时间对象
					var darr = d.split(" ");
					content.createDate = darr[0];
					alldata.push(content);
					$scope.dataarr = alldata;

				});
				$scope.dataarr = alldata;
			};
			//console.log(alldata);
		});

	};
	loadlist();
	var myScroll = new IScroll('.z_container', {
		bounceTime: 1200,
		scrollbars: false,
		click: true
	});
	myScroll.on('scrollEnd', function() {
		if(myScroll.y == myScroll.maxScrollY) {
			pageid++;
			loadlist();
			//console.log(pageid);
		}
	});
	$(document).on("touchstart", function() {
		myScroll.refresh();
	})
});
app.directive('errSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if(attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	};
});