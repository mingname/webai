package com.uisheji.service.impl;

import com.uisheji.dto.request.LoginRequest;
import com.uisheji.dto.request.RegisterRequest;
import com.uisheji.dto.response.LoginResponse;
import com.uisheji.dto.response.UserResponse;
import com.uisheji.entity.User;
import com.uisheji.exception.BusinessException;
import com.uisheji.repository.UserRepository;
import com.uisheji.service.AuthService;
import com.uisheji.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 认证服务实现类
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest request) {
        log.info("用户登录: {}", request.getUsername());

        // 查找用户
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BusinessException("用户名或密码错误"));

        // 验证密码
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException("用户名或密码错误");
        }

        // 生成 token
        String token = jwtUtil.generateToken(user);

        // 更新最后登录时间
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        // 构建响应
        UserResponse userInfo = new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                user.getAvatar(),
                user.getEmail(),
                user.getPhone(),
                user.getCreatedAt()
        );

        return new LoginResponse(token, userInfo);
    }

    @Override
    @Transactional
    public LoginResponse register(RegisterRequest request) {
        log.info("用户注册: {}", request.getUsername());

        // 检查用户名是否存在
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BusinessException("用户名已存在");
        }

        // 检查邮箱是否存在
        if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("邮箱已被注册");
        }

        // 创建用户
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNickname(request.getNickname() != null ? request.getNickname() : request.getUsername());
        user.setAvatar(generateDefaultAvatar(request.getUsername()));
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        user = userRepository.save(user);

        log.info("用户注册成功: {}", user.getUsername());

        // 自动登录
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(request.getUsername());
        loginRequest.setPassword(request.getPassword());

        return login(loginRequest);
    }

    @Override
    public void logout() {
        // JWT 是无状态的，客户端删除 token 即可
        log.info("用户退出登录");
    }

    /**
     * 生成默认头像 URL
     * @param username 用户名
     * @return 头像 URL
     */
    private String generateDefaultAvatar(String username) {
        return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + username;
    }
}
