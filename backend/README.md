# 后端API服务

## 技术栈

- **Node.js** - JavaScript运行环境
- **Express** - Web框架
- **MySQL** - 关系型数据库
- **JWT** - 用户认证
- **bcryptjs** - 密码加密

## 快速开始

### 1. 安装MySQL数据库

确保已安装MySQL 5.7或更高版本

### 2. 创建数据库

```bash
# 连接到MySQL
mysql -u root -p

# 执行SQL脚本
source backend/config/database.sql
```

或使用MySQL Workbench等工具执行 `backend/config/database.sql`

### 3. 配置环境变量

```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件，配置数据库连接信息：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=uisheji
JWT_SECRET=your_secret_key
```

### 4. 安装依赖

```bash
cd backend
npm install
```

### 5. 启动服务

```bash
# 生产环境
npm start

# 开发环境（自动重启）
npm run dev
```

服务器将在 `http://localhost:3001` 启动

## API接口文档

### 登录

**请求**
```
POST /api/login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

**响应（成功）**
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": 1,
      "username": "admin",
      "nickname": "管理员",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      "email": null
    }
  }
}
```

**响应（失败）**
```json
{
  "code": 401,
  "message": "用户名或密码错误",
  "data": null
}
```

### 获取用户信息

**请求**
```
GET /api/user/info
Authorization: Bearer <token>
```

**响应**
```json
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

### 退出登录

**请求**
```
POST /api/logout
Authorization: Bearer <token>
```

**响应**
```json
{
  "code": 200,
  "message": "退出成功",
  "data": null
}
```

### 用户注册

**请求**
```
POST /api/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "123456",
  "nickname": "新用户"
}
```

**响应**
```json
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

## 测试账号

数据库初始化时会自动创建两个测试账号：

| 用户名 | 密码 | 角色 |
|--------|--------|------|
| admin  | 123456 | 管理员 |
| test   | 123456 | 测试用户 |

## 项目结构

```
backend/
├── config/
│   ├── database.js      # 数据库连接配置
│   └── database.sql   # 数据库初始化脚本
├── controllers/
│   └── authController.js  # 认证控制器
├── middleware/
│   ├── auth.js          # JWT认证中间件
│   └── validator.js     # 参数验证中间件
├── routes/
│   └── authRoutes.js    # 路由定义
├── server.js           # 服务器入口
├── package.json        # 依赖配置
└── .env.example       # 环境变量示例
```

## 安全特性

- ✅ 密码使用bcrypt加密
- ✅ JWT令牌认证
- ✅ SQL参数化查询（防止SQL注入）
- ✅ 请求参数验证
- ✅ CORS跨域配置
- ✅ 错误处理

## 常见问题

### Q: 数据库连接失败？
A: 检查 `.env` 文件中的数据库配置是否正确，确保MySQL服务已启动。

### Q: 密码错误？
A: 测试账号密码为 `123456`，如忘记密码可通过数据库重置。

### Q: Token过期怎么办？
A: Token默认24小时过期，需要重新登录获取新Token。

## 开发建议

1. 使用Postman或Apifox等工具测试API
2. 开发环境使用 `npm run dev` 实现代码热更新
3. 生产环境请修改 `JWT_SECRET` 为复杂的随机字符串
4. 定期备份数据库

## License

MIT
