# Android 项目说明

## 项目概述
这是一个基于 Web 版 UI 设计管理系统的 Android 应用，实现了用户登录、首页展示、Tab 切换和侧边导航等功能。

## 功能特性

### 1. 用户认证
- 用户登录功能（支持记住密码）
- 与后端 API 集成
- Token 自动管理和存储
- 用户信息本地缓存

### 2. 首页
- 顶部导航栏（包含用户信息和退出按钮）
- Tab 切换功能（项目 / 数据统计）
- 项目卡片列表展示
- 数据统计卡片展示

### 3. 侧边导航
- 侧滑菜单
- 导航菜单项：首页、仪表盘、设置、退出登录
- 平滑的打开/关闭动画

## 技术栈

### 核心框架
- Kotlin
- AndroidX
- Material Design Components

### 网络请求
- Retrofit 2.9.0
- OkHttp 4.12.0
- Gson 2.10.1

### 图片加载
- Glide 4.16.0

### 架构模式
- MVVM (Repository 模式)
- 协程 (Coroutines)
- LiveData

### 数据存储
- SharedPreferences (用于 Token 和用户信息存储)

## 项目结构

```
asspace/
├── app/
│   ├── src/main/
│   │   ├── java/com/htnova/aitest/
│   │   │   ├── model/              # 数据模型
│   │   │   │   └── ApiModels.kt   # API 数据模型
│   │   │   ├── network/           # 网络层
│   │   │   │   └── NetworkConfig.kt  # Retrofit 配置
│   │   │   ├── repository/         # 数据仓库
│   │   │   │   └── AuthRepository.kt  # 认证相关数据操作
│   │   │   ├── ui/                # UI 层
│   │   │   │   ├── LoginActivity.kt   # 登录页面
│   │   │   │   └── HomeActivity.kt   # 首页
│   │   │   ├── adapter/            # RecyclerView 适配器
│   │   │   │   ├── ProjectAdapter.kt  # 项目列表适配器
│   │   │   │   └── StatAdapter.kt     # 统计列表适配器
│   │   │   ├── utils/             # 工具类
│   │   │   │   └── TokenManager.kt   # Token 管理
│   │   │   └── MainActivity.kt    # 主入口
│   │   ├── res/
│   │   │   ├── layout/            # 布局文件
│   │   │   ├── menu/              # 菜单文件
│   │   │   ├── drawable/          # 绘图资源
│   │   │   └── values/            # 资源值
│   │   └── AndroidManifest.xml    # 清单文件
│   └── build.gradle              # 应用级依赖配置
```

## API 配置

### 后端 API 地址
默认配置：`http://115.190.154.26:3001/api/`

如需修改，请编辑 `NetworkConfig.kt` 中的 `BASE_URL` 常量。

### API 接口

#### 登录
- 接口：`POST /api/login`
- 请求体：`{ username, password }`
- 响应：`{ code, message, data: { token, userInfo } }`

#### 注册
- 接口：`POST /api/register`
- 请求体：`{ username, password, nickname }`
- 响应：`{ code, message, data: userInfo }`

#### 退出
- 接口：`POST /api/logout`
- Headers：`Authorization: Bearer <token>`
- 响应：`{ code, message, data: null }`

#### 获取用户信息
- 接口：`GET /api/user/info`
- Headers：`Authorization: Bearer <token>`
- 响应：`{ code, message, data: userInfo }`

## 使用说明

### 1. 环境要求
- Android Studio Hedgehog (2023.1.1) 或更高版本
- Android SDK 24 (Android 7.0) 或更高版本
- JDK 11 或更高版本

### 2. 构建步骤
1. 克隆项目到本地
2. 使用 Android Studio 打开项目
3. 等待 Gradle 同步完成
4. 连接 Android 设备或启动模拟器
5. 点击运行按钮

### 3. 测试账号
- 管理员：`admin` / `123456`
- 测试用户：`test` / `123456`

## 待开发功能

- [ ] 注册页面
- [ ] 仪表盘页面
- [ ] 设置页面
- [ ] 项目详情页面
- [ ] 数据统计详情
- [ ] 用户信息编辑
- [ ] 密码修改
- [ ] 找回密码功能
- [ ] 深色模式
- [ ] 通知功能

## 注意事项

1. **网络权限**：应用已在 `AndroidManifest.xml` 中配置了网络权限
2. **HTTP 支持**：为了支持 HTTP 请求，已添加 `android:usesCleartextTraffic="true"`
3. **Token 管理**：Token 使用 SharedPreferences 存储，生产环境建议使用加密存储
4. **API 地址**：请根据实际部署环境修改 `NetworkConfig.kt` 中的 API 地址

## 常见问题

### Q: 无法连接到服务器？
A: 请检查：
1. 设备网络连接是否正常
2. API 地址是否正确
3. 服务器是否正在运行
4. 防火墙是否允许访问

### Q: 登录失败？
A: 请检查：
1. 用户名和密码是否正确
2. 用户名至少 3 个字符
3. 密码至少 6 个字符

### Q: 图片无法加载？
A: 请检查：
1. 网络连接是否正常
2. 图片 URL 是否可访问
3. Glide 库是否正确集成

## 许可证
本项目仅供学习交流使用。
