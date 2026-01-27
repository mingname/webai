package com.htnova.aitest.ui

import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AlertDialog
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.htnova.aitest.R
import com.htnova.aitest.adapter.Project
import com.htnova.aitest.adapter.ProjectAdapter
import com.htnova.aitest.adapter.Stat
import com.htnova.aitest.adapter.StatAdapter
import com.htnova.aitest.databinding.ActivityHomeBinding
import com.htnova.aitest.repository.AuthRepository
import com.htnova.aitest.utils.TokenManager
import kotlinx.coroutines.launch

class HomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityHomeBinding
    private lateinit var authRepository: AuthRepository
    private lateinit var drawerLayout: DrawerLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        TokenManager.init(this)
        authRepository = AuthRepository()

        binding = ActivityHomeBinding.inflate(layoutInflater)
        setContentView(binding.root)

        drawerLayout = binding.root as DrawerLayout

        setupUI()
        loadUserInfo()
        setupTabs()
        setupNavigation()
    }

    private fun setupUI() {
        // 设置用户信息
        val userInfo = authRepository.getUserInfo()
        binding.usernameText.text = userInfo?.nickname ?: "用户"

        // 加载头像
        if (!userInfo?.avatar.isNullOrEmpty()) {
            Glide.with(this)
                .load(userInfo?.avatar)
                .placeholder(android.R.drawable.ic_menu_myplaces)
                .error(android.R.drawable.ic_menu_myplaces)
                .circleCrop()
                .into(binding.userAvatar)
        }

        // 退出按钮
        binding.logoutButton.setOnClickListener {
            handleLogout()
        }

        // 菜单按钮
        binding.menuButton.setOnClickListener {
            drawerLayout.openDrawer(GravityCompat.START)
        }
    }

    private fun loadUserInfo() {
        val userInfo = authRepository.getUserInfo()
        userInfo?.let { user ->
            binding.usernameText.text = user.nickname ?: user.username

            if (!user.avatar.isNullOrEmpty()) {
                Glide.with(this)
                    .load(user.avatar)
                    .placeholder(android.R.drawable.ic_menu_myplaces)
                    .error(android.R.drawable.ic_menu_myplaces)
                    .circleCrop()
                    .into(binding.userAvatar)
            }
        }
    }

    private fun setupTabs() {
        // 初始化项目列表
        val projects = listOf(
            Project(1, "项目 1", "UI设计管理系统", android.R.drawable.ic_menu_agenda),
            Project(2, "项目 2", "移动应用开发", android.R.drawable.ic_menu_call),
            Project(3, "项目 3", "数据分析平台", android.R.drawable.ic_menu_gallery)
        )

        val projectAdapter = ProjectAdapter(projects) { project ->
            showToast("点击了: ${project.title}")
        }

        binding.projectsRecyclerView.apply {
            layoutManager = LinearLayoutManager(this@HomeActivity)
            adapter = projectAdapter
        }

        // 初始化统计列表
        val stats = listOf(
            Stat(1, "统计数据 1", "活跃用户数量", android.R.drawable.ic_menu_sort_by_size),
            Stat(2, "统计数据 2", "项目完成率", android.R.drawable.ic_menu_edit),
            Stat(3, "统计数据 3", "系统访问量", android.R.drawable.ic_menu_compass)
        )

        val statAdapter = StatAdapter(stats) { stat ->
            showToast("点击了: ${stat.title}")
        }

        binding.statsRecyclerView.apply {
            layoutManager = LinearLayoutManager(this@HomeActivity)
            adapter = statAdapter
        }

        // Tab 切换
        binding.tabButtonGroup.check(R.id.tab1Button)

        binding.tabButtonGroup.addOnButtonCheckedListener { _, checkedId, isChecked ->
            if (isChecked) {
                when (checkedId) {
                    R.id.tab1Button -> {
                        binding.tab1Content.visibility = View.VISIBLE
                        binding.tab2Content.visibility = View.GONE
                    }
                    R.id.tab2Button -> {
                        binding.tab1Content.visibility = View.GONE
                        binding.tab2Content.visibility = View.VISIBLE
                    }
                }
            }
        }
    }

    private fun setupNavigation() {
        binding.navigationView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.nav_home -> {
                    showToast("首页")
                    drawerLayout.closeDrawer(GravityCompat.START)
                    true
                }
                R.id.nav_dashboard -> {
                    showToast("仪表盘功能开发中")
                    drawerLayout.closeDrawer(GravityCompat.START)
                    true
                }
                R.id.nav_settings -> {
                    showToast("设置功能开发中")
                    drawerLayout.closeDrawer(GravityCompat.START)
                    true
                }
                R.id.nav_logout -> {
                    drawerLayout.closeDrawer(GravityCompat.START)
                    showLogoutDialog()
                    true
                }
                else -> false
            }
        }
    }

    private fun handleLogout() {
        showLogoutDialog()
    }

    private fun showLogoutDialog() {
        val dialogView = LayoutInflater.from(this).inflate(
            R.layout.dialog_logout,
            null
        )

        AlertDialog.Builder(this)
            .setTitle("退出登录")
            .setView(dialogView)
            .setPositiveButton("确定") { _, _ ->
                performLogout()
            }
            .setNegativeButton("取消", null)
            .show()
    }

    private fun performLogout() {
        lifecycleScope.launch {
            showLoading(true)
            val result = authRepository.logout()
            showLoading(false)

            result.onSuccess {
                showToast("退出成功")
                navigateToLogin()
            }.onFailure {
                showToast("退出失败: ${it.message}")
            }
        }
    }

    private fun showLoading(show: Boolean) {
        // 可以添加一个进度条
    }

    private fun navigateToLogin() {
        val intent = android.content.Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    override fun onBackPressed() {
        if (drawerLayout.isDrawerOpen(GravityCompat.START)) {
            drawerLayout.closeDrawer(GravityCompat.START)
        } else {
            super.onBackPressed()
        }
    }
}
