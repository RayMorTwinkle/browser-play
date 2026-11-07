<div align="center">

# 🎬 视频助手 (Video Helper)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/RayMorTwinkle/browser-play)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**一个强大的浏览器视频助手插件，支持自动续播和倍速控制**

[English](#english) | [中文](#中文)

</div>

---

<a name="中文"></a>
## 📖 简介

视频助手是一款浏览器扩展插件，安装后可以增强你的视频观看体验。它支持所有网站的 HTML5 视频播放器，让你轻松控制视频播放行为。

### ✨ 核心功能

- 🔄 **自动续播** - 视频暂停后自动继续播放，无需手动点击
- ⚡ **倍速播放** - 支持 0.1x ~ 16x 任意倍速调节
- 🌐 **全网页通用** - 支持所有网站的视频（YouTube、Bilibili、腾讯视频、爱奇艺等）
- 💾 **设置记忆** - 自动保存你的偏好设置
- 🛡️ **隐私保护** - 不收集任何用户数据

---

## 🚀 安装方法

### 方式一：Chrome 网上应用店（推荐）

> 即将上架，敬请期待

### 方式二：手动安装（开发者模式）

1. **下载插件**
   ```bash
   git clone https://github.com/RayMorTwinkle/browser-play.git
   cd browser-play
   ```

2. **安装依赖**
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **构建插件**
   ```bash
   pnpm build
   ```

4. **加载到浏览器**
   - 打开 Chrome 浏览器，输入 `chrome://extensions/`
   - 开启右上角的「开发者模式」
   - 点击「加载已解压的扩展程序」
   - 选择项目中的 `dist` 文件夹

---

## 📖 使用指南

### 首次使用

1. 安装插件后，点击浏览器工具栏的视频助手图标
2. 阅读并同意免责声明
3. 开始使用插件功能

### 功能设置

点击插件图标打开控制面板：

| 功能 | 说明 |
|------|------|
| ✅ 启用插件 | 开启/关闭插件功能 |
| 🔄 暂停时自动续播 | 视频暂停后自动继续播放 |
| ⚡ 播放速度 | 选择预设速度或自定义输入 |

### 快捷键

- 点击插件图标：打开控制面板
- 支持自定义速度：0.1x ~ 16x

---

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite + Turborepo
- **样式方案**: Tailwind CSS
- **扩展框架**: Chrome Extension Manifest V3
- **包管理器**: pnpm

---

## 📁 项目结构

```
browser-play/
├── chrome-extension/     # 扩展核心配置
│   ├── manifest.ts       # 插件清单
│   └── src/background/   # 后台脚本
├── pages/                # 插件页面
│   ├── popup/           # 弹出面板
│   ├── options/         # 选项页面（免责声明）
│   └── content/         # 内容脚本（视频控制）
├── packages/            # 共享包
│   ├── storage/         # 存储管理
│   ├── i18n/           # 国际化
│   ├── ui/             # UI 组件
│   └── shared/         # 共享工具
└── dist/               # 构建输出
```

---

## 🔧 开发指南

### 环境要求

- Node.js >= 22.15.1
- pnpm >= 10.11.0

### 开发命令

```bash
# 安装依赖
pnpm install

# 开发模式（热更新）
pnpm dev

# 构建生产版本
pnpm build

# 打包为 zip
pnpm zip

# 代码检查
pnpm lint

# 格式化代码
pnpm format
```

### Firefox 支持

```bash
# 开发模式
pnpm dev:firefox

# 构建
pnpm build:firefox

# 打包
pnpm zip:firefox
```

---

## ⚠️ 免责声明

1. 本扩展仅供个人学习和研究使用
2. 使用前请确保了解自动续播和倍速控制功能
3. 本扩展不会收集、存储或传输任何用户数据
4. 使用本扩展可能违反某些网站的服务条款，用户需自行承担风险
5. 不同网站的视频播放器实现方式不同，不保证在所有网站正常工作
6. 用户应遵守当地法律法规

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

---

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

---

## 👤 作者

**RayMor** - [@RayMorTwinkle](https://github.com/RayMorTwinkle)

---

<a name="english"></a>
## English

### Introduction

Video Helper is a browser extension that enhances your video watching experience. It supports HTML5 video players on all websites.

### Features

- 🔄 **Auto Resume** - Automatically resume video playback after pause
- ⚡ **Speed Control** - Support 0.1x ~ 16x playback speed
- 🌐 **Universal** - Works on all websites (YouTube, Bilibili, etc.)
- 💾 **Settings Persistence** - Automatically save your preferences
- 🛡️ **Privacy First** - No user data collection

### Installation

```bash
# Clone the repository
git clone https://github.com/RayMorTwinkle/browser-play.git
cd browser-play

# Install dependencies
npm install -g pnpm
pnpm install

# Build
pnpm build

# Load dist folder to chrome://extensions/ in developer mode
```

### Development

```bash
pnpm dev      # Development mode with HMR
pnpm build    # Production build
pnpm zip      # Package as zip
pnpm lint     # Lint code
pnpm format   # Format code
```

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star！**

</div>
