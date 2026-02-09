# Java 后端开发 Skill

## 技能描述

此技能用于指导 Java 后端应用程序的开发，涵盖从项目搭建到生产部署的完整流程。包括 Spring Boot、微服务架构、数据库设计、RESTful API 开发、安全认证、性能优化等核心功能。

## 适用场景

- **新建后端项目**: 从零开始构建 Java 后端服务
- **微服务架构**: 设计和实现分布式系统
- **RESTful API 开发**: 创建标准的 REST 接口
- **数据库集成**: MySQL、PostgreSQL、MongoDB 等
- **认证授权**: JWT、OAuth2、Spring Security
- **消息队列**: RabbitMQ、Kafka、RocketMQ
- **缓存系统**: Redis、Caffeine
- **性能优化**: 并发优化、数据库优化、缓存策略
- **测试与部署**: 单元测试、集成测试、Docker 部署

## 技术栈

### 核心框架
- **Spring Boot 3.x**: 应用框架
- **Spring Framework 6.x**: 核心框架
- **Spring Cloud**: 微服务组件
- **Maven/Gradle**: 构建工具
- **JDK 17+**: Java 开发工具包

### 持久层
- **Spring Data JPA**: ORM 框架
- **MyBatis-Plus**: SQL 映射框架
- **HikariCP**: 数据库连接池
- **Flyway/Liquibase**: 数据库版本控制

### 数据库
- **MySQL 8.0**: 关系型数据库
- **PostgreSQL**: 高级关系型数据库
- **MongoDB**: NoSQL 数据库
- **Redis**: 缓存数据库

### 消息队列
- **RabbitMQ**: AMQP 消息队列
- **Kafka**: 分布式流处理
- **RocketMQ**: 阿里消息中间件

### 工具库
- **Lombok**: 简化 Java 代码
- **MapStruct**: 对象映射
- **Hutool**: Java 工具类库
- **Guava**: Google 工具库

### 文档和测试
- **Swagger/OpenAPI**: API 文档
- **JUnit 5**: 单元测试
- **Mockito**: 模拟框架
- **Testcontainers**: 集成测试

### 监控和日志
- **Spring Boot Actuator**: 应用监控
- **Prometheus + Grafana**: 监控系统
- **ELK Stack**: 日志收集
- **Sleuth + Zipkin**: 分布式追踪

### 安全
- **Spring Security**: 安全框架
- **JWT**: JSON Web Token
- **OAuth2**: 授权框架

## 项目结构规范

```
project-name/
├── src/
│   ├── main/
│   │   ├── java/com/example/project/
│   │   │   ├── ProjectApplication.java
│   │   │   ├── config/               # 配置类
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── RedisConfig.java
│   │   │   │   └── SwaggerConfig.java
│   │   │   ├── controller/           # 控制器层
│   │   │   │   ├── auth/
│   │   │   │   │   └── AuthController.java
│   │   │   │   └── user/
│   │   │   │       └── UserController.java
│   │   │   ├── service/              # 服务层接口
│   │   │   │   ├── AuthService.java
│   │   │   │   └── UserService.java
│   │   │   ├── service/impl/         # 服务层实现
│   │   │   │   ├── AuthServiceImpl.java
│   │   │   │   └── UserServiceImpl.java
│   │   │   ├── repository/           # 数据访问层
│   │   │   │   ├── UserRepository.java
│   │   │   │   └── RoleRepository.java
│   │   │   ├── entity/               # 实体类
│   │   │   │   ├── User.java
│   │   │   │   └── Role.java
│   │   │   ├── dto/                  # 数据传输对象
│   │   │   │   ├── request/
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   └── RegisterRequest.java
│   │   │   │   └── response/
│   │   │   │       ├── LoginResponse.java
│   │   │   │       └── ApiResponse.java
│   │   │   ├── vo/                   # 视图对象
│   │   │   │   └── UserVO.java
│   │   │   ├── enums/                # 枚举类
│   │   │   │   ├── UserStatus.java
│   │   │   │   └── ErrorCode.java
│   │   │   ├── exception/            # 异常类
│   │   │   │   ├── BusinessException.java
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   ├── util/                 # 工具类
│   │   │   │   ├── JwtUtil.java
│   │   │   │   └── DateUtil.java
│   │   │   ├── common/               # 公共类
│   │   │   │   ├── constants/
│   │   │   │   │   └── RedisConstants.java
│   │   │   │   └── annotation/
│   │   │   │       └── RateLimit.java
│   │   │   └── mapper/               # MyBatis Mapper
│   │   │       └── UserMapper.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       ├── application-test.yml
│   │       ├── logback-spring.xml
│   │       └── db/migration/         # Flyway 迁移脚本
│   └── test/                         # 测试代码
│       └── java/
│           └── com/example/project/
│               ├── service/
│               └── controller/
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── README.md
```

