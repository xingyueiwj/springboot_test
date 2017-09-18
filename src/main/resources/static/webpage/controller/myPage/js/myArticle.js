$(function () {
    initTable();
});

/*function doQuery(params){
    $('#demo-table').bootstrapTable('refresh');    //刷新表格
}*/

function initTable(){
    var url = "";
    $('#demo-table').bootstrapTable({
        method:'POST',
        dataType:'json',
        contentType: "application/x-www-form-urlencoded",
        cache: false,
        striped: true,                              //是否显示行间隔色
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
        url:url,
        height: $(window).height() - 110,
        width:$(window).width(),
        // showColumns:true,
        pagination:true,
        queryParams : queryParams,
        // minimumCountColumns:2,
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 20,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        responseHandler: responseHandler,
        columns: [
        {
            field : 'articleName',
            title : '名称',
            width : 200,
            align : 'center',
            valign : 'middle',
            sortable : true,
        }, {
            field : 'simpleDesc',
            title : '简要描述',
            width : 200,
            align : 'center',
            valign : 'middle'
        }, {
            field : 'createTime',
            title : '创建时间',
            width : 200,
            align : 'center',
            valign : 'left',
            formatter : function (value, row, index){
                return new Date(value).format('yyyy-MM-dd hh:mm:ss');
            }
        }, {
            field: 'operate',
            title: '操作',
            width : 200,
            align: 'center',
            events: operateEvents,
            formatter: operateFormatter
            }]
    });
}

function queryParams(params) {
    var param = {
        limit : this.limit, // 页面大小
        offset : this.offset, // 页码
        pageindex : this.pageNumber,
        pageSize : this.pageSize
    }
    return param;
} 

// 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，
// 数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，
// 同时去掉responseHandler: responseHandler就可以了，
function responseHandler(res) { 
    if (res) {
        return {
            "rows" : res.result,
            "total" : res.totalCount
        };
    } else {
        return {
            "rows" : [],
            "total" : 0
        };
    }
}
//操作按钮
function operateFormatter(value, row, index) {
    return [
        '<button type="button" class="RoleOfA btn btn-default  btn-sm" style="margin-right:15px;">A权限</button>',
        '<button type="button" class="RoleOfB btn btn-default  btn-sm" style="margin-right:15px;">B权限</button>',
        '<button type="button" class="RoleOfC btn btn-default  btn-sm" style="margin-right:15px;">C权限</button>',
        '<button type="button" class="RoleOfD btn btn-default  btn-sm" style="margin-right:15px;">绑定D</button>',
        '<button type="button" class="RoleOfEdit btn btn-default  btn-sm" style="margin-right:15px;">编辑</button>'
    ].join('');
}

window.operateEvents = {
    'click .RoleOfA': function (e, value, row, index) {
    alert("A");            
},
    'click .RoleOfB': function (e, value, row, index) {
    alert("B");            
},
    'click .RoleOfC': function (e, value, row, index) {
    alert("C");            
},
    'click .RoleOfEdit': function (e, value, row, index) {
    }
}