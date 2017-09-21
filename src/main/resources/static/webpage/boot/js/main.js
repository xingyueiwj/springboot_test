// 初始化操作
$(function(){
    // $("#mainId").load('/webpage/view/index/page/index.html');
    //检测有没有登录,如果没有则不能点击其他四个按钮
    $("#navContentId").find("a").removeAttr("onclick");
    // var onclicks = $("#navContentId").find("a");
    // onclicks[0].attr("onclick","loadMyPage()");
    // onclicks[1].attr("onclick","loadSkillInterlocution()");
    // onclicks[2].attr("onclick","skillMap()");
    // onclicks[3].attr("onclick","manager()");
});

function loadMyPage() {
    $("#mainId").load('/webpage/view/myPage/page/myArticle.html');
}

function loadSkillInterlocution(){
    $("#mainId").load('/webpage/view/skillInterlocution/page/allQuestion.html');
};

function skillMap(){
    $("#mainId").load('/webpage/view/skillMap/page/skillMap.html');
};

function manager(){
    $("#mainId").load('/webpage/view/manager/page/manager.html');
};