## 开发工作流程

### 1. 项目初始化

#### 创建 Spring Boot 项目

**方式一：Spring Initializr**
```bash
# 访问 https://start.spring.io/
# 配置:
# - Project: Maven Project
# - Language: Java
# - Spring Boot: 3.2.0
# - Project Metadata: Group, Artifact, Name
# - Dependencies: Web, JPA, MySQL Driver, Lombok
```

**方式二：使用 Maven Archetype**
```bash
mvn archetype:generate \
  -DgroupId=com.example \
  -DartifactId=myproject \
  -DarchetypeArtifactId=maven-archetype-quickstart \
  -DinteractiveMode=false
```

#### pom.xml 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>myproject</artifactId>
    <version>1.0.0</version>
    <name>My Project</name>
    <description>Spring Boot Project</description>

    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <mybatis-plus.version>3.5.5</mybatis-plus.version>
        <hutool.version>5.8.23</hutool.version>
        <jwt.version>0.12.3</jwt.version>
        <mapstruct.version>1.5.5.Final</mapstruct.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- Database -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>
        <dependency>
            <groupId>com.zaxxer</groupId>
            <artifactId>HikariCP</artifactId>
        </dependency>
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-mysql</artifactId>
        </dependency>

        <!-- MyBatis Plus -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>${mybatis-plus.version}</version>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Hutool -->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>${hutool.version}</version>
        </dependency>

        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>${jwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>${jwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>${jwt.version}</version>
        </dependency>

        <!-- MapStruct -->
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct</artifactId>
            <version>${mapstruct.version}</version>
        </dependency>
        <dependency>
            <groupId>org.mapstruct</groupId>
            <artifactId>mapstruct-processor</artifactId>
            <version>${mapstruct.version}</version>
        </dependency>

        <!-- Swagger -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.2.0</version>
        </dependency>

        <!-- Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.testcontainers</groupId>
            <artifactId>testcontainers</artifactId>
            <version>1.19.3</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 2. 配置文件

#### application.yml

```yaml
spring:
  application:
    name: my-project
  profiles:
    active: dev
  
  # 数据源配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/mydb?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: password
    hikari:
      minimum-idle: 5
      maximum-pool-size: 20
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  
  # JPA 配置
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQL8Dialect
  
  # Redis 配置
  redis:
    host: localhost
    port: 6379
    password:
    database: 0
    lettuce:
      pool:
        max-active: 8
        max-wait: -1ms
        max-idle: 8
        min-idle: 0
    timeout: 30000ms
  
  # Flyway 配置
  flyway:
    enabled: true
    locations: classpath:db/migration
    baseline-on-migrate: true
    encoding: UTF-8

# 服务器配置
server:
  port: 8080
  servlet:
    context-path: /api
    encoding:
      charset: UTF-8
      enabled: true
      force: true

# MyBatis Plus 配置
mybatis-plus:
  mapper-locations: classpath*:mapper/**/*.xml
  type-aliases-package: com.example.project.entity
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
  global-config:
    db-config:
      id-type: auto
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0

# JWT 配置
jwt:
  secret: my-secret-key-with-at-least-256-bits
  expiration: 86400000  # 24 hours

# Actuator 配置
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
  endpoint:
    health:
      show-details: always

# 日志配置
logging:
  level:
    root: INFO
    com.example.project: DEBUG
    org.springframework.web: DEBUG
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
```

### 3. 实体类 (Entity)

```java
package com.example.project.entity;

import com.baomidou.mybatisplus.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
@TableName("users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @Column(unique = true, nullable = false, length = 50)
    private String username;
    
    @Column(unique = true, nullable = false, length = 100)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(length = 20)
    private String phone;
    
    @Column(length = 255)
    private String avatar;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.ACTIVE;
    
    @Column(name = "is_admin")
    private Boolean isAdmin = false;
    
    @TableLogic
    @Column(name = "deleted")
    private Boolean deleted = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
```

#### 枚举类

```java
package com.example.project.enums;

public enum UserStatus {
    ACTIVE("active", "激活"),
    INACTIVE("inactive", "未激活"),
    LOCKED("locked", "锁定"),
    DELETED("deleted", "已删除");
    
    private final String code;
    private final String description;
    
    UserStatus(String code, String description) {
        this.code = code;
        this.description = description;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getDescription() {
        return description;
    }
}
```

### 4. Repository 层

#### JPA Repository

```java
package com.example.project.repository;

import com.example.project.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.status = :status")
    List<User> findByStatus(@Param("status") UserStatus status);
    
    @Query("SELECT u FROM User u WHERE u.createdAt BETWEEN :start AND :end")
    List<User> findByCreatedAtBetween(
        @Param("start") LocalDateTime start,
        @Param("end") LocalDateTime end
    );
}
```

#### MyBatis Mapper

```java
package com.example.project.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.project.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    
    @Select("SELECT * FROM users WHERE status = #{status}")
    List<User> selectByStatus(@Param("status") String status);
    
    @Select("SELECT * FROM users WHERE username LIKE CONCAT('%', #{keyword}, '%')")
    List<User> searchByUsername(@Param("keyword") String keyword);
}
```

### 5. DTO (Data Transfer Object)

#### Request DTO

```java
package com.example.project.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {
    
    @NotBlank(message = "用户名不能为空")
    private String username;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 20, message = "密码长度必须在6-20位之间")
    private String password;
}

@Data
public class RegisterRequest {
    
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度必须在3-20位之间")
    private String username;
    
    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;
    
    @NotBlank(message = "密码不能为空")
    @Size(min = 6, max = 20, message = "密码长度必须在6-20位之间")
    private String password;
    
    @NotBlank(message = "确认密码不能为空")
    private String confirmPassword;
    
    private String phone;
}
```

#### Response DTO

```java
package com.example.project.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    
    private Integer code;
    private String message;
    private T data;
    private Long timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(
            200,
            "操作成功",
            data,
            System.currentTimeMillis()
        );
    }
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(
            200,
            message,
            data,
            System.currentTimeMillis()
        );
    }
    
    public static <T> ApiResponse<T> error(Integer code, String message) {
        return new ApiResponse<>(
            code,
            message,
            null,
            System.currentTimeMillis()
        );
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(
            500,
            message,
            null,
            System.currentTimeMillis()
        );
    }
}

@Data
public class LoginResponse {
    private String token;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private UserInfo userInfo;
    
    @Data
    @AllArgsConstructor
    public static class UserInfo {
        private Long id;
        private String username;
        private String email;
        private String avatar;
    }
}
```

### 6. Service 层

#### Service 接口

```java
package com.example.project.service;

import com.example.project.dto.request.LoginRequest;
import com.example.project.dto.request.RegisterRequest;
import com.example.project.dto.response.LoginResponse;

public interface AuthService {
    
    /**
     * 用户登录
     * @param request 登录请求
     * @return 登录响应（包含 token 和用户信息）
     */
    LoginResponse login(LoginRequest request);
    
    /**
     * 用户注册
     * @param request 注册请求
     * @return 登录响应
     */
    LoginResponse register(RegisterRequest request);
    
    /**
     * 用户登出
     */
    void logout();
    
    /**
     * 刷新 token
     * @param refreshToken 刷新令牌
     * @return 新的登录响应
     */
    LoginResponse refreshToken(String refreshToken);
}
```

#### Service 实现

```java
package com.example.project.service.impl;

import com.example.project.dto.request.LoginRequest;
import com.example.project.dto.request.RegisterRequest;
import com.example.project.dto.response.LoginResponse;
import com.example.project.entity.User;
import com.example.project.enums.UserStatus;
import com.example.project.exception.BusinessException;
import com.example.project.repository.UserRepository;
import com.example.project.service.AuthService;
import com.example.project.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, Object> redisTemplate;
    
    @Override
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        log.info("用户登录: {}", request.getUsername());
        
        // 查找用户
        User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new BusinessException("用户名或密码错误"));
        
        // 验证密码
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException("用户名或密码错误");
        }
        
        // 检查用户状态
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BusinessException("用户账户已被锁定，请联系管理员");
        }
        
        // 生成 token
        String token = jwtUtil.generateToken(user);
        
        // 更新最后登录时间
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
        
        // 存储到 Redis
        String redisKey = "auth:token:" + user.getId();
        redisTemplate.opsForValue().set(redisKey, token, 24, TimeUnit.HOURS);
        
        // 构建响应
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getAvatar()
        );
        
        return new LoginResponse(token, "Bearer", 86400000L, userInfo);
    }
    
    @Override
    @Transactional
    public LoginResponse register(RegisterRequest request) {
        log.info("用户注册: {}", request.getUsername());
        
        // 验证确认密码
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BusinessException("两次密码不一致");
        }
        
        // 检查用户名是否存在
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BusinessException("用户名已存在");
        }
        
        // 检查邮箱是否存在
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("邮箱已被注册");
        }
        
        // 创建用户
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setStatus(UserStatus.ACTIVE);
        
        user = userRepository.save(user);
        
        log.info("用户注册成功: {}", user.getUsername());
        
        // 自动登录
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(request.getUsername());
        loginRequest.setPassword(request.getPassword());
        
        return login(loginRequest);
    }
    
    @Override
    public void logout() {
        // 从 Spring Security 获取当前用户
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            String username = ((UserDetails) authentication.getPrincipal()).getUsername();
            User user = userRepository.findByUsername(username).orElse(null);
            
            if (user != null) {
                // 从 Redis 删除 token
                String redisKey = "auth:token:" + user.getId();
                redisTemplate.delete(redisKey);
            }
        }
        
        SecurityContextHolder.clearContext();
    }
    
    @Override
    public LoginResponse refreshToken(String refreshToken) {
        // 验证刷新令牌
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new BusinessException("刷新令牌无效");
        }
        
        // 从 token 中获取用户信息
        String username = jwtUtil.getUsernameFromToken(refreshToken);
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new BusinessException("用户不存在"));
        
        // 生成新 token
        String newToken = jwtUtil.generateToken(user);
        
        // 更新 Redis
        String redisKey = "auth:token:" + user.getId();
        redisTemplate.opsForValue().set(redisKey, newToken, 24, TimeUnit.HOURS);
        
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getAvatar()
        );
        
        return new LoginResponse(newToken, "Bearer", 86400000L, userInfo);
    }
}
```

### 7. Controller 层

```java
package com.example.project.controller;

import com.example.project.dto.request.LoginRequest;
import com.example.project.dto.request.RegisterRequest;
import com.example.project.dto.response.ApiResponse;
import com.example.project.dto.response.LoginResponse;
import com.example.project.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "认证接口", description = "用户登录、注册、登出等接口")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    @Operation(summary = "用户登录")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ApiResponse.success(response);
    }
    
    @PostMapping("/register")
    @Operation(summary = "用户注册")
    public ApiResponse<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        LoginResponse response = authService.register(request);
        return ApiResponse.success("注册成功", response);
    }
    
    @PostMapping("/logout")
    @Operation(summary = "用户登出")
    public ApiResponse<Void> logout() {
        authService.logout();
        return ApiResponse.success("登出成功", null);
    }
    
    @PostMapping("/refresh")
    @Operation(summary = "刷新令牌")
    public ApiResponse<LoginResponse> refreshToken(@RequestHeader("Authorization") String refreshToken) {
        String token = refreshToken.replace("Bearer ", "");
        LoginResponse response = authService.refreshToken(token);
        return ApiResponse.success(response);
    }
}
```

### 8. 安全配置

#### SecurityConfig

```java
package com.example.project.config;

import com.example.project.security.JwtAuthenticationFilter;
import com.example.project.security.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .exceptionHandling(exception -> 
                exception.authenticationEntryPoint(jwtAuthenticationEntryPoint)
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/auth/login",
                    "/auth/register",
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

#### JWT Filter

```java
package com.example.project.security;

import com.example.project.entity.User;
import com.example.project.repository.UserRepository;
import com.example.project.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        final String token = authHeader.substring(7);
        final String username = jwtUtil.getUsernameFromToken(token);
        
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByUsername(username).orElse(null);
            
            if (user != null && jwtUtil.validateToken(token)) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );
                
                authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );
                
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        filterChain.doFilter(request, response);
    }
}
```

### 9. 全局异常处理

```java
package com.example.project.exception;

