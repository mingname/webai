# 产品需求文档 (PRD)

## 1. 项目概述

### 1.1 项目名称
UI设计管理系统

### 1.2 项目背景
开发一个现代化的UI设计管理系统，提供用户登录认证、项目管理、数据统计等核心功能。系统需要支持Web端和移动端，具备良好的用户体验和交互设计。

### 1.3 项目目标
- 提供安全的用户认证系统
- 实现项目管理功能
- 提供数据统计分析
- 支持多端响应式设计
- 提供流畅的用户交互体验

## 2. 功能需求

### 2.1 用户认证模块

#### 2.1.1 用户登录
**功能描述：** 用户通过用户名和密码登录系统

**前置条件：**
- 用户已注册账号
- 数据库服务正常

**输入项：**
- 用户名（必填，至少3个字符）
- 密码（必填，至少6个字符）
- 记住密码（可选）

**功能点：**
- 表单验证：用户名长度≥3字符，密码长度≥6字符
- 密码显示/隐藏切换
- 记住密码功能：勾选后下次登录自动填充
- 登录失败错误提示
- 登录成功后跳转到首页
- 加载状态提示

**后端接口：**
```
POST /api/login
Request Body: { username, password }
Response: { code, message, data: { token, userInfo } }
```

**测试账号：**
- 管理员：admin / 123456
- 测试用户：test / 123456

#### 2.1.2 用户注册
**功能描述：** 新用户注册账号

**前置条件：**
- 数据库服务正常

**输入项：**
- 用户名（必填，唯一）
- 密码（必填，至少6个字符）
- 昵称（可选）

**功能点：**
- 表单验证
- 用户名唯一性检查
- 密码加密存储（bcrypt）
- 注册成功后自动登录

**后端接口：**
```
POST /api/register
Request Body: { username, password, nickname }
Response: { code, message, data: userInfo }
```

#### 2.1.3 用户退出
**功能描述：** 用户安全退出系统

**功能点：**
- 清除本地存储的token和用户信息
- 跳转到登录页面

**后端接口：**
```
POST /api/logout
Headers: Authorization: Bearer <token>
Response: { code, message, data: null }
```

#### 2.1.4 获取用户信息
**功能描述：** 获取当前登录用户的详细信息

**功能点：**
- 根据token解析用户信息
- 显示用户头像、昵称等信息

**后端接口：**
```
GET /api/user/info
Headers: Authorization: Bearer <token>
Response: { code, message, data: userInfo }
```

### 2.2 首页模块

#### 2.2.1 页面布局
**功能描述：** 响应式首页布局

**组件结构：**
- 顶部导航栏
  - 菜单按钮（移动端）
  - 页面标题
  - 用户信息展示
  - 退出按钮
- 侧边导航栏（移动端）
  - 用户头像和昵称
  - 导航菜单：首页、仪表盘、设置
  - 退出登录
  - 关闭按钮
- 主内容区域

#### 2.2.2 Tab切换功能
**功能描述：** 首页包含两个可切换的Tab

**Tab列表：**
- Tab 1：项目
- Tab 2：数据统计

**功能点：**
- 点击Tab按钮切换内容
- 左右方向键快捷切换
- Tab切换动画效果
- 当前Tab高亮显示

#### 2.2.3 项目Tab（Tab 1）
**功能描述：** 展示项目列表和项目信息

**内容布局：**
- Tab标题和描述
- 项目卡片列表
- 每个卡片包含：
  - 项目图标
  - 项目名称
  - 项目描述

**交互功能：**
- 点击卡片查看项目详情
- 卡片悬停效果

#### 2.2.4 数据统计Tab（Tab 2）
**功能描述：** 展示数据统计信息

**内容布局：**
- Tab标题和描述
- 统计卡片展示
- 每个卡片包含：
  - 统计图标
  - 统计标题
  - 统计描述

**交互功能：**
- 点击卡片查看详细统计
- 卡片悬停效果

### 2.3 侧边导航栏（移动端）

**功能描述：** 移动端侧滑导航菜单

