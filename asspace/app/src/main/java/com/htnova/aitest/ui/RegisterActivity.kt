package com.htnova.aitest.ui

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.htnova.aitest.R
import com.htnova.aitest.databinding.ActivityRegisterBinding
import com.htnova.aitest.repository.AuthRepository
import com.htnova.aitest.utils.TokenManager
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private lateinit var authRepository: AuthRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        TokenManager.init(this)
        authRepository = AuthRepository()

        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupClickListeners()
    }

    private fun setupClickListeners() {
        binding.registerButton.setOnClickListener {
            handleRegister()
        }

        binding.loginText.setOnClickListener {
            navigateToLogin()
        }
    }

    private fun handleRegister() {
        val username = binding.usernameEditText.text.toString().trim()
        val nickname = binding.nicknameEditText.text.toString().trim()
        val password = binding.passwordEditText.text.toString().trim()
        val confirmPassword = binding.confirmPasswordEditText.text.toString().trim()

        // 表单验证
        if (username.isEmpty()) {
            Toast.makeText(this, "请输入用户名", Toast.LENGTH_SHORT).show()
            return
        }

        if (username.length < 3) {
            Toast.makeText(this, "用户名至少3个字符", Toast.LENGTH_SHORT).show()
            return
        }

        if (password.isEmpty()) {
            Toast.makeText(this, "请输入密码", Toast.LENGTH_SHORT).show()
            return
        }

        if (password.length < 6) {
            Toast.makeText(this, "密码至少6个字符", Toast.LENGTH_SHORT).show()
            return
        }

        if (password != confirmPassword) {
            Toast.makeText(this, "两次输入的密码不一致", Toast.LENGTH_SHORT).show()
            return
        }

        // 执行注册
        performRegister(username, password, nickname.ifEmpty { null })
    }

    private fun performRegister(username: String, password: String, nickname: String?) {
        showLoading(true)

        lifecycleScope.launch {
            val result = authRepository.register(username, password, nickname)

            showLoading(false)

            result.onSuccess { userInfo ->
                Toast.makeText(
                    this@RegisterActivity,
                    "注册成功，请登录",
                    Toast.LENGTH_LONG
                ).show()
                navigateToLogin()
            }.onFailure { exception ->
                val message = exception.message ?: "注册失败，请稍后重试"
                Toast.makeText(this@RegisterActivity, message, Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun showLoading(show: Boolean) {
        binding.progressBar.visibility = if (show) android.view.View.VISIBLE else android.view.View.GONE
        binding.registerButton.isEnabled = !show
    }

    private fun navigateToLogin() {
        finish()
    }
}