import com.example.project.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Void> handleBusinessException(BusinessException e) {
        log.error("业务异常: {}", e.getMessage());
        return ApiResponse.error(400, e.getMessage());
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse<Map<String, String>> handleValidationException(
        MethodArgumentNotValidException e
    ) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        log.error("参数验证失败: {}", errors);
        return ApiResponse.error(400, "参数验证失败");
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ApiResponse<Void> handleAccessDeniedException(AccessDeniedException e) {
        log.error("访问拒绝: {}", e.getMessage());
        return ApiResponse.error(403, "没有访问权限");
    }
    
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse<Void> handleException(Exception e) {
        log.error("系统异常", e);
        return ApiResponse.error(500, "系统内部错误");
    }
}
```

### 10. 工具类

#### JwtUtil

```java
package com.example.project.util;

import com.example.project.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtUtil {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("username", user.getUsername());
        claims.put("email", user.getEmail());
        
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(user.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    
    public String getUsernameFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }
    
    public Long getUserIdFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.get("userId", Long.class);
    }
    
    public boolean validateToken(String token) {
        try {
            Claims claims = parseClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            log.error("Token验证失败", e);
            return false;
        }
    }
    
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
}
```

### 11. Swagger 配置

```java
package com.example.project.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("My Project API")
                .version("1.0.0")
                .description("Spring Boot REST API 文档")
                .contact(new Contact()
                    .name("Developer")
                    .email("developer@example.com")
                )
                .license(new License()
                    .name("Apache 2.0")
                    .url("https://www.apache.org/licenses/LICENSE-2.0.html")
                )
            )
            .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
            .components(new io.swagger.v3.oas.models.Components()
                .addSecuritySchemes("Bearer Authentication",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                )
            );
    }
}
```

### 12. 测试

#### Service 测试

```java
package com.example.project.service;

