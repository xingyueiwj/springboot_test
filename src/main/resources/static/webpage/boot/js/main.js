// 初始化操作
var page = {};
page.lockPage = false;
$(function(){
    //加载主页面时获取session
    getSession();
});
function getSession(){
    $.ajax({
        type: "POST",
        url: "/login/getSession",
        data: {},
        dataType: "json",
        success: function(data){
            if(data){
                //已经登录,关闭模态,对限制取消
                $("#navContentId").find("ul").removeClass("hideNavCss");
                $(".unloadCss").text("欢迎您, " + data);
                $(".unloadCss").removeClass('unloadCss');
                $(".loadCss").find("button").text("注销");
                page.lockPage = true;
            }
        }
    });
}

function loadMyPage() {
    if (page.lockPage){
        $("#mainId").load('/webpage/view/myPage/page/myArticle.html');
    }else{
        $("#loginId").load('/webpage/view/login/page/login.html');
    }
}

function loadSkillInterlocution(){
    if (page.lockPage){
        $("#mainId").load('/webpage/view/skillInterlocution/page/allQuestion.html');
    }else{
        $("#loginId").load('/webpage/view/login/page/login.html');
    }
};

function loadSkillMap(){
    if (page.lockPage){
        $("#mainId").load('/webpage/view/skillMap/page/skillMap.html');
    }else{
        $("#loginId").load('/webpage/view/login/page/login.html');
    }
};

function loadManager(){
    if (page.lockPage){
        $("#mainId").load('/webpage/view/manager/page/manager.html');
    }else{
        $("#loginId").load('/webpage/view/login/page/login.html');
    }
};

function login(){
    if (page.lockPage){
        loginOut();
    }else{
        $("#loginId").load('/webpage/view/login/page/login.html');
    }
}

function loginOut(){
    $.ajax({
        type: "POST",
        url: "/login/loginOut",
        data: {},
        dataType: "json",
        success: function(data){
            if(data){
                window.location.reload();
            }
        }
    });
}