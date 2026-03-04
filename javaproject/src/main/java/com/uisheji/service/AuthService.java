package com.uisheji.service;

import com.uisheji.dto.request.LoginRequest;
import com.uisheji.dto.request.RegisterRequest;
import com.uisheji.dto.response.LoginResponse;

/**
 * 认证服务接口
 */
public interface AuthService {

    /**
     * 用户登录
     * @param request 登录请求
     * @return 登录响应（包含 token 和用户信息）
     */
    LoginResponse login(LoginRequest request);

    /**
     * 用户注册
     * @param request 注册请求
     * @return 登录响应
     */
    LoginResponse register(RegisterRequest request);

    /**
     * 用户退出
     */
    void logout();
}
