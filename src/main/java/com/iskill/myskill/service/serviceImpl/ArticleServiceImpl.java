package com.iskill.myskill.service.serviceImpl;

import com.iskill.myskill.bean.ArticleBean;
import com.iskill.myskill.dao.ArticleDao;
import com.iskill.myskill.dao.UserDao;
import com.iskill.myskill.service.serviceInterface.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleDao articleDao;
    @Override
    public Boolean addMyArticle(String articleTitle, String articleContent) {
        return articleDao.addMyArticle(articleTitle, articleContent);
    }

    @Override
    public List<ArticleBean> getMyArticleList(int limit, int offset, String isValid) {
        return articleDao.getMyArticleList(limit, offset, isValid);
    }

    @Override
    public int getMyArticleCount(String isValid) {
        return articleDao.getMyArticleCount(isValid);
    }
}