**功能点：**
- 点击菜单按钮打开侧边栏
- 点击遮罩层或关闭按钮关闭侧边栏
- 滑动动画效果
- 当前菜单项高亮显示

**菜单项：**
- 首页
- 仪表盘
- 设置
- 退出登录

## 3. 非功能需求

### 3.1 性能要求
- 页面加载时间 < 2秒
- API响应时间 < 500ms
- 支持并发用户数 ≥ 100

### 3.2 安全要求
- 密码使用bcrypt加密存储
- 使用JWT进行身份认证
- Token有效期24小时
- 防止SQL注入攻击
- CORS跨域配置
- 请求参数验证

### 3.3 兼容性要求
**浏览器支持：**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**响应式设计：**
- Web端：≥ 1200px
- 平板端：768px - 1199px
- 移动端：< 768px

### 3.4 可用性要求
- 界面简洁美观
- 操作流程清晰
- 错误提示友好
- 加载状态明确
- 支持键盘快捷键

## 4. 技术架构

### 4.1 前端技术栈
- **框架：** Vue 3 (Composition API)
- **构建工具：** Vite 5.0
- **状态管理：** Pinia 2.1
- **路由：** Vue Router 4.2
- **HTTP客户端：** Axios 1.6
- **UI图标：** Font Awesome 4.7

### 4.2 后端技术栈
- **运行环境：** Node.js
- **Web框架：** Express 4.18
- **数据库：** MySQL 5.7+
- **认证：** JWT (jsonwebtoken)
- **密码加密：** bcryptjs
- **环境配置：** dotenv
- **跨域处理：** cors
- **参数验证：** express-validator

### 4.3 系统架构
```
┌─────────────────┐
│   Vue 3 前端     │
│  (端口: 5173)   │
└────────┬────────┘
         │ HTTP/HTTPS
         │
┌────────▼────────┐
│  Express 后端    │
│  (端口: 3001)    │
└────────┬────────┘
         │
┌────────▼────────┐
│  MySQL 数据库    │
│  (端口: 3306)    │
└─────────────────┘
```

## 5. 数据库设计

### 5.1 用户表 (users)
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(50),
  avatar VARCHAR(255),
  email VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**字段说明：**
- id：用户ID，主键，自增
- username：用户名，唯一，必填
- password：密码（bcrypt加密），必填
- nickname：昵称
- avatar：头像URL
- email：邮箱
- phone：手机号
- created_at：创建时间
- updated_at：更新时间

## 6. 接口文档

### 6.1 认证接口

#### 6.1.1 登录
```
POST /api/login
Content-Type: application/json

Request:
{
  "username": "admin",
  "password": "123456"
}

Response (成功):
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": 1,
      "username": "admin",
      "nickname": "管理员",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
    }
  }
}

Response (失败):
{
  "code": 401,
  "message": "用户名或密码错误",
  "data": null
}
```

#### 6.1.2 注册
```
POST /api/register
Content-Type: application/json

Request:
{
  "username": "newuser",
  "password": "123456",
  "nickname": "新用户"
}

Response:
{
  "code": 201,
  "message": "注册成功",
  "data": {
    "id": 3,
    "username": "newuser",
    "nickname": "新用户",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=newuser"
  }
}
```

#### 6.1.3 退出登录
```
POST /api/logout
Authorization: Bearer <token>

Response:
{
  "code": 200,
  "message": "退出成功",
  "data": null
}
```

#### 6.1.4 获取用户信息
```
GET /api/user/info
Authorization: Bearer <token>

Response:
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "管理员",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    "email": null,
    "phone": null,
    "created_at": "2025-01-26T10:30:00.000Z"
  }
}
```

## 7. 页面设计规范

### 7.1 登录页面
**设计要点：**
- 居中布局，卡片式设计
- 渐变背景色
- 圆角按钮和输入框
- 图标美化
- 响应式适配

**元素尺寸：**
- 卡片宽度：Web端 400px，移动端 90%
- 按钮高度：48px
- 输入框高度：44px

### 7.2 首页
**设计要点：**
- 顶部固定导航栏
- 左侧或侧滑导航
- 卡片式内容展示
- 流畅的Tab切换动画

