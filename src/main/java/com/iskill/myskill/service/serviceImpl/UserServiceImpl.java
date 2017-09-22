package com.iskill.myskill.service.serviceImpl;


import com.iskill.myskill.bean.UserBean;
import com.iskill.myskill.dao.UserDao;
import com.iskill.myskill.service.serviceInterface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    public boolean getUserInfo(String userAccount, String userPassword, HttpServletRequest httpServletRequest){
        Integer findUserResult = userDao.getUserInfo(userAccount, userPassword);
        if(findUserResult != null && findUserResult > 0){
            //登录成功,将用户信息保存到session中
            HttpSession session = httpServletRequest.getSession();
            UserBean userBean = new UserBean();
            userBean.setName(userAccount);
            userBean.setPassword(userPassword);
            session.setAttribute("userInfo", userBean);
            return true;
        }
        return false;
    }

    public boolean addUser(String userAccount, String userPassword){
        Integer addResult = userDao.addUser(userAccount, userPassword);
        if(addResult != null && addResult > 0){
            return true;
        }
        return false;
    }

    @Override
    public boolean checkUserAccount(String userAccount) {
        Integer checkResult = userDao.checkUserAccount(userAccount);
        if(checkResult != null && checkResult > 0){
            return true;
        }
        return false;
    }
}
