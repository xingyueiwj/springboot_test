package com.iskill.myskill.action.login;

import com.iskill.myskill.bean.UserBean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;

/**
 * Created by Administrator on 2017/2/2 0002.
 */
@Controller
@Scope("prototype")
public class UserLogin {
    @RequestMapping("/login")
    public ModelAndView userLogin(ModelAndView model, @Valid UserBean user, BindingResult result){
        System.out.println("账号：" + user.getName());
        System.out.println("密码：" + user.getPassword());
        //获取数据库账号密码,如果账号存在则提示,如果账号密码一样则登录正确,否则提示不正确

        return model;
    }
}
