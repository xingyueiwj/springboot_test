package com.iskill.myskill.action.system;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 用于跳转,如果没有登录就跳到登录页面,否则跳到首页
 * Created by Administrator on 2017/1/26 0026.
 */
@Controller
@Scope("prototype")
public class SystemControl {
    private Logger logger = Logger.getLogger(SystemControl.class);
    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String index(){
        logger.info("<---进入主页方法中--->");
        return "main";
    }
}