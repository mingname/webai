import db from '../config/database.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth.js';

/**
 * 用户登录
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, hasPassword: !!password });

    // 查询用户
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ? AND status = 1',
      [username]
    );

    console.log('Users found:', users.length);

    if (users.length === 0) {
      return res.status(401).json({
        code: 401,
        message: '用户名或密码错误',
        data: null
      });
    }

    const user = users[0];

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        message: '用户名或密码错误',
        data: null
      });
    }

    // 更新最后登录时间
    await db.query(
      'UPDATE users SET last_login_time = NOW() WHERE id = ?',
      [user.id]
    );

    // 生成JWT令牌
    const token = generateToken(user);

    // 返回用户信息（不包含密码）
    const { password: _, ...userInfo } = user;

    res.json({
      code: 200,
      message: '登录成功',
      data: {
        token,
        userInfo: {
          id: userInfo.id,
          username: userInfo.username,
          nickname: userInfo.nickname,
          avatar: userInfo.avatar,
          email: userInfo.email
        }
      }
    });

  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({
      code: 500,
      message: '服务器内部错误',
      data: null
    });
  }
};

/**
 * 获取当前用户信息
 */
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await db.query(
      'SELECT id, username, nickname, avatar, email, phone, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        code: 404,
        message: '用户不存在',
        data: null
      });
    }

    res.json({
      code: 200,
      message: '获取成功',
      data: users[0]
    });

  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({
      code: 500,
      message: '服务器内部错误',
      data: null
    });
  }
};

/**
 * 退出登录
 */
export const logout = (req, res) => {
  // JWT是无状态的，客户端删除token即可
  res.json({
    code: 200,
    message: '退出成功',
    data: null
  });
};

/**
 * 用户注册（可选）
 */
export const register = async (req, res) => {
  try {
    const { username, password, nickname } = req.body;

    // 检查用户名是否已存在
    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({
        code: 400,
        message: '用户名已存在',
        data: null
      });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 生成默认头像
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    // 插入用户
    const [result] = await db.query(
      'INSERT INTO users (username, password, nickname, avatar) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, nickname || username, avatar]
    );

    res.status(201).json({
      code: 201,
      message: '注册成功',
      data: {
        id: result.insertId,
        username,
        nickname: nickname || username,
        avatar
      }
    });

  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({
      code: 500,
      message: '服务器内部错误',
      data: null
    });
  }
};
