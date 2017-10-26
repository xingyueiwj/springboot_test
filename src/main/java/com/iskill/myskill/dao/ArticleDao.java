package com.iskill.myskill.dao;

import com.iskill.myskill.bean.ArticleBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ArticleDao {
    boolean addMyArticle(@Param("articleTitle") String articleTitle, @Param("articleContent") String articleContent);

    List<ArticleBean> getMyArticleList(@Param("limit")int limit, @Param("offset")int offset ,@Param("isValid")String isValid);

    int getMyArticleCount(@Param("isValid")String isValid);
}
