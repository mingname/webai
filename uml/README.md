# UML类图目录

本目录包含UI设计管理系统的所有UML类图和架构图。

## 📁 目录结构

```
uml/
├── README.md                # 本文件 - UML文档索引
├── 后端类图.md             # 后端系统类图
├── 前端类图.md             # 前端系统类图
└── 系统架构图.md           # 系统整体架构图
```

---

## 📋 文档说明

### 1. 后端类图.md
**用途**：后端系统类图和设计文档

**内容**：
- ✅ 服务器应用类图
- ✅ 认证控制器类图
- ✅ 认证中间件类图
- ✅ 验证中间件类图
- ✅ 路由类图
- ✅ 数据库类图
- ✅ 时序图（登录、注册、获取用户信息）
- ✅ 依赖关系图
- ✅ 数据流图
- ✅ 错误处理流程图

**技术栈**：
- Node.js
- Express 4.18
- MySQL 5.7+
- JWT 认证
- bcryptjs 密码加密

**适合人群**：后端开发人员、系统架构师

---

### 2. 前端类图.md
**用途**：前端系统类图和组件设计文档

**内容**：
- ✅ Vue应用根类图
- ✅ 路由类图
- ✅ 状态管理类图（Pinia Store）
- ✅ API客户端类图（Axios）
- ✅ 视图组件类图（LoginView、RegisterView、HomeView）
- ✅ 组件类图
- ✅ 时序图（登录、注册、退出登录、Tab切换）
- ✅ 组件关系图
- ✅ 数据流图
- ✅ 响应式系统图

**技术栈**：
- Vue 3.4
- Vite 5.0
- Pinia 2.1
- Vue Router 4.2
- Axios 1.6

**适合人群**：前端开发人员、UI设计师

---

### 3. 系统架构图.md
**用途**：系统整体架构和部署文档

**内容**：
- ✅ 整体架构图
- ✅ 部署架构图
- ✅ 数据流架构图
- ✅ 认证流程架构图
- ✅ 技术栈架构图
- ✅ 分层架构图
- ✅ 微服务架构图（未来扩展）
- ✅ 安全架构图
- ✅ 性能优化架构图
- ✅ 开发环境架构图
- ✅ 生产环境架构图

**架构模式**：
- 前后端分离
- RESTful API
- JWT 认证
- MVC 设计模式

**适合人群**：系统架构师、项目经理、运维人员

---

## 🎨 UML图类型

### 类图 (Class Diagram)
描述系统中类的结构、属性、方法以及类之间的关系。

**包含文件：**
- 后端类图.md
- 前端类图.md

### 时序图 (Sequence Diagram)
描述对象之间按时间顺序的交互过程。

**包含文件：**
- 后端类图.md（登录、注册、获取用户信息流程）
- 前端类图.md（登录、注册、退出登录、Tab切换流程）
- 系统架构图.md（认证流程）

### 架构图 (Architecture Diagram)
描述系统的整体结构和组件关系。

**包含文件：**
- 系统架构图.md（整体架构、部署架构、数据流架构等）

### 流程图 (Flow Diagram)
描述系统或业务流程的执行步骤。

**包含文件：**
- 后端类图.md（错误处理流程）
- 系统架构图.md（认证流程、数据流）

---

## 🛠️ 使用工具

### Mermaid语法
本文档使用 Mermaid 语法绘制UML图。

**支持的查看器：**
- GitHub / GitLab 原生支持
- VSCode + Mermaid Preview 插件
- Typora
- Obsidian
- 在线编辑器：https://mermaid.live/

**安装VSCode插件：**
```bash
# Mermaid Preview
code --install-extension bierner.markdown-mermaid
```

### PlantUML（可选）
如果需要使用PlantUML，可以转换Mermaid代码为PlantUML语法。

**支持的查看器：**
- PlantUML官方网站
- IntelliJ IDEA + PlantUML插件
- Eclipse + PlantUML插件

---

## 📊 图表统计

| 图表类型 | 数量 | 主要文件 |
|---------|------|---------|
| 类图 | 15+ | 后端类图.md、前端类图.md |
| 时序图 | 7 | 所有文件 |
| 架构图 | 12 | 系统架构图.md |
| 流程图 | 5 | 所有文件 |
| 组件关系图 | 3 | 所有文件 |
| 数据流图 | 4 | 所有文件 |

---

## 🎯 UML图阅读指南

### 符号说明

**类图符号：**
- `+`：public（公共）
- `-`：private（私有）
- `#`：protected（受保护）
- `~`：package（包级）
- `<>`：泛型
- `*`：多对多
- `1`：一对一
- `0..1`：零或一
- `0..*`：零或多
- `1..*`：一或多

**关系说明：**
- `-->`：关联
- `-->`：依赖
- `--|>`：实现
- `--|>`：继承
- `..>`：依赖
- `o-->`：聚合
- `*-->`：组合

### 时序图符号
- `->`：同步消息
- `-->`：异步消息
- `-->>`：返回消息
- `alt`：条件分支
- `opt`：可选分支
- `loop`：循环
- `rect`：激活框

---

## 📚 相关文档

### 设计文档
- **PRD.md**：产品需求文档
- **test/测试用例.md**：测试用例文档
- **test/单元测试.md**：单元测试文档
- **test/集成测试.md**：集成测试文档

### 设计原型
- **原型设计_demo.html**：交互式原型设计
- **ui设计demo.html**：UI视觉设计规范
- **设计原型.html**：设计原型文档
- **ui-原型.html**：UI交互原型

### 技术文档
- **backend/README.md**：后端开发文档
- **VUE_使用说明.md**：Vue使用说明
- **README.md**：项目总体说明

---

## 🔧 导出为图片

### 使用Mermaid CLI

```bash
# 安装 Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# 导出为PNG
mmdc -i input.mmd -o output.png

# 导出为SVG
mmdc -i input.mmd -o output.svg

# 导出为PDF
mmdc -i input.mmd -o output.pdf
```

### 使用在线工具
1. 访问 https://mermaid.live/
2. 复制Mermaid代码
3. 粘贴到编辑器
4. 导出为PNG/SVG/PDF

---

## 📝 更新日志

### v1.0 (2026-01-26)
- 初始版本发布
- 包含后端类图（8个主要类图）
- 包含前端类图（6个主要类图）
- 包含系统架构图（12个架构图）
- 包含时序图、流程图、数据流图

---

## 🎓 学习资源

### UML教程
- [UML 2.5 官方规范](https://www.omg.org/spec/UML/)
- [UML图解教程](https://www.uml-diagrams.org/)
- [Mermaid官方文档](https://mermaid.js.org/intro/)

### 系统架构
- [软件架构模式](https://patterns.arcitura.com/)
- [微服务架构设计](https://microservices.io/patterns/)
- [系统设计指南](https://github.com/donnemartin/system-design-primer)

---

## 📞 联系方式

如有UML图相关问题，请联系：
- **架构负责人**：待定
- **技术负责人**：待定
- **项目邮箱**：待定

---

## 📄 许可证

本文档遵循项目的 MIT 许可证。

---

**文档版本**：v1.0
**创建日期**：2026-01-26
**最后更新**：2026-01-26
**维护者**：开发团队
