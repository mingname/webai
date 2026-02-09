# 测试文档目录

本目录包含UI设计管理系统的所有测试相关文档和测试代码。

## 📁 目录结构

```
test/
├── README.md                 # 本文件 - 测试文档索引
├── 测试用例.md              # 完整的测试用例文档
├── 单元测试.md              # 单元测试方案和代码
├── 集成测试.md              # 集成测试方案和代码
└── (测试代码文件待创建)
```

## 📋 文档说明

### 1. 测试用例.md
- **用途**：完整的测试用例文档
- **内容**：
  - 后端API接口测试（20个用例）
  - 前端功能测试（12个用例）
  - 安全性测试（6个用例）
  - 性能测试（3个用例）
  - 兼容性测试（7个用例）
  - 测试总结和统计

**适合人群**：测试工程师、项目经理、开发人员

---

### 2. 单元测试.md
- **用途**：单元测试实施指南
- **内容**：
  - 环境配置（Jest、Vitest）
  - 后端控制器测试代码
  - 中间件测试代码
  - 前端Store测试代码
  - API测试代码
  - CI/CD集成配置

**适合人群**：前端开发人员、后端开发人员

---

### 3. 集成测试.md
- **用途**：集成测试和E2E测试指南
- **内容**：
  - 测试环境准备
  - 数据库集成测试
  - API集成测试
  - 前端E2E测试（Playwright）
  - CI/CD配置
  - 测试数据管理

**适合人群**：测试工程师、QA工程师

---

## 🚀 快速开始

### 前置条件

1. **后端测试**
   ```bash
   cd backend
   npm install
   # 配置测试数据库
   cp .env.example .env
   # 修改.env中的数据库配置
   ```

2. **前端测试**
   ```bash
   npm install
   ```

3. **E2E测试**
   ```bash
   npm install
   npx playwright install
   ```

---

## 📊 测试类型

### 1. 单元测试
**目标**：测试单个函数、组件或模块

**覆盖范围**：
- 后端控制器
- 中间件
- 前端Store
- 前端API
- 前端组件

**运行命令**：
```bash
# 后端单元测试
cd backend
npm test

# 前端单元测试
npm test
```

---

### 2. 集成测试
**目标**：测试多个模块之间的交互

**覆盖范围**：
- 完整的认证流程
- 数据库操作
- API端到端测试

**运行命令**：
```bash
cd backend
npm test -- __tests__/integration
```

---

### 3. E2E测试
**目标**：测试完整的用户流程

**覆盖范围**：
- 登录流程
- Tab切换
- 退出登录
- 响应式布局

**运行命令**：
```bash
npm run test:e2e
```

---

## 📈 测试覆盖率目标

| 类型 | 目标覆盖率 |
|------|-----------|
| 语句覆盖率 | ≥ 80% |
| 分支覆盖率 | ≥ 75% |
| 函数覆盖率 | ≥ 85% |
| 行覆盖率 | ≥ 80% |

---

## 🧪 测试工具栈

### 后端测试
- **Jest**：测试框架
- **Supertest**：HTTP请求测试
- **mysql2**：数据库操作
- **bcryptjs**：密码加密测试

### 前端测试
- **Vitest**：测试框架
- **@vue/test-utils**：Vue组件测试
- **@testing-library/vue**：Vue测试工具
- **happy-dom**：轻量级DOM环境

### E2E测试
- **Playwright**：E2E测试框架
- **@playwright/test**：测试运行器

---

## 📝 测试流程

### 开发阶段

1. **编写代码**
2. **编写单元测试**
3. **运行单元测试**
4. **修复问题**
5. **提交代码**

### 测试阶段

1. **运行所有单元测试**
2. **运行集成测试**
3. **运行E2E测试**
4. **检查测试覆盖率**
5. **生成测试报告**

### CI/CD阶段

1. **自动触发测试**
2. **运行所有测试**
3. **检查测试结果**
4. **生成覆盖率报告**
5. **决定是否合并代码**

---

## 🎯 测试优先级

### P0 - 核心功能（必须测试）
- 用户登录
- 用户注册
- Token验证
- 数据库操作

### P1 - 重要功能（应该测试）
- 记住密码
- Tab切换
- 用户信息获取
- 参数验证

### P2 - 一般功能（可以测试）
- 密码显示/隐藏
- 侧边栏导航
- 键盘快捷键
- 响应式布局

---

## 📚 测试资源

### 官方文档
- [Jest文档](https://jestjs.io/)
- [Vitest文档](https://vitest.dev/)
- [Playwright文档](https://playwright.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)

### 最佳实践
- [Jest最佳实践](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Vue测试指南](https://vuejs.org/guide/scaling-up/testing.html)

---

## 🔧 常见问题

### Q1: 如何运行特定的测试文件？
```bash
# 后端
cd backend
npm test authController.test.js

# 前端
npm test userStore.test.js
```

### Q2: 如何查看测试覆盖率报告？
```bash
# 后端
cd backend
npm run test:coverage
open coverage/index.html

# 前端
npm run test:coverage
open coverage/index.html
```

### Q3: 如何调试失败的测试？
```bash
# Jest
npm test -- --verbose

# Vitest
npm test -- --reporter=verbose

# Playwright
npm run test:e2e -- --debug
```

### Q4: 如何跳过某个测试？
```javascript
// Jest
test.skip('这个测试被跳过', () => {
  // 测试代码
});

// Vitest
test.skip('这个测试被跳过', () => {
  // 测试代码
});
```

### Q5: 如何只运行某个测试？
```javascript
// Jest/Vitest
test.only('只运行这个测试', () => {
  // 测试代码
});
```

---

## 📞 联系方式

如有测试相关的问题，请联系：
- **测试负责人**：待定
- **技术负责人**：待定
- **项目邮箱**：待定

---

## 📝 更新日志

### v1.0 (2026-01-26)
- 初始版本发布
- 包含完整的测试用例文档
- 包含单元测试方案
- 包含集成测试方案

---

**文档版本**：v1.0
**创建日期**：2026-01-26
**最后更新**：2026-01-26
**维护者**：开发团队
