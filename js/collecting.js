/**
 * Created by admin on 2016/12/19.
 */
$.extend({
    time_warp:function (obj) {
        var int = setInterval(function(){
                var NowTime = new Date();
                var nMS= 300000 - (NowTime.getTime() - Number($(obj).attr("time")));
                if(nMS <= 0){
                    $(obj).html('<span>正在计算开奖结果...</span>')
                    $.get(obj,int);

                    return ;
                }
                var nM=Math.floor(nMS/(1000*60)) % 60;
                var nS=Math.floor(nMS/1000) % 60;
                var nMS=Math.floor(nMS/100) % 10;
                if(nM < 10){
                    nM = "0"+nM
                }
                if(nS < 10){
                    nS = "0"+nS
                }
                if(nMS < 10){
                    nMS = "0"+nMS
                }
                var str = '揭晓倒计时 <span class="timer" >'+nM+':'+nS+':'+nMS+'';
                $(obj).html(str);


        }, 1);
    },
    loadInfoData:function (code,ciphertext,pageId) {
        $.ajax({
            "url": server.url + "/app/public/list.do",
            "data": {
                "code": code,
                "ciphertext": ciphertext,
                "pageId" : pageId
            },
            "type": "POST",
            "dataType": "json",
            "async": true,
            "success": function (data) {
                if(data.status == 1){
                    var html = '';
                    $.each(data.result,function (index,value) {
                        var time = new Date().getTime() - value.finishDate ;
                        if(time > 300000){
                            var text = value.winner;
                            if(text != null && text.length > 25){
                                text = text.substr(0,25)+"...";
                            }
                            html +='<li class="zxjx-li" period="'+value.periodId+'"><div class="hwc-tu fm-pic f-l"><a href="#"><img src="'+value.facePic+'"></a></div>'
                            html += '<div class="gwc-md f-l"><h3><a href="#">获奖者：'+text+'</a></h3>';
                            html += '<p class="gwc-p1 jx-p">本期参与：<span>'+value.buyNum+'</span></p><p class="gwc-p1">总需人次：<span>'+value.num+'</span></p>'
                            html += '<p class="gwc-p2 jx-p">揭晓日期：<span>'+new Date(value.winDate).format("yyyy-MM-dd")+'</span></p>';
                            html += '</div><div style="clear:both;"></div></li>';
                        }else{
                            var text = value.storeName;
                            if(text != null && text.length > 25){
                                text = text.substr(0,25)+"...";
                            }
                            html +='<li class="zxjx-li" period="'+value.periodId+'"><div class="hwc-tu fm-pic f-l"><a href="#"><img src="'+value.facePic+'"></a></div>'
                            html += '<div class="gwc-md f-l"><h3><a href="#">'+text+'</a></h3>';
                            html += '<p class="gwc-p1 jx-p spqh-p">商品期号：<span>'+value.period+'</span></p><p class="gwc-p1">总需人次：<span>'+value.num+'</span></p>'
                            html += '<p class="gwc-p2 jx-p jxdj-p" time="'+value.finishDate+'" period="'+value.periodId+'" storeId="'+value.storeId+'">揭晓倒计时  <span>00:00:00</span></p>';
                            html += '</div><div style="clear:both;"></div></li>';
                        }
                    })
                    $(".list").html(html)
                    $("li[class='zxjx-li']").on("click",function () {
                        window.location.href="storeInfo.html?id="+$(this).attr("period");
                    })
                    $(".jxdj-p").each(function () {
                        $.time_warp($(this));
                    })
                    pageId++;
                    $.socrllLoad(code,ciphertext,pageId);
                }
            }
        })
    },
    get:function (obj,int) {
        var periodId = $(obj).attr("period");
        var storeId = $(obj).attr("storeId");
        $.ajax({
            "url": server.url + "/app/public/get.do",
            "data": {
                "code": channelLink.code,
                "ciphertext": channelLink.ciphertext,
                "storeId" : storeId,
                "periodId" : periodId
            },
            "type": "POST",
            "dataType": "json",
            "async": false,
            "success": function (data) {
                if(data.status == 1){
                    if(data.result == null){
                        return ;
                    }
                    var text = data.result.winner;
                    if(text != null && text.length > 25){
                        text = text.substr(0,25)+"...";
                    }
                    $(obj).siblings(".spqh-p").html('本期参与：<span>'+data.result.buyNum+'</span>');
                    $(obj).siblings("h3").html('获奖者：<a href="#">'+text+'</a>');
                    $(obj).html('揭晓日期：<span>'+new Date(data.result.winDate).format("yyyy-MM-dd")+'</span>')
                    $(obj).removeClass("jxdj-p");
                    window.clearInterval(int);
                }
            }
        })
    },
    /**
     *
     * 滚动加载
     * @param index
     * @param code
     * @param ciphertext
     * @param id
     * @param pageId
     */
    socrllLoad:function (code,ciphertext,pageId) {

        var loading = false;
        $(window).scroll(function(){
            if((($(window).scrollTop()+$(window).height())+50)>=$(document).height()){
                if(loading == false){
                    loading = true;
                    $.ajax({
                        "url": server.url + "/app/public/list.do",
                        "data": {
                            "code": code,
                            "ciphertext": ciphertext,
                            "pageId" : pageId
                        },
                        "type": "POST",
                        "dataType": "json",
                        "async": true,
                        "success": function (data) {
                            if(data.status == 1){
                                if(data.result == null || data.result.length < 10){
                                    return ;
                                }
                                var html = '';
                                $.each(data.result,function (index,value) {
                                    var time = new Date().getTime() - value.finishDate ;
                                    if(time > 300000){
                                        var text = value.winner;
                                        if(text != null && text.length > 25){
                                            text = text.substr(0,25)+"...";
                                        }
                                        html +='<li class="zxjx-li" period="'+value.periodId+'"><div class="hwc-tu fm-pic f-l"><a href="#"><img src="'+value.facePic+'"></a></div>'
                                        html += '<div class="gwc-md f-l"><h3><a href="#">获奖者：'+text+'</a></h3>';
                                        html += '<p class="gwc-p1 jx-p">本期参与：<span>'+value.buyNum+'</span></p><p class="gwc-p1">总需人次：<span>'+value.num+'</span></p>'
                                        html += '<p class="gwc-p2 jx-p">揭晓日期：<span>'+new Date(value.winDate).format("yyyy-MM-dd")+'</span></p>';
                                        html += '</div><div style="clear:both;"></div></li>';
                                    }else{
                                        var text = value.storeName;
                                        if(text != null && text.length > 25){
                                            text = text.substr(0,25)+"...";
                                        }
                                        html +='<li class="zxjx-li" period="'+value.periodId+'"><div class="hwc-tu fm-pic f-l"><a href="#"><img src="'+value.facePic+'"></a></div>'
                                        html += '<div class="gwc-md f-l"><h3><a href="#">'+text+'</a></h3>';
                                        html += '<p class="gwc-p1 jx-p spqh-p">商品期号：<span>'+value.period+'</span></p><p class="gwc-p1">总需人次：<span>'+value.num+'</span></p>'
                                        html += '<p class="gwc-p2 jx-p jxdj-p" time="'+value.finishDate+'" period="'+value.periodId+'" storeId="'+value.storeId+'">揭晓倒计时  <span>00:00:00</span></p>';
                                        html += '</div><div style="clear:both;"></div></li>';
                                    }
                                })
                                $(".list").append(html)
                                $("li[class='zxjx-li']").on("click",function () {
                                    window.location.href="storeInfo.html?id="+$(this).attr("period");
                                })
                                $(".jxdj-p").each(function () {

                                    $.time_warp($(this));
                                })
                                pageId++;
                                loading = false;
                            }
                        }
                    })

                }
            }
        });
    }
})