import com.example.project.dto.request.LoginRequest;
import com.example.project.dto.response.LoginResponse;
import com.example.project.entity.User;
import com.example.project.enums.UserStatus;
import com.example.project.exception.BusinessException;
import com.example.project.repository.UserRepository;
import com.example.project.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private RedisTemplate<String, Object> redisTemplate;
    
    @InjectMocks
    private AuthServiceImpl authService;
    
    private User user;
    private LoginRequest loginRequest;
    
    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("encodedPassword");
        user.setStatus(UserStatus.ACTIVE);
        
        loginRequest = new LoginRequest();
        loginRequest.setUsername("testuser");
        loginRequest.setPassword("password");
    }
    
    @Test
    void testLogin_Success() {
        // Given
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);
        
        // When
        LoginResponse response = authService.login(loginRequest);
        
        // Then
        assertNotNull(response);
        assertEquals("Bearer", response.getTokenType());
        verify(userRepository, times(1)).save(any(User.class));
    }
    
    @Test
    void testLogin_UserNotFound() {
        // Given
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        
        // When & Then
        BusinessException exception = assertThrows(
            BusinessException.class,
            () -> authService.login(loginRequest)
        );
        
        assertEquals("用户名或密码错误", exception.getMessage());
    }
    
    @Test
    void testLogin_InvalidPassword() {
        // Given
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(false);
        
        // When & Then
        BusinessException exception = assertThrows(
            BusinessException.class,
            () -> authService.login(loginRequest)
        );
        
        assertEquals("用户名或密码错误", exception.getMessage());
    }
    
    @Test
    void testLogin_UserLocked() {
        // Given
        user.setStatus(UserStatus.LOCKED);
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);
        
        // When & Then
        BusinessException exception = assertThrows(
            BusinessException.class,
            () -> authService.login(loginRequest)
        );
        
        assertEquals("用户账户已被锁定，请联系管理员", exception.getMessage());
    }
}
```

#### Controller 测试

```java
package com.example.project.controller;

