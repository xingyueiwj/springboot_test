package com.iskill.myskill.action.login;

import com.iskill.myskill.bean.UserBean;
import com.iskill.myskill.service.serviceInterface.UserService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

/**
 * Created by Administrator on 2017/2/2 0002.
 */
@Controller
@Scope("prototype")
@RequestMapping("/login")
@ResponseBody
public class UserLogin {
    @Autowired
    private UserService userService;

    private Logger logger = Logger.getLogger(UserLogin.class);
    /**
     * 用户登录,判断是否已经注册
     * @param userAccount
     * @param userPassword
     * @return
     */
    @RequestMapping("/userLogin")
    public boolean userLogin(@Valid String userAccount, @Valid String userPassword, HttpServletRequest httpServletRequest){
        //获取数据库账号密码,如果账号存在则提示,如果账号密码一样则登录正确,否则提示不正确
        if (StringUtils.isNotEmpty(userAccount) && StringUtils.isNotEmpty(userPassword)){
            return userService.getUserInfo(userAccount, userPassword, httpServletRequest);
        }
        return false;
    }

    /**
     * 判断用户名是否已经存在
     * @param userAccount
     * @return
     */
    @RequestMapping("/checkUserAccount")
    public boolean checkUserAccount(@Valid String userAccount){
        //获取数据库账号是否存在
        if (StringUtils.isNotEmpty(userAccount)){
            return userService.checkUserAccount(userAccount);
        }
        return false;
    }

    /**
     * 注册用户
     * @param userAccount
     * @param userPassword
     * @return
     */
    @RequestMapping("/registerUserAccount")
    public boolean registerUserAccount(@Valid String userAccount, @Valid String userPassword, @Valid String repeat_password){
        //判断账号密码的有效性
        if(StringUtils.isNotEmpty(userAccount)
                && StringUtils.isNotEmpty(userPassword)
                && StringUtils.isNotEmpty(repeat_password)
                && userPassword.equals(repeat_password)){
            return userService.addUser(userAccount,userPassword);
        }
        return false;
    }

    /**
     * 获取session
     * @return
     */
    @RequestMapping("/getSession")
    public String getSession(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        UserBean userInfo = (UserBean)session.getAttribute("userInfo");
        //获取到session,已经登录
        if(userInfo != null){
            userInfo.getName();
            return userInfo.getName();
        }
        return "";
    }

    /**
     * 登出功能
     * @return
     */
    @RequestMapping("/loginOut")
    public boolean loginOut(HttpServletRequest httpServletRequest){
        try {
            HttpSession session = httpServletRequest.getSession();
            session.removeAttribute("userInfo");
//            session.invalidate();
            return true;
        }catch (Exception e){
            logger.info("login out fail");
        }
        return false;
    }

}
