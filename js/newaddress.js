$(function() {
	//对象
	function Addnewaddresss() {};
	//尾部加载
	Addnewaddresss.prototype.footer = function() {
		foot(3);
	};
	Addnewaddresss.prototype.user = function() {
		var rep_name = /^[\u4e00-\u9fa5_a-zA-Z]+$/;
		$(".name").blur(function() {
			var userName = $(this).val();
			if(userName.length > 0 && !userName.match(rep_name)) {
				$.alert({
					title: "温馨提示",
					content: "请正确填写收货人",
					btn: "确定"
				});
				nameinfo = false;
				//console.log(info);
			} else if(userName.length == 0) {
				nameinfo = false;
				//console.log(nameinfo);
			} else {
				nameinfo = true;
				//console.log(nameinfo);
			};
		});
	};
	Addnewaddresss.prototype.userPhone = function() {
		var rep_phone = /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/;
		$(".phone").blur(function() {
			var userPhone = $(this).val();
			if(!userPhone.match(rep_phone) && userPhone.length > 0) {
				$.alert({
					title: "温馨提示",
					content: "请填写正确的手机号",
					btn: "确定"
				});
				info = false;
				//console.log(info);
			} else if(userPhone.length == 0) {
				phoneinfo = false;
				//console.log(phoneinfo);
			} else {
				phoneinfo = true;
				//console.log(phoneinfo);
			};
		});
	};
	Addnewaddresss.prototype.addressdetails = function() {
		var rep_address = /^[\u2E80-\u9FFF]+$/
		$(".addressdetail").blur(function() {
			var address = $(this).val();

			if(address.length > 0 && !address.match(rep_address)) {
				$.alert({
					title: "温馨提示",
					content: "请填写正确的地址",
					btn: "确定"
				});
				addressdetailsinfo = false;
				//console.log(addressdetailsinfo);
			} else if(address.length == 0) {
				addressdetailsinfo = false;
				//console.log(addressdetailsinfo);
			} else {
				addressdetailsinfo = true;
				//console.log(addressdetailsinfo);
			};
		});
	}
	Addnewaddresss.prototype.saveaddress = function() {
		var defaultAddress = 0;
		$("input[type='checkbox']").change(function() {
			var default_address = $(this).is(':checked');
			if(default_address == true) {
				defaultAddress = 1;
			} else {
				defaultAddress = 0;
			}
		});
		$(".save_address").on("click", function() {
			var userName = $(".name").val();
			var userPhone = $(".phone").val();
			var newaddress = $(".addressdetail").val();
			if(nameinfo == true && phoneinfo == true && addressdetailsinfo == true) {
				//console.log(newaddress);
				$.ajax({
					type: "post",
					dataType: "json",
					url: channelLink.baseUrl+"/takeaddr/save.do",
					async: true,
					data: {
						code: channelLink.code,
						ciphertext: channelLink.ciphertext,
						userId: channelLink.userId,
						name: userName,
						phone: userPhone, 
						address: newaddress,
						isDefalut: defaultAddress
					},
					success: function(datas) {
						//console.log(defaultAddress);
						if(datas.errorCode == "00000") {
							$.alert({
								title: "温馨提示",
								content: "添加地址成功",
								btn: "确定"
							});
							setTimeout( function(){
								window.location.href = "address.html?"+Math.random();
							},1500 )
						} else {
							$.alert({
								title: "温馨提示",
								content: "添加地址失败",
								btn: "确定"
							});
						}
					}
				});
			} else if(nameinfo == false || phoneinfo == false || addressdetailsinfo == false) {
				$.alert({
					title: "温馨提示",
					content: "请填写完整正确的信息",
					btn: "确定"
				});
			}
		});
	};

	//实例
	var addressInfo = new Addnewaddresss();
	var nameinfo = false,
		phoneinfo = false,
		addressdetailsinfo = false;
	addressInfo.footer();
	addressInfo.user();
	addressInfo.userPhone();
	addressInfo.addressdetails();
	addressInfo.saveaddress();
})