import com.example.project.dto.request.LoginRequest;
import com.example.project.dto.response.ApiResponse;
import com.example.project.dto.response.LoginResponse;
import com.example.project.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
class AuthControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @MockBean
    private AuthService authService;
    
    @Test
    void testLogin_Success() throws Exception {
        // Given
        LoginRequest request = new LoginRequest();
        request.setUsername("testuser");
        request.setPassword("password");
        
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken("test-token");
        
        ApiResponse<LoginResponse> apiResponse = ApiResponse.success(loginResponse);
        
        when(authService.login(any())).thenReturn(loginResponse);
        
        // When & Then
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.code").value(200))
            .andExpect(jsonPath("$.message").value("操作成功"))
            .andExpect(jsonPath("$.data.token").value("test-token"));
    }
}
```

### 13. Docker 部署

#### Dockerfile

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

#### docker-compose.yml

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mydb
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    container_name: redis
    ports:
      - "6379:6379"
    networks:
      - app-network

  app:
    build: .
    container_name: spring-boot-app
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/mydb?useSSL=false&serverTimezone=UTC
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: root
      SPRING_REDIS_HOST: redis
      SPRING_REDIS_PORT: 6379
    depends_on:
      - mysql
      - redis
    networks:
      - app-network

volumes:
  mysql-data:

networks:
  app-network:
    driver: bridge
```

