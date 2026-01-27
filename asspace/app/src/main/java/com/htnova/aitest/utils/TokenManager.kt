package com.htnova.aitest.utils

import android.content.Context
import android.content.SharedPreferences
import com.htnova.aitest.model.UserInfo
import com.google.gson.Gson

object TokenManager {
    private const val PREFS_NAME = "app_prefs"
    private const val KEY_TOKEN = "token"
    private const val KEY_USER_INFO = "user_info"
    private const val KEY_USERNAME = "username"
    private const val KEY_PASSWORD = "password"
    private const val KEY_REMEMBER = "remember_password"

    private lateinit var prefs: SharedPreferences
    private val gson = Gson()

    fun init(context: Context) {
        prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }

    fun saveToken(token: String) {
        prefs.edit().putString(KEY_TOKEN, token).apply()
    }

    fun getToken(): String? {
        return prefs.getString(KEY_TOKEN, null)
    }

    fun clearToken() {
        prefs.edit().remove(KEY_TOKEN).apply()
    }

    fun saveUserInfo(userInfo: UserInfo) {
        val json = gson.toJson(userInfo)
        prefs.edit().putString(KEY_USER_INFO, json).apply()
    }

    fun getUserInfo(): UserInfo? {
        val json = prefs.getString(KEY_USER_INFO, null)
        return if (json != null) {
            gson.fromJson(json, UserInfo::class.java)
        } else {
            null
        }
    }

    fun clearUserInfo() {
        prefs.edit().remove(KEY_USER_INFO).apply()
    }

    fun saveCredentials(username: String, password: String, remember: Boolean) {
        if (remember) {
            prefs.edit()
                .putString(KEY_USERNAME, username)
                .putString(KEY_PASSWORD, password)
                .putBoolean(KEY_REMEMBER, true)
                .apply()
        } else {
            prefs.edit()
                .remove(KEY_USERNAME)
                .remove(KEY_PASSWORD)
                .putBoolean(KEY_REMEMBER, false)
                .apply()
        }
    }

    fun getSavedCredentials(): Triple<String?, String?, Boolean> {
        val username = prefs.getString(KEY_USERNAME, null)
        val password = prefs.getString(KEY_PASSWORD, null)
        val remember = prefs.getBoolean(KEY_REMEMBER, false)
        return Triple(username, password, remember)
    }

    fun clearAll() {
        prefs.edit().clear().apply()
    }
}
