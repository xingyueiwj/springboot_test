$(function(){
    initArticles();
});

function initPagination(currentpage,totalPages){
    var options = {
        currentPage:currentpage,
        totalPages:totalPages,
        bootstrapMajorVersion: 3,
        onPageClicked : function(event, originalEvent, type,page){
            initArticles(page);
        }
    }
    $('#paginator').bootstrapPaginator(options);

}

function initArticles(page){
    var offset = (page-1) * 5 || 0;
    var limit = 5;
    $.ajax({
        type: "get",
        url: "/article/getMyArticleList",
        data: {offset : offset,limit :limit},
        dataType: "json",
        success: function(data){
            if (data && data.rows){
                if(data.total > 5){
                    if(data.total % 2 == 0){
                        initPagination(page||1,data.total/5);
                    }else{
                        initPagination(page||1,data.total/5+1);
                    }
                }
                $(".skillArticle").text("");
                $(".articleListul").text("");
                for (var i = 0;i<data.rows.length;i++){
                    var title = data.rows[i].title;
                    var articleContent = data.rows[i].articleContent;
                    var titleDiv = "<div>" +title + "</div>";
                    var articleContentDiv = "<div>" +articleContent + "</div>";
                    var articleList = "<li><a href=''>" +title+ "</a></li>";

                    $(".skillArticle").append(titleDiv).append(articleContentDiv);
                    $(".articleListul").append(articleList);
                }
            }
        }
    })
}
