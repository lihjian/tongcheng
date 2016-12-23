/**
 * 用户配置
 */
var SessionStorageUtil = {
	//设置密文
    "setUserId":function(){
    	var val = SessionStorageUtil.getQueryString("userId");
    	if(val){
    		sessionStorage.yydb_userid = val;
    	}
    },
    "getUserId":function(){
    	if(!sessionStorage.yydb_userid){
    		sessionStorage.yydb_userid = 0;
    	}
    	return sessionStorage.yydb_userid;
    },
    "setUserName":function(){
    	var val = SessionStorageUtil.getQueryString("userName");
    	if(val){
    		sessionStorage.yydb_username = val;
    	}
    },
    "getUserName":function(){
    	if(!sessionStorage.yydb_username){
    		sessionStorage.yydb_username = "";
    	}
    	return sessionStorage.yydb_username;
    },
    //设置渠道商编号
    "setCode":function(){
    	var val = SessionStorageUtil.getQueryString("code");
    	if(val){
    		sessionStorage.yydb_code = val;
    	}
    },
    "getCode":function(){
    	if(!sessionStorage.yydb_code){
    		sessionStorage.yydb_code = "";
    	}
    	return sessionStorage.yydb_code;
    },
    "setCiphertext":function(){
    	var val = SessionStorageUtil.getQueryString("ciphertext");
    	if(val){
    		sessionStorage.yydb_ciphertext = val;
    	}
    },
    "getCiphertext":function(){
    	if(!sessionStorage.yydb_ciphertext){
    		sessionStorage.yydb_ciphertext = "";
    	}
    	return sessionStorage.yydb_ciphertext;
    },
    "getQueryString":function(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
   
}

SessionStorageUtil.setUserId();
SessionStorageUtil.setUserName();
SessionStorageUtil.setCode();
SessionStorageUtil.setCiphertext();