## 最佳实践

### 1. 代码规范
- 遵循阿里巴巴 Java 开发手册
- 使用 SonarLint 进行代码质量检查
- 统一的代码格式（使用 IDEA 格式化配置）
- 有意义的命名规范
- 适当的注释

### 2. 性能优化
- 使用数据库连接池
- 启用查询缓存
- 使用分页查询
- 异步处理耗时操作
- 合理使用 Redis 缓存
- 数据库索引优化

### 3. 安全性
- SQL 注入防护（使用 PreparedStatement）
- XSS 攻击防护
- CSRF 防护
- 敏感数据加密
- HTTPS 部署
- 定期更新依赖

### 4. 可维护性
- 分层架构清晰
- 使用设计模式
- 编写单元测试
- API 文档完整
- 日志规范
- 代码审查

### 5. 高可用性
- 服务降级
- 熔断机制（Resilience4j）
- 限流策略
- 数据库读写分离
- 集群部署

## 常见问题解决

### 问题 1: 连接数据库失败
**解决方案:**
- 检查数据库服务是否启动
- 验证连接配置（URL、用户名、密码）
- 检查网络连接
- 查看防火墙设置

### 问题 2: Redis 连接超时
**解决方案:**
- 检查 Redis 服务状态
- 验证连接配置
- 增加连接超时时间
- 检查 Redis 内存使用情况

### 问题 3: JWT Token 过期
**解决方案:**
- 实现刷新令牌机制
- 延长 Token 有效期
- 前端实现自动刷新
- 存储刷新令牌到 Redis

### 问题 4: 内存溢出
**解决方案:**
- 调整 JVM 堆内存大小
- 优化查询避免加载大量数据
- 使用分页查询
- 分析内存泄漏（使用 VisualVM）

## 学习资源

### 官方文档
- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [Spring Framework 官方文档](https://spring.io/projects/spring-framework)
- [MyBatis-Plus 官方文档](https://baomidou.com/)
- [Spring Security 官方文档](https://spring.io/projects/spring-security)

### 推荐书籍
- 《Spring Boot 实战》
- 《深入理解 Spring Boot》
- 《Java 高并发程序设计》
- 《高性能 MySQL》

### 开源项目
- [Spring Boot 示例](https://github.com/spring-projects/spring-boot-samples)
- [spring-cloud-examples](https://github.com/spring-cloud-samples)

### 工具
- IntelliJ IDEA
- Postman
- Redis Desktop Manager
- Navicat / DataGrip

## 更新日志

### v1.0.0 (2025-01-01)
- 初始版本
- 包含完整的 Spring Boot 开发流程
- RESTful API 开发示例
- JWT 认证实现
- 数据库集成
- 测试示例

## 贡献指南

如果您发现问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 许可证

MIT License
