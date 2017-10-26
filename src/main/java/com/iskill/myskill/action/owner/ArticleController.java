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
