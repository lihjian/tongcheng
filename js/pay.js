/**
 * Created by admin on 2016/12/12.
 */
jQuery.extend({
    loadOrderInfo:function (code,ciphertext,orderId) {
        if(orderId == null || orderId == ""){
            return ;
        }
        $.ajax({
            "url": server.url+"/app/buy/orderInfo.do",
            "data": {
                "orderId": orderId,
                "code": code,
                "ciphertext": ciphertext
            },
            "type": "POST",
            "dataType": "json",
            "async": true,
            "success": function (data) {
                if(data.status == 1){
                    var html = "";
                    $.each(data.result.orderList,function(index,value){
                        html += '<div class="order-info"><div class="drdd-if3tu f-l">';
                        html += '<a href="#"><img src="'+value.facePic+'"></a></div>';
                        html += '<h3 class="drdd-h31 f-l"><a href="#">'+value.storeName+'</a></h3>'
                        html += '<p class="drdd-p1 f-r">￥'+value.num+'</p><div style="clear:both;"></div></div>'
                    })
                    $(".orderlist").html(html);
                    $(".p1 span").text(data.result.orderList.length)
                    $(".p2 span").text("￥"+data.result.tPrice);
                    $("#pay-btn").on("click",function () {
                        var type = $(".pay-input:checked").val()
                        if(type == null || type == ""){
                            return ;
                        }
                        sessionStorage.storeArray = "";

                        $("#form").attr("action",channelLink.payurl);
                        var f_html = "<input type='hidden' name='total_fee' value='"+data.result.tPrice+"'>"+
                                "<input type='hidden' name='subject' value='商品购买'>" +
                            "<input type='hidden' name='orderNo' value='"+data.result.orderId+"'>"+
                                "<input type='hidden' name='payType' value='"+type+"'>"
                        $("#form").html(f_html);
                        $("#form").submit();

                    })
                }
            }
        })
    }
})