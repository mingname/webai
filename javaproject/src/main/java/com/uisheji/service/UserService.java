package com.uisheji.service;

import com.uisheji.dto.response.UserResponse;

/**
 * 用户服务接口
 */
public interface UserService {

    /**
     * 获取当前用户信息
     * @return 用户信息
     */
    UserResponse getCurrentUser();
}
