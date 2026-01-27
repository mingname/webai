import mysql from 'mysql2/promise';
import fs from 'fs';

async function initDatabase() {
  try {
    // 1. 连接到 MySQL 服务器（不指定数据库）
    const conn = await mysql.createConnection({
      host: '115.190.154.26',
      user: 'root',
      password: 'Root@2026!'
    });
    console.log('✅ 连接到 MySQL 服务器');

    // 2. 创建数据库
    await conn.query('CREATE DATABASE IF NOT EXISTS uisheji CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    console.log('✅ 数据库创建/检查完成');

    // 3. 使用数据库
    await conn.query('USE uisheji');
    console.log('✅ 选择数据库');

    // 4. 创建用户表
    await conn.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表'
    `);
    console.log('✅ users 表创建完成');

    // 5. 插入测试用户
    await conn.query(`
      INSERT INTO users (username, password, nickname, avatar) 
      VALUES ('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iZC9e', '管理员', 
      'https://api.dicebear.com/7.x/avataaars/svg?seed=admin')
      ON DUPLICATE KEY UPDATE id=id
    `);
    console.log('✅ admin 用户插入完成');

    await conn.query(`
      INSERT INTO users (username, password, nickname, avatar) 
      VALUES ('test', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iZC9e', '测试用户', 
      'https://api.dicebear.com/7.x/avataaars/svg?seed=test')
      ON DUPLICATE KEY UPDATE id=id
    `);
    console.log('✅ test 用户插入完成');

    // 6. 查询用户
    const [users] = await conn.query('SELECT * FROM users');
    console.log('\n✅ 数据库初始化完成！\n当前用户数：', users.length);
    users.forEach(u => console.log(`  - ${u.username} (${u.nickname})`));

    conn.end();
  } catch (error) {
    console.error('❌ 错误：', error.message);
    process.exit(1);
  }
}

initDatabase();