**响应式断点：**
- 移动端：< 768px
- 平板端：768px - 1199px
- Web端：≥ 1200px

### 7.3 配色方案
- 主色调：#4F46E5（紫色）
- 成功色：#10B981（绿色）
- 错误色：#EF4444（红色）
- 背景色：#F3F4F6（浅灰）
- 文字色：#1F2937（深灰）

## 8. 测试计划

### 8.1 功能测试
- [ ] 用户登录功能
- [ ] 用户注册功能
- [ ] 用户退出功能
- [ ] 记住密码功能
- [ ] 密码显示/隐藏切换
- [ ] Tab切换功能
- [ ] 侧边导航栏开关

### 8.2 接口测试
- [ ] 登录接口
- [ ] 注册接口
- [ ] 退出接口
- [ ] 获取用户信息接口
- [ ] Token认证中间件

### 8.3 兼容性测试
- [ ] Chrome浏览器
- [ ] Firefox浏览器
- [ ] Safari浏览器
- [ ] Edge浏览器
- [ ] 移动端浏览器

### 8.4 性能测试
- [ ] 页面加载速度
- [ ] API响应时间
- [ ] 并发用户测试

## 9. 部署计划

### 9.1 前端部署
```bash
# 构建项目
npm run build

# 部署到静态服务器
# 将 dist 目录部署到 Nginx、Apache 或 CDN
```

### 9.2 后端部署
```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env

# 启动服务
npm start

# 使用 PM2 管理进程
pm2 start server.js --name uisheji-api
```

### 9.3 数据库部署
```bash
# 创建数据库
mysql -u root -p < config/database.sql

# 配置远程连接
# 修改 config/database.js 中的连接参数
```

## 10. 项目里程碑

### 阶段一：基础架构（已完成）
- [x] 项目初始化
- [x] 前后端框架搭建
- [x] 数据库设计
- [x] 基础API开发

### 阶段二：核心功能（已完成）
- [x] 用户认证模块
- [x] 登录页面
- [x] 首页Tab切换
- [x] 响应式设计

### 阶段三：功能完善（规划中）
- [ ] 项目管理功能
- [ ] 数据统计功能
- [ ] 用户设置功能
- [ ] 权限管理

### 阶段四：测试部署（规划中）
- [ ] 功能测试
- [ ] 性能优化
- [ ] 生产环境部署
- [ ] 监控告警

## 11. 风险评估

### 11.1 技术风险
- **风险：** 数据库连接失败
- **应对：** 建立连接池，实现重试机制

- **风险：** Token泄露
- **应对：** 使用HTTPS，设置合理的Token过期时间

### 11.2 业务风险
- **风险：** 用户数据泄露
- **应对：** 密码加密，数据脱敏

- **风险：** 并发访问性能问题
- **应对：** 数据库优化，缓存机制

## 12. 附录

### 12.1 环境变量配置
```env
DB_HOST=115.190.154.26
DB_PORT=3306
DB_USER=root
DB_PASSWORD=Root@2026!
DB_NAME=uisheji
NODE_ENV=development
PORT=3001
JWT_SECRET=uisheji-secret-key-2026
JWT_EXPIRES_IN=24h
```

### 12.2 项目目录结构
```
uisheji/
├── backend/                 # 后端代码
│   ├── config/             # 配置文件
│   ├── controllers/        # 控制器
│   ├── middleware/         # 中间件
│   ├── routes/             # 路由
│   ├── server.js           # 服务器入口
│   └── package.json        # 后端依赖
├── src/                    # 前端代码
│   ├── api/                # API接口
│   ├── assets/             # 静态资源
│   ├── components/         # 组件
│   ├── router/             # 路由
│   ├── stores/             # 状态管理
│   ├── views/              # 页面
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── index.html              # HTML模板
├── package.json            # 前端依赖
├── vite.config.js          # Vite配置
└── README.md               # 项目说明
```

---

**文档版本：** v1.0
**创建日期：** 2026-01-26
**更新日期：** 2026-01-26
**文档状态：** 已完成
