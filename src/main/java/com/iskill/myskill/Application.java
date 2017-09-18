package com.iskill.myskill;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
//spring自动配置环境
@EnableAutoConfiguration
//声明为spring boot应用,根据classpath创建合适的applicationContext实例
@SpringBootApplication
//开启注解扫描,扫描**/*.class,应该就是扫描包下面的类
@ComponentScan
//扫描这个路径下面的mapper文件,扫描mybatis接口文件
@MapperScan("com.iskill.myskill.dao")
public class Application {
    //日志
    private static Logger logger = Logger.getLogger(Application.class);
    //声明为bean
    @Bean
    //读取配置文件,需要读取application.properties文件,然后自动注入,注意添加bean注解,这样才能被扫描
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        return new org.apache.tomcat.jdbc.pool.DataSource();
    }

    //设置数据源同时获取mybatis.xml资源,扫描xml文件,mybatis解析器对结果进行映射
    @Bean
    public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource());
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactoryBean.setMapperLocations(resolver.getResources("classpath:/mybatis/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }

    //设置事务
    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }

    /**
     * 程序启动
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        logger.info("Spring Boot Start Success");
    }

}
