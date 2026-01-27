package com.htnova.aitest.repository

import com.htnova.aitest.model.LoginRequest
import com.htnova.aitest.model.LoginResponse
import com.htnova.aitest.model.RegisterRequest
import com.htnova.aitest.model.UserInfo
import com.htnova.aitest.network.NetworkConfig
import com.htnova.aitest.utils.TokenManager

class AuthRepository {

    suspend fun login(username: String, password: String): Result<LoginResponse> {
        return try {
            val response = NetworkConfig.apiService.login(LoginRequest(username, password))

            if (response.code == 200 && response.data != null) {
                TokenManager.saveToken(response.data.token)
                TokenManager.saveUserInfo(response.data.userInfo)
                Result.success(response)
            } else {
                Result.failure(Exception(response.message))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun register(username: String, password: String, nickname: String?): Result<UserInfo> {
        return try {
            val response = NetworkConfig.apiService.register(RegisterRequest(username, password, nickname))

            if (response.code == 201 && response.data != null) {
                Result.success(response.data)
            } else {
                Result.failure(Exception(response.message))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun logout(): Result<Unit> {
        return try {
            val token = TokenManager.getToken()
            if (token != null) {
                NetworkConfig.apiService.logout("Bearer $token")
            }
            TokenManager.clearToken()
            TokenManager.clearUserInfo()
            Result.success(Unit)
        } catch (e: Exception) {
            // 即使网络请求失败，也要清除本地数据
            TokenManager.clearToken()
            TokenManager.clearUserInfo()
            Result.success(Unit)
        }
    }

    fun getUserInfo(): UserInfo? {
        return TokenManager.getUserInfo()
    }

    fun isLoggedIn(): Boolean {
        return TokenManager.getToken() != null
    }
}
