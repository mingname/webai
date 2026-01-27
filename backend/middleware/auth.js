import jwt from 'jsonwebtoken';

/**
 * JWT认证中间件
 */
export const authenticateToken = (req, res, next) => {
  // 从请求头获取token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: '未提供访问令牌',
      data: null
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        code: 403,
        message: '访问令牌无效或已过期',
        data: null
      });
    }

    // 将用户信息附加到请求对象
    req.user = user;
    next();
  });
};

/**
 * 生成JWT令牌
 */
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    nickname: user.nickname
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};
