package com.iskill.myskill.service;


import com.iskill.myskill.bean.UserBean;
import com.iskill.myskill.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    public UserBean getUserInfo(){
        UserBean user = userDao.findUserInfo();
        return user;
    }

}
