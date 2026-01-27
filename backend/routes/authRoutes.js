import express from 'express';
import { login, getUserInfo, logout, register } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { loginValidation, validateResult } from '../middleware/validator.js';

const router = express.Router();

/**
 * @route   POST /api/login
 * @desc    用户登录
 * @access   Public
 */
router.post('/login', loginValidation, validateResult, login);

/**
 * @route   POST /api/register
 * @desc    用户注册
 * @access   Public
 */
router.post('/register', register);

/**
 * @route   GET /api/user/info
 * @desc    获取当前用户信息
 * @access   Private
 */
router.get('/user/info', authenticateToken, getUserInfo);

/**
 * @route   POST /api/logout
 * @desc    退出登录
 * @access   Public
 */
router.post('/logout', logout);

export default router;
