# UI设计管理系统 - Java后端

基于 Spring Boot 3.2 + JPA + MySQL 的 Java 后端服务

## 技术栈

- **Spring Boot 3.2** - 应用框架
- **Spring Security** - 安全认证框架
- **Spring Data JPA** - ORM 框架
- **MySQL 8.0** - 关系型数据库
- **JWT (jjwt)** - JSON Web Token 认证
- **Flyway** - 数据库版本控制
- **Swagger/OpenAPI** - API 文档
- **Lombok** - 简化 Java 代码

## 项目结构

```
javaproject/
├── src/
│   ├── main/
│   │   ├── java/com/uisheji/
│   │   │   ├── config/           # 配置类
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   └── SwaggerConfig.java
│   │   │   ├── controller/       # 控制器层
│   │   │   │   ├── AuthController.java
│   │   │   │   └── UserController.java
│   │   │   ├── dto/              # 数据传输对象
│   │   │   │   ├── request/
│   │   │   │   └── response/
│   │   │   ├── entity/           # 实体类
│   │   │   │   └── User.java
│   │   │   ├── exception/        # 异常类
│   │   │   │   ├── BusinessException.java
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── ApiResponse.java
│   │   │   ├── repository/       # 数据访问层
│   │   │   │   └── UserRepository.java
│   │   │   ├── security/         # 安全相关
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── JwtAuthenticationEntryPoint.java
│   │   │   ├── service/          # 服务层
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── UserService.java
│   │   │   │   └── impl/
│   │   │   ├── util/             # 工具类
│   │   │   │   └── JwtUtil.java
│   │   │   └── UishejiBackendApplication.java
│   │   └── resources/
│   │       ├── application.yml   # 配置文件
│   │       └── db/migration/     # Flyway 数据库迁移脚本
│   └── test/                     # 测试代码
├── pom.xml                       # Maven 配置文件
└── README.md                     # 项目说明文档
```

## 快速开始

### 环境要求

- JDK 17+
- Maven 3.6+
- MySQL 5.7+

### 配置数据库

1. 创建数据库：
```sql
CREATE DATABASE uisheji DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 修改 `src/main/resources/application.yml` 中的数据库配置：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/uisheji
    username: root
    password: your_password
```

### 构建项目

```bash
cd javaproject
mvn clean install
```

### 运行项目

```bash
mvn spring-boot:run
```

或者打包后运行：

```bash
mvn clean package
java -jar target/uisheji-backend-1.0.0.jar
```

## API 文档

项目启动后，访问 Swagger API 文档：

```
http://localhost:8080/api/swagger-ui/index.html
```

## 接口列表

### 认证接口

#### 登录
```
POST /api/auth/login
Content-Type: application/json

Request:
{
  "username": "admin",
  "password": "123456"
}

Response:
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
```

#### 注册
```
POST /api/auth/register
Content-Type: application/json

Request:
{
  "username": "newuser",
  "password": "123456",
  "nickname": "新用户"
}

Response:
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": 3,
      "username": "newuser",
      "nickname": "新用户",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=newuser"
    }
  }
}
```

#### 登出
```
POST /api/auth/logout
Authorization: Bearer <token>

Response:
{
  "code": 200,
  "message": "退出成功"
}
```

### 用户接口

#### 获取当前用户信息
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
    "createdAt": "2026-01-26T10:30:00"
  }
}
```

## 测试账号

系统默认提供了以下测试账号（密码均为 `123456`）：

- 管理员：`admin` / `123456`
- 测试用户：`test` / `123456`

## 配置说明

### JWT 配置

```yaml
jwt:
  secret: uisheji-secret-key-2026-with-at-least-256-bits-for-security
  expiration: 86400000  # 24小时（毫秒）
```

### 服务器配置

```yaml
server:
  port: 8080
  servlet:
    context-path: /api
```

### 数据库连接池配置

```yaml
spring:
  datasource:
    hikari:
      minimum-idle: 5
      maximum-pool-size: 20
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

## 安全特性

- 使用 BCrypt 进行密码加密存储
- JWT Token 认证，有效期24小时
- 防止 SQL 注入（使用 JPA 参数化查询）
- CORS 跨域配置
- 请求参数验证

## 开发规范

### 分层架构

项目采用经典的分层架构：

- **Controller**：处理 HTTP 请求，参数验证
- **Service**：业务逻辑处理
- **Repository**：数据访问
- **Entity**：数据库实体映射
- **DTO**：数据传输对象

### 命名规范

- 类名：大驼峰命名法
- 方法名：小驼峰命名法
- 常量：全大写，下划线分隔
- 数据库表名：小写，下划线分隔

### 注释规范

- 所有 public 类和方法必须有 Javadoc 注释
- 复杂业务逻辑需要添加行内注释说明

## 部署

### Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM maven:3.9-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

构建镜像：

```bash
docker build -t uisheji-backend:1.0.0 .
```

运行容器：

```bash
docker run -d -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/uisheji \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=your_password \
  uisheji-backend:1.0.0
```

### 生产环境配置

建议使用 `application-prod.yml` 配置生产环境参数：

```yaml
spring:
  profiles:
    active: prod

logging:
  level:
    root: WARN
    com.uisheji: INFO
```

## 常见问题

### Q: 如何修改数据库连接配置？

A: 编辑 `src/main/resources/application.yml` 文件，修改 `spring.datasource` 下的配置。

### Q: 如何修改 JWT 密钥？

A: 编辑 `src/main/resources/application.yml` 文件，修改 `jwt.secret` 配置项。

### Q: 如何禁用 Flyway 数据库迁移？

A: 编辑配置文件，设置 `spring.flyway.enabled: false`。

### Q: 项目启动失败怎么办？

A: 检查以下几点：
1. JDK 版本是否为 17+
2. 数据库是否正常启动
3. 数据库连接配置是否正确
4. 端口 8080 是否被占用

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或联系开发团队。
