// 初始化操作
var page = {};
// page.lockPage = false;
$(function(){
    // 初始化加载首页面
    index();
    //加载主页面时获取session
    // if(page.lockPage){
    //     getSession();
    // }
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
                // $("#navContentId").find("ul").removeClass("hideNavCss");
                $(".unloadCss").text("欢迎您, " + data);
                $(".unloadCss").removeClass('unloadCss');
                $(".loadCss").find("button").text("注销");
                // page.lockPage = true;
            }
        }
    });
}
function index() {
    $("#mainId").load('/webpage/view/index/page/index.html');
}
function loadMyPage() {
    $("#mainId").load('/webpage/view/myPage/page/myPageIndex.html');
}

function loadSkillInterlocution(){
    $("#mainId").load('/webpage/view/skillInterlocution/page/allQuestion.html');
};

function loadSkillMap(){
    $("#mainId").load('/webpage/view/skillMap/page/skillMap.html');
};

function loadManager(){
    $("#mainId").load('/webpage/view/manager/page/manager.html');
};

function login(){
    $("#loginId").load('/webpage/view/login/page/login.html');
}

// function loginOut(){
//     $.ajax({
//         type: "POST",
//         url: "/login/loginOut",
//         data: {},
//         dataType: "json",
//         success: function(data){
//             if(data){
//                 window.location.reload();
//             }
//         }
//     });
// }

// var json_data = {id:12,name:"yang",email:"aaa@aaa.com"};
// sessionStorage.setItem("json_data",JSON.stringify(json_data));
//
// var json_data = JSON.parse(sessionStorage.getItem("json_data"));
