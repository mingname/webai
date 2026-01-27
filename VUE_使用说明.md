# Vue 项目使用说明

## 项目简介

这是一个基于 Vue 3 + Vite + Pinia + Vue Router 构建的现代化Web应用，包含登录、记住密码、首页Tab切换等功能。

## 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 下一代前端构建工具
- **Pinia** - Vue状态管理库
- **Vue Router** - Vue官方路由管理器
- **Axios** - HTTP客户端

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000`

### 3. 构建生产版本

```bash
npm run build
```

## 功能特性

### 登录功能
- 用户名和密码验证（模拟接口）
- 记住密码功能
- 密码显示/隐藏切换
- 登录状态持久化

### 首页功能
- Tab切换（支持键盘方向键）
- 侧边导航栏（移动端）
- 响应式设计

## API接口说明

### 模拟登录接口

当前使用模拟接口，验证规则：
- 用户名至少3个字符
- 密码至少6个字符
- 延迟800ms模拟网络请求

### 切换到真实接口

编辑 `src/api/login.js`，修改 `login` 函数调用真实接口。

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
