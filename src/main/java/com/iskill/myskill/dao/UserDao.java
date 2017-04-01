package com.iskill.myskill.dao;
import com.iskill.myskill.bean.UserBean;

/**
 * mapper接口,被配置扫描
 */
public interface UserDao {
    public UserBean findUserInfo();
}
