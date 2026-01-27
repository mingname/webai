-- 创建数据库
CREATE DATABASE IF NOT EXISTS uisheji CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE uisheji;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
  password VARCHAR(255) NOT NULL COMMENT '密码（加密）',
  nickname VARCHAR(50) DEFAULT NULL COMMENT '昵称',
  avatar VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
  email VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
  phone VARCHAR(20) DEFAULT NULL COMMENT '手机号',
  status TINYINT DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  last_login_time DATETIME DEFAULT NULL COMMENT '最后登录时间',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_username (username),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 插入测试用户（密码: 123456）
INSERT INTO users (username, password, nickname, avatar) 
VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iZC9e', '管理员', 
'https://api.dicebear.com/7.x/avataaars/svg?seed=admin')
ON DUPLICATE KEY UPDATE id=id;

INSERT INTO users (username, password, nickname, avatar) 
VALUES ('test', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iZC9e', '测试用户', 
'https://api.dicebear.com/7.x/avataaars/svg?seed=test')
ON DUPLICATE KEY UPDATE id=id;

-- 查询用户
SELECT * FROM users;
