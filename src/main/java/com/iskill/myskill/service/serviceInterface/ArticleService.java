package com.iskill.myskill.service.serviceInterface;

import com.iskill.myskill.bean.ArticleBean;

import java.util.List;

public interface ArticleService {
    Boolean addMyArticle(String articleTitle, String articleContent);

    Boolean updateMyArticle(String articleId, String articleTitle, String articleContent, String isValid);

    Boolean deleteMyArticle(String articleId);

    List<ArticleBean> getMyArticleList(int limit, int offset ,String isValid);

    Integer getMyArticleCount(String isValid);
}
