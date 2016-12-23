var app = angular.module("myapp", []);
//添加控制器
app.controller("myctrl", ["$scope", "$http", "$compile", function($scope, $http, $compile) {
	//对象
	function Address() {};
	//尾部加载
	Address.prototype.footer = function() {
			foot(3);
		}
		//收货地址加载
	Address.prototype.addresslist = function() {
		function loadaddresslist() {
			//请求收货地址列表					
			$http({
				method: "post",
				dataType: "json",
				url: channelLink.baseUrl + "/takeaddr/list.do",
				async: true,
				params: {
					code: channelLink.code,
					ciphertext: channelLink.ciphertext,
					userId: channelLink.userId
				}
			}).success(function(datas) {
				//console.log(datas)
				var arr = datas.result;
				if(arr.length == 0) {
					$(".address_list").html("");
				} else {
					$.each(arr, function(key, item) {
						if(item.isDefalut == "1") {
							var temp = item;
							arr[key] = arr[0];
							arr[0] = temp;
							arr[0].showDefault = 1;
							return false;
						};
					});
				};
				$scope.dataarr = arr;

			});
		};
		loadaddresslist();
	};
	//修改
	Address.prototype.reviseaddress = function() {
			//点击修改按钮，弹出修改页面
			$scope.revise = function(address) {
				//讲要修改的地址信息传过来
				$scope.oldaddress = address;
				//加载修改页面
				$http.get("revise.html?_" + Math.random()).success(function(datas) {
					//console.log("A");
					$compile($(".z_revise").html(datas))($scope);
				});

			};

			//关闭修改页面
			$scope.close = function() {
					$(".mask").remove();
					$(".revise_details").remove();
				}
				//保存修改按钮
			$scope.saverevise = function($event, oldaddress) {
				var save = $event.target;
				var defaultAddress = 0;
				//是否设为默认
				var default_address = $(save).siblings().find("input[type='checkbox']").is(':checked');
				if(default_address == true) {
					defaultAddress = 1;
				} else {
					defaultAddress = 0;
				}
				//需要修改的地址的id
				var addressid = oldaddress.id;
				//旧地址信息
				var oldname = oldaddress.name;
				var oldphone = oldaddress.phone;
				var oldaddressdetails = oldaddress.address;
				//新地址信息
				var newname = $(save).siblings().find(".name").val();
				var newphone = $(save).siblings().find(".phone").val();
				var newaddressdetails = $(save).siblings().find(".addressdetail").val();
				//
				if(oldname == newname && oldphone == newphone && oldaddressdetails == newaddressdetails && defaultAddress == 0) {
					$(".mask").remove();
					$(".revise_details").remove();
				} else if(newname.length == 0 || newname.length == 0 || newaddressdetails.length == 0) {
					$(".mask").remove();
					$(".revise_details").remove();
				} else {
					$.ajax({
						type: "post",
						dataType: "json",
						url: channelLink.baseUrl + "/takeaddr/save.do",
						async: true,
						data: {
							id: addressid,
							code: channelLink.code,
							ciphertext: channelLink.ciphertext,
							userId: channelLink.userId,
							name: newname,
							phone: newphone,
							address: newaddressdetails,
							isDefalut: defaultAddress
						},
						success: function(datas) {
							$(".mask").remove();
							$(".revise_details").remove();
							if(datas.errorCode == "00000") {
								$.alert({
									title: "温馨提示",
									content: "修改成功",
									btn: "确定"
								});
								setTimeout(function() {
									window.location.reload();
								}, 1500)
							} else {
								$.alert({
									title: "温馨提示",
									content: "修改失败",
									btn: "确定"
								});
							};
							
						}
					});
				}
			}
		}
		//新增
	Address.prototype.addadress = function() {
		$scope.newadd = function() {
			window.location.href = "newaddress.html?=" + Math.random();
		}
	};
	//实例
	var address = new Address();
	//尾部加载
	address.footer();
	//加载收货地址
	address.addresslist();
	//修改
	address.reviseaddress();
	//新增收货地址跳转
	address.addadress();
}]);
//滚动条
$(function() {
	var myScroll = new IScroll('.z_container', {
		bounceTime: 1200,
		scrollbars: false,
		click: true
	});
	$(document).on("touchstart", function() {
		myScroll.refresh();
	})
})