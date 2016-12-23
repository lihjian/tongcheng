/**
 * Created by admin on 2016/12/20.
 */
$.extend({
    loadJSXQ:function (periodId,code,ciphertext) {
        $.ajax({
            "url": server.url + "/app/actor/getActorLuckyList.do",
            "data": {
                "PPeriodId": periodId,
                "code": code,
                "ciphertext": ciphertext
            },
            "type": "POST",
            "dataType": "json",
            "async": true,
            "success": function (data) {
                if(data.status == 1){
                    var array = data.result.genLuckyNumRecords;
                    if(array == null || array.length <= 0){
                        return ;
                    }
                    $("#lastTime").text(array[array.length - 1].createDate)
                    var html = "";
                    $("#total").text(data.result.totalTimeNum)
                    $("#yushu").html(data.result.totalTimeNum+'%'+data.result.totalBuynum+'<span class="sm-span" >(本次商品惨与总人数)</span>='+data.result.buyMod+'<span class="sm-span" >(余数)</span>')
                    $("#result").html(data.result.buyMod+'+100000001='+data.result.luckNum)
                    $.each(array,function (index,value) {
                        html += "<tr><td>"+value.createDate+"</td><td>"+value.genTimeMun+"</td><td>"+value.username+"</td></tr>"
                    })
                    $("#jsxq-tbody").append(html)
                }
            }
        })
    }
})