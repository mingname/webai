import { body, validationResult } from 'express-validator';

/**
 * 登录验证规则
 */
export const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .isLength({ min: 3, max: 50 })
    .withMessage('用户名长度应为3-50个字符')
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('密码不能为空')
    .isLength({ min: 6 })
    .withMessage('密码至少需要6个字符')
    .trim()
];

/**
 * 验证结果中间件
 */
export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: 400,
      message: '请求参数验证失败',
      data: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};
