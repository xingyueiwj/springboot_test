package com.iskill.myskill.service.serviceImpl;

import com.iskill.myskill.bean.ArticleBean;
import com.iskill.myskill.dao.ArticleDao;
import com.iskill.myskill.service.serviceInterface.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public Boolean updateMyArticle(String articleId, String articleTitle, String articleContent, String isValid){
        return articleDao.updateMyArticle(articleId, articleTitle, articleContent,isValid);
    }

    @Override
    public Boolean deleteMyArticle(String articleId) {
        return articleDao.deleteMyArticle(getList(articleId));
    }

    @Override
    public List<ArticleBean> getMyArticleList(int limit, int offset, String isValid) {
        return articleDao.getMyArticleList(limit, offset, isValid);
    }

    @Override
    public Integer getMyArticleCount(String isValid) {
        return articleDao.getMyArticleCount(isValid);
    }

    public List<String> getList(String id) {
        List<String> list = new ArrayList<String>();
        String[] str = id.split(",");
        for (int i = 0; i < str.length; i++) {
            list.add(str[i]);
        }
        return list;
    }
}
