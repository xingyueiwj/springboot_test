package com.iskill.myskill.dao;
import org.apache.ibatis.annotations.Param;

/**
 * mapper接口,被配置扫描
 */
public interface UserDao {
    public Integer getUserInfo(@Param("userAccount") String userAccount, @Param("userPassword") String userPassword);
    public Integer checkUserAccount(@Param("userAccount") String userAccount);
    public Integer addUser(@Param("userAccount") String userAccount, @Param("userPassword") String userPassword);
}
