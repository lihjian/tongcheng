
var foot = function(index){

    var footHtml = '<ul class="quanbu-ul1" >    <li class="">    <div class="qu-tu1">    <a href="index.html" class="atu1"><img src="images/sjsc-02.gif"></a>    <a href="index.html" class="atu2"><img src="images/sjsc-15-1.gif"></a>    </div>    <a href="index.html" class="qu-ul1a">首页</a>    </li>    <li>    <div class="qu-tu1">    <a href="collecting.html" class="atu1"><img src="images/sjsc-16.png"></a>    <a href="#" class="atu2"><img src="images/sjsc-16-1.png"></a>    </div>    <a href="collecting.html" class="qu-ul1a">最新揭晓</a>    </li>    <li>    <div class="qu-tu1 gwc">    <a href="sprong_trolley.html" class="atu1"><span class="gwc_num"></span> <img src="images/sjsc-17.png"></a>    <a href="#" class="atu2"><img src="images/sjsc-17-1.png"></a>    </div>    <a href="sprong_trolley.html" class="qu-ul1a">购物车</a>    </li>    <li>    <div class="qu-tu1">    <a href="user.html" class="atu1"><img src="images/sjsc-18.png"></a>    <a href="user.html" class="atu2"><img src="images/sjsc18-1.png"></a>    </div>    <a href="user.html" class="qu-ul1a">我</a>    </li>    <div style="clear:both;"></div>    </ul>';
    $("body").append(footHtml);

    $(".quanbu-ul1 li").eq(index).addClass("current");
    var temp = sessionStorage.getItem("storeArray");
    if(temp != null && temp != ""){
        var num = temp.split(",").length
        if(num > 0){
            $(".gwc_num").text(num);
            $(".gwc_num").show();
        }else{
            $(".gwc_num").hide();
        }
    }else{
        $(".gwc_num").hide();
    }

}
