package com.htnova.aitest.ui

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.htnova.aitest.R
import com.htnova.aitest.databinding.ActivityLoginBinding
import com.htnova.aitest.repository.AuthRepository
import com.htnova.aitest.utils.TokenManager
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var authRepository: AuthRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        TokenManager.init(this)
        authRepository = AuthRepository()

        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 检查是否已登录
        if (authRepository.isLoggedIn()) {
            navigateToHome()
            return
        }

        // 加载保存的凭据
        loadSavedCredentials()

        setupClickListeners()
    }

    private fun loadSavedCredentials() {
        val (username, password, remember) = TokenManager.getSavedCredentials()
        binding.usernameEditText.setText(username)
        binding.passwordEditText.setText(password)
        binding.rememberCheckBox.isChecked = remember
    }

    private fun setupClickListeners() {
        binding.loginButton.setOnClickListener {
            handleLogin()
        }

        binding.registerText.setOnClickListener {
            navigateToRegister()
        }
    }

    private fun handleLogin() {
        val username = binding.usernameEditText.text.toString().trim()
        val password = binding.passwordEditText.text.toString().trim()

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

        // 执行登录
        performLogin(username, password)
    }

    private fun performLogin(username: String, password: String) {
        showLoading(true)

        lifecycleScope.launch {
            val result = authRepository.login(username, password)

            showLoading(false)

            result.onSuccess { response ->
                // 保存凭据
                TokenManager.saveCredentials(
                    username,
                    password,
                    binding.rememberCheckBox.isChecked
                )

                Toast.makeText(this@LoginActivity, response.message, Toast.LENGTH_SHORT).show()
                navigateToHome()
            }.onFailure { exception ->
                val message = exception.message ?: "登录失败，请稍后重试"
                Toast.makeText(this@LoginActivity, message, Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun showLoading(show: Boolean) {
        binding.progressBar.visibility = if (show) android.view.View.VISIBLE else android.view.View.GONE
        binding.loginButton.isEnabled = !show
    }

    private fun navigateToHome() {
        val intent = android.content.Intent(this, HomeActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun navigateToRegister() {
        val intent = android.content.Intent(this, RegisterActivity::class.java)
        startActivity(intent)
    }
}
