$(function(){
	internalnav();
	initTable();
});

function showSection(id){
	var secions = $(".mainContext").find("section");
	for (var i = 0; i < secions.length; i++) {
		if ($(secions[i]).attr("id") != id) {
			$(secions[i]).css('display','none');
		}else{
			$(secions[i]).css('display','block');
		}
	}
}

function internalnav(){
	var mainContext = $(".mainContext");
	if (!mainContext) return false;
	var navs = mainContext.find("nav");
	if (!navs) return false;
	var nav = navs[0];
	var links = $(nav).find("a");
	for (var i = 0;i<links.length;i++) {
		var sectionId = $(links[i]).attr("href").split("#")[1];
		if (!sectionId) continue;
		if (i > 0) {
			$("#" + sectionId).css('display','none');
		}
		links[i].destination = sectionId;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		}
	}
}
function initTable(){
	//1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
}

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#myArticleList').bootstrapTable({
            url: '/article/getMyArticleList',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            dataType:'json',
            contentType:'application/x-www-form-urlencoded',
            toolbar: '#toolbar',                //工具按钮用哪个容器
            // striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 15,                       //每页的记录行数（*）
            pageList: [15, 30, 60, 100],        //可供选择的每页的行数（*）
            // search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            // strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            // showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 820,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                checkbox: true
            }, {
                field: 'title',
                title: '标题',
                width:200
            }, {
                field: 'articleContent',
                title: '文章内容',
                width:700,
                formatter:function (value,row,index) {
                    if (row && row.articleContent && row.articleContent.length > 10){
                        return row.articleContent.substring(0,80) + "...";
                    }else{
                        return row.articleContent;
                    }
                }
            }, {
                field: 'createTime',
                title: '创建时间',
                width:300,
            } ]
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset  //页码
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = new Object();
    oInit.Init = function () {
        //初始化页面上面的按钮事件
        $("#myArticle_btn_add").click(function(){
            openModal();
        });
        $("#addMyArticle").click(function(){
            addMyArticle();
        });

        $("#myArticle_btn_edit").click(function(){
            updateMyArticle();
        });
        $("#myArticle_btn_delete").click(function(){
            deleteMyArticle();
        });
    };
    return oInit;
};

function openModal() {
    $("#addMyArticleModal").modal();
}

function addMyArticle() {
    var articleTitle = $("#myArticleTitle").val();
    var articleContent = $("#myArticleDetail").val();
    if(articleTitle && articleContent){
        $.ajax({
            type: "post",
            url: "/article/addMyArticle",
            data: {articleTitle:articleTitle, articleContent:articleContent},
            dataType: "json",
            success: function(data){
                if (data){
                    $("#addMyArticleModal").modal("hide");
                    $("#myArticleList").bootstrapTable('refresh');
                }
            }
        });
    }
}

function updateMyArticle() {
    debugger
    var getSelection = $('#myArticleList').bootstrapTable('getSelections');
    if (getSelection.length == 0){
        return false;
    }
    console.info(getSelection);
}

function deleteMyArticle() {

}
