package com.iskill.myskill.dao;

import com.iskill.myskill.bean.ArticleBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ArticleDao {
    Boolean addMyArticle(@Param("articleTitle") String articleTitle, @Param("articleContent") String articleContent);

    Boolean updateMyArticle(@Param("articleId")String articleId, @Param("articleTitle")String articleTitle, @Param("articleContent")String articleContent, @Param("isValid")String isValid);

    Boolean deleteMyArticle(List<String> articleId);

    List<ArticleBean> getMyArticleList(@Param("limit")int limit, @Param("offset")int offset ,@Param("isValid")String isValid);

    Integer getMyArticleCount(@Param("isValid")String isValid);
}
