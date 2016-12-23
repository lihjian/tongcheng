var server = {
    url:"http://120.76.219.201:8088",
    lcoalurl:"http://192.168.1.176:8080",
    payurl:"http://120.76.219.201:8088/pay/alipayWap.do"
}


/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
    /*
     * eg:format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()
        // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

$.extend({
    getUrlParam:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    },
    /**
     * 添加购物车
     * @param id
     */
    shop_add:function(id){
        var storeArray = new Array();
        var temp = sessionStorage.getItem("storeArray");
        if(temp != null){
            storeArray = temp.split(",");
        }
        if(id != null){
            storeArray.push(id);
        }

        var n = {},r=[]; //n为hash表，r为临时数组
        for(var i = 0; i < storeArray.length; i++) //遍历当前数组
        {
            if(storeArray[i] == null || storeArray[i] == ""){
                continue;
            }
            if (!n[storeArray[i]]) //如果hash表中没有当前项
            {
                n[storeArray[i]] = true; //存入hash表
                r.push(storeArray[i]); //把当前数组的当前项push到临时数组里面
            }
        }
        sessionStorage.setItem("storeArray",r.join(","));
        console.log(r.length)
        $(".gwc_num").text(r.length);
        $(".gwc_num").show();
    },
    /**
     * 删除购物车
     * @param id
     */
    shop_remove:function(id){
        var storeArray = new Array();
        var temp = sessionStorage.getItem("storeArray");
        if(temp != null){
            storeArray = temp.split(",");
        }
        storeArray.splice(storeArray.indexOf(id),1);
        sessionStorage.setItem("storeArray",storeArray);
        $(".gwc_num").text(storeArray.split(",").length);
        $(".gwc_num").show();
    }
})
