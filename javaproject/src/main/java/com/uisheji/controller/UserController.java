package com.uisheji.controller;

import com.uisheji.dto.response.UserResponse;
import com.uisheji.exception.ApiResponse;
import com.uisheji.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 用户控制器
 */
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "用户接口", description = "用户信息相关接口")
public class UserController {

    private final UserService userService;

    @GetMapping("/info")
    @Operation(summary = "获取当前用户信息")
    public ApiResponse<UserResponse> getCurrentUser() {
        UserResponse user = userService.getCurrentUser();
        return ApiResponse.success("获取成功", user);
    }
}
