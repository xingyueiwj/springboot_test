package com.iskill.myskill.service.serviceInterface;

import javax.servlet.http.HttpServletRequest;

public interface UserService {
    boolean addUser(String userAccount, String userPassword);
    boolean checkUserAccount(String userAccount);
    boolean getUserInfo(String userAccount, String userPassword, HttpServletRequest httpServletRequest);
}
