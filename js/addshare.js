$(function() {
	foot(3);
	//预览
	var dataURL = "";
	$(".img1").change(function(e) {
		var fileId = "file";
		$.ajaxFileUpload({
			url: channelLink.baseUrl + '/user/uploadPic.do',
			type: 'post',
			secureuri: false, // 一般设置为false
			fileElementId: fileId, // 上传文件的id、name属性名
			dataType: 'json', // 返回值类型，一般设置为json、application/json
			data: {
				"code": channelLink.code,
				"ciphertext": channelLink.ciphertext,
				"fileId": fileId
			},
			success: function(data, status) {
				//console.log(data);
				if(data && data.status == 1) {
					var $img = $("#ImgPr");
					var imgUrl = data.result.picUrl;
					imgUrl = imgUrl.replace("&amp;", "&");
					$img.attr('src', imgUrl);
				} else {
					alert("上传失败");
				}
			},
			error: function(data, status, e) {
				alert(e);
			}
		});

	});
	//点击分享按钮
	$(".share").on("touchstart", function() {
		var s_title = $("input").eq(0).val();
		var s_details = $("textarea").val();
		var id = $.getUrlParam("id");
		//console.log(s_details);
		if(s_details.length != 0 && s_details.length != 0 && s_details != "" && s_details != "") {
			$.ajax({
				dataType: "json",
				type: "post",
				url: channelLink.baseUrl + "/show/save.do",
				async: true,
				data: {
					code: channelLink.code,
					ciphertext: channelLink.ciphertext,
					userId: channelLink.userId,
					userName: channelLink.userName,
					title: s_title,
					description: s_details,
					urls: $("#ImgPr").attr("src"),
					winListId: id
				},
				success: function(datas) {
					window.location.href = "ordershare.html?=" + Math.random();
				}

			});
		};

	});

})