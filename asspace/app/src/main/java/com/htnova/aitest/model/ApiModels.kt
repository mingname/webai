package com.htnova.aitest.model

import com.google.gson.annotations.SerializedName

data class LoginRequest(
    val username: String,
    val password: String
)

data class LoginResponse(
    val code: Int,
    val message: String,
    val data: LoginData?
)

data class LoginData(
    val token: String,
    val userInfo: UserInfo
)

data class UserInfo(
    @SerializedName("id")
    val id: Int,
    @SerializedName("username")
    val username: String,
    @SerializedName("nickname")
    val nickname: String?,
    @SerializedName("avatar")
    val avatar: String?,
    @SerializedName("email")
    val email: String?,
    @SerializedName("phone")
    val phone: String?,
    @SerializedName("created_at")
    val createdAt: String?
)

data class RegisterRequest(
    val username: String,
    val password: String,
    val nickname: String?
)

data class ApiResponse<T>(
    val code: Int,
    val message: String,
    val data: T?
)
