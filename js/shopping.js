/**
 * Created by admin on 2016/12/2.
 */
/**
 * 定义加减商品和删除商品事件
 */
function init() {
    $(".delete_a").on("click",function(){
        $(this).parent("li").remove();
        var id = $(this).parents("li").find("input").eq(0).val();
        var tNum = Number($("#tNum").text());
        var tPrice = Number($("#tPrice").text())
        var price = $(this).parents("li").find(".num_text").val()
        $("#tNum").text(tNum - 1);
        $("#tPrice").text(tPrice - price);
        $.shop_remove(id)
    })
    $(".num_1").on("click",function () {
        var num = $(this).parents("li").find('.num_text').val()
        var price = $(this).parents("li").find("input").eq(1).val();
        $(this).parents("li").find(".num_text").val(Number(num) - Number(price));
        $(this).parents("li").find(".num_text").trigger("input")
    })
    $(".num_2").on("click",function () {
        var num = $(this).parents("li").find('.num_text').val()
        var price = $(this).parents("li").find("input").eq(1).val();
        $(this).parents("li").find(".num_text").val(Number(num) + Number(price));

        $(this).parents("li").find(".num_text").trigger("input")
    })
    $(".num_text").on("input",function () {
        var num = Number($(this).val());
        var shengyu = Number($(this).parents("li").find(".s-num span").text());  //剩余数量
        var min = Number($(this).parents("li").find("input").eq(1).val()); //最小起购数
        if(num > shengyu){
            $(this).val(Math.ceil(shengyu/min));
        }
        if(num <= min){
            $(this).val(min);
        }
        if(shengyu <= 0){
            $(this).val(0);
        }
        var price = 0;
        $(".num_text").each(function(){
            price += Number($(this).val());
        })
        $("#tPrice").text(Number(price))

    })
}
$.extend({
    /**
     * 加载购物车数据
     * @param code
     * @param ciphertext
     * @param userId
     */
    loadShop:function (code,ciphertext,userId) {
           var storeArray = sessionStorage.getItem("storeArray");

            $.ajax({
                "url": server.url+"/app/productperiod/list_shop.do",
                "data": {
                    "periodIds": storeArray,
                    "code": code,
                    "ciphertext": ciphertext
                },
                "type": "POST",
                "dataType": "json",
                "async": true,
                "success": function (data) {
                    dataHtml(data.result);
                }
            })
    },

})
/**
 * 提交
 */
$("#submit").on("click",function () {
    var userId = $("#userId").val();
    if(userId == null){
        $.login();
    }else{
        checkNum();
        submit_from("shop_form");
    }


})

/**
 * 根据数据生成购物车商品列表
 * @param data
 */
function dataHtml(data){
    var result = data;
    var tNum = 0;
    var tPrice = 0;
    var html = '';
    $.each(result,function (index,value) {
        if(value == null || value == ""){
            return ;
        }
        var tempNum = 0;
            if(value.sNum > 0) {
                tNum ++;
                tPrice += value.minMun;
                tempNum = value.minMun;
            }
            html += '<li><input id="" class="period" name="periodId" type="hidden" value="' + value.periodId + '" form="show_form"><input id="" type="hidden" value="' + value.minMun + '">';
            html += '<div class="hwc-tu f-l"><a href="#"><img src="' + value.facePic + '"></a></div><div class="gwc-md f-l">';
            html += '<h3><a href="#">' + value.storeName + '</a></h3> <p class="gwc-p1">募集价：<span>￥' + value.price + '</span></p>';
            html += '<p class="gwc-p1 s-num">剩余：<span>' + value.sNum + '</span></p> ' +
                ' <p class="gwc-p2 num_p"><span>购买人次：</span><input class="num_btn num_1" type="button" value="-" >';
            html += ' <input class="num_text" name="buyNum" type="text" maxlength="9" value="' + tempNum + '" form="show_form"> <input class="num_btn num_2" type="button" value="+"> </p></div>';
            html += '<a href="javascript:void(0)" class="gwc-del f-r delete_a" ><img src="images/sjsc-10.gif"></a><div style="clear:both;"></div></li>';



    })
    $("#store_list").empty();
    $("#store_list").html(html);
    $(".num_text").attr("form","shop_form");
    $(".period").attr("form","shop_form");
    $("#tNum").text(tNum);
    $("#tPrice").text(tPrice)
    init();
}
/**
 * 提交订单
 * @param fromId
 */
function submit_from(fromId) {
    var periodIds = new Array();
    var nums = new Array();
    $("#store_list li").each(function (index) {
        periodIds.push($(this).find("input[class='period']").val());
        nums.push($(this).find("input[class='num_text']").val())
    })

    $.ajax({
        "url": server.url+"/app/buy/buy.do",
        "data": {
            "userId" : $("#userId").val(),
            "userName" : $("#userName").val(),
            "periodId" : periodIds.join(","),
            "buyNum" : nums.join(","),
            "code": $("#code").val(),
            "ciphertext": $("#ciphertext").val()
        },
        "type": "POST",
        "dataType": "json",
        "async": true,
        "success": function (data) {
            if(data.status == 1){
                location.href="pay.html?orderId="+data.result.id;
            }else{
                console.log(data.message)
            }
        }
    })
}
function checkNum(){
    var periods = new Array();
    var nums = new Array();
    $("#store_list li").each(function (index) {
        periods.push($(this).find("input[class='period']").val());
        nums.push($(this).find("input[class='num_text']").val())
    })
    $.ajax({
        "url": server.url+"/app/buy/checkNum.do",

        "data": {
            "periodIds" : periods.join(","),
            "nums" : nums.join(","),
            "code": $("#code").val(),
            "ciphertext": $("#ciphertext").val()
        },
        "type": "POST",
        "dataType": "json",
        "async": true,

        "success": function (data) {
            if(data.status == 1){
                var num = 0;
                $.each(data.result, function(key, value) {
                    var li = $("#store_list li").find("input[class='period'][value='"+key+"']").parent("li");
                    li.find("input[class='num_text']").val(value)
                    num += Number(value);
                });
                $("#tNum").text(num);
                $("#tPrice").text(num);
            }
        },

    })
}