package com.iskill.myskill.service.serviceInterface;

import com.iskill.myskill.bean.ArticleBean;

import java.util.List;

public interface ArticleService {
    Boolean addMyArticle(String articleTitle, String articleContent);

    List<ArticleBean> getMyArticleList(int limit, int offset ,String isValid);

    int getMyArticleCount(String isValid);
}
