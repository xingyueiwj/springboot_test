package com.iskill.myskill.action.owner;

import com.iskill.myskill.bean.ArticleBean;
import com.iskill.myskill.bean.ResultList;
import com.iskill.myskill.constant.Constants;
import com.iskill.myskill.service.serviceInterface.ArticleService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collections;
import java.util.List;

@Controller
@Scope("prototype")
@RequestMapping("/article")
@ResponseBody
public class ArticleController {
    @Autowired
    private ArticleService articleService;
    private Logger logger = Logger.getLogger(ArticleController.class);
    @RequestMapping(value = "/addMyArticle",method = RequestMethod.POST)
    public boolean addMyArticle(String articleTitle, String articleContent){
        if (StringUtils.isNotEmpty(articleTitle) && StringUtils.isNotEmpty(articleContent)){
            boolean isAddArticle = articleService.addMyArticle(articleTitle, articleContent);
            if (isAddArticle){
                logger.info("文章新增成功!");
            }
            return isAddArticle;
        }
        return false;
    }

    @RequestMapping(value = "/updateMyArticle",method = RequestMethod.POST)
    public boolean updateMyArticle(String articleId,String articleTitle, String articleContent){
        if (StringUtils.isNotEmpty(articleId) && StringUtils.isNotEmpty(articleTitle) && StringUtils.isNotEmpty(articleContent)){
            boolean isUpdateArticle = articleService.updateMyArticle(articleId, articleTitle, articleContent, Constants.isValid);
            if (isUpdateArticle){
                logger.info("文章修改成功!");
            }
            return isUpdateArticle;
        }
        return false;
    }

    @RequestMapping(value = "/deleteMyArticle",method = RequestMethod.POST)
    public boolean deleteMyArticle(String articleIds){
        if (StringUtils.isNotEmpty(articleIds)){
            boolean isDeleteArticle = articleService.deleteMyArticle(articleIds);
            if (isDeleteArticle){
                logger.info("文章删除成功!");
            }
            return isDeleteArticle;
        }
        return false;
    }

    @RequestMapping(value = "/getMyArticleList", method = RequestMethod.GET)
    public ResultList getMyArticleList(int limit, int offset){
        int articleCount = articleService.getMyArticleCount(Constants.isValid);
        if (articleCount > 0){
            List<ArticleBean> articleList = articleService.getMyArticleList(limit, offset, Constants.isValid);
            ResultList resultList = new ResultList();
            resultList.setRows(articleList);
            resultList.setTotal(articleCount);
            resultList.setOffset(offset);
            resultList.setSuccess(true);
            return resultList;
        }
        return null;
    }
}
