# 思维阶梯 (MindStairs)

> 每一步，都算数

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](./CONTRIBUTING.md)
[![Status](https://img.shields.io/badge/status-in%20development-blue)](https://github.com/jsven/MindStairs/issues)

MindStairs 是一个开源的公益项目，旨在通过图形化和游戏化的方式，帮助小学及初中阶段的学生理解数学知识点。项目内容将通过微信小程序和 Web 网页进行分发。

## ✨ 项目特点 (Features)

*   **知识地图 (Knowledge Map):** 将小学到初中的数学知识点以“技能树”或“阶梯”的形式可视化，学习路径清晰明了。
*   **互动学习模块 (Interactive Modules):** 每一个知识点都是一个独立的、可操作的互动体验。强调“动手玩”而非“被动看”，加深对抽象概念的理解。
*   **即时反馈 (Instant Feedback):** 用户的操作会立即产生可视化结果。当操作错误时，系统会提供启发式引导，而不是简单的“对/错”判断。
*   **沙盒模式 (Sandbox Mode):** 在特定模块中提供高自由度的探索环境，鼓励学生自主发现数学规律。

## 🖥️ 预览 (Preview)

*访问 [项目在线演示地址](https://example.com) (开发中)*

*(此处放置项目截图或 GIF 动图)*

![知识地图预览](https://via.placeholder.com/800x450.png?text=Knowledge+Map+Screenshot)
*知识地图界面*

![周长与面积模块GIF](https://via.placeholder.com/800x450.png?text=Perimeter+and+Area+Module+GIF)
*周长与面积互动模块演示*

## 🎯 目标用户

*   小学、初中学生 (6-15岁)
*   希望辅助孩子学习的家长
*   寻求创新教学工具的教师

## 🛠️ 技术栈 (Tech Stack)

*   **前端框架:** Vue.js
*   **可视化库:**
    *   **2D交互:** Konva.js
    *   **图表:** ECharts
*   **后端服务 (可选):** Node.js

## 🚀 本地开发 (Getting Started)

1.  **克隆仓库**
    ```bash
    git clone https://github.com/jsven/MindStairs.git
    ```

2.  **进入项目目录**
    ```bash
    cd MindStairs
    ```

3.  **安装依赖**
    ```bash
    # 推荐使用 pnpm
    npm install -g pnpm
    pnpm install
    ```

4.  **启动开发环境**
    ```bash
    # 启动 Web 开发服务器
    pnpm run dev:h5

    # 编译微信小程序
    pnpm run dev:weapp
    ```
### 项目目录结构
``` 
.
├── public/ # 静态资源，不会被 Vite 处理
├── src/ # 项目核心源代码
├── .gitignore # Git 忽略文件配置
├── index.html # 应用入口 HTML
├── package.json # 项目依赖与脚本配置
├── README.md # 项目说明文档
└── vite.config.js # Vite 配置文件
``` 
### 项目核心业务代码
``` 
src/
├── assets/ # 全局静态资源 (图片, 字体, 全局样式)
│ ├── fonts/
│ ├── images/
│ └── styles/
│ ├── main.css # 全局基础样式
│ └── variables.css # CSS 变量
│
├── components/ # 全局可复用组件
│ ├── common/ # 基础通用组件 (如 Button.vue, Modal.vue)
│ └── layout/ # 布局组件 (如 AppHeader.vue, AppFooter.vue)
│
├── composables/ # 全局可复用的组合式函数 (Vue 3 Composition API)
│ ├── useDraggable.js # 例如：实现拖拽逻辑的 Hook
│ └── useUserProgress.js # 例如：获取用户学习进度的 Hook
│
├── core/ # 核心图形/游戏引擎封装
│ ├── konva/ # Konva.js 的封装与基类
│ └── p5/ # p5.js 的封装与基类
│
├── layouts/ # 页面布局模板
│ ├── DefaultLayout.vue # 默认布局（带页头页脚）
│ └── FocusLayout.vue # 专注模式布局（用于学习模块，无干扰）
│
├── modules/ # ⭐ 核心业务模块 (按年级和知识点划分)
│ ├── grade-3/ # 三年级
│ │ └── perimeter-and-area/ # 周长与面积知识点
│ │ ├── assets/ # 该模块专属的资源 (图片, 音效)
│ │ ├── components/ # 该模块内部的可复用组件
│ │ │ ├── AntWorker.vue # 蚂蚁工工角色组件
│ │ │ ├── Fence.vue # 围栏组件
│ │ │ └── LawnBrick.vue # 草坪砖组件
│ │ ├── composables/ # 该模块专属的组合式函数
│ │ │ └── useDraggable.js # 拖拽功能的组合式函数
│ │ └── index.vue # 该模块的主视图/入口组件
│ │
│ └── grade-4/ # 四年级
│ └── fraction-basics/ # 分数基础知识点
│ └── ... (类似结构)
│
├── router/ # 路由配置
│ └── index.js # 定义所有页面路由
│
├── stores/ # Pinia 状态管理
│ ├── index.js # 初始化 Pinia
│ ├── modules.js # 知识点模块状态 (如已解锁列表)
│ └── user.js # 用户状态 (如学习进度)
│
├── utils/ # 通用工具函数 (纯函数)
│ ├── math.js # 数学计算相关
│ └── formatters.js # 格式化函数
│
└── App.vue # Vue 应用根组件
└── main.js # 应用入口文件 (初始化 Vue, Router, Pinia)
``` 
## 目录设计思想

1.  **高内聚，低耦合 (`modules` 目录):**
    *   每个知识点（如 `perimeter-and-area`）都是一个独立的单元。它拥有自己的视图、组件、逻辑和资源。
    *   这使得开发者可以专注于单个模块的开发，而不用担心影响到其他模块。
    *   非常适合开源协作，不同的贡献者可以并行开发不同的知识点模块。

2.  **清晰的职责分离:**
    *   `components/`: 只存放全局、无业务逻辑的纯 UI 组件。
    *   `composables/`: 存放可复用的、带状态的逻辑。这是 Vue 3 逻辑复用的核心。
    *   `utils/`: 存放无副作用的纯工具函数。
    *   `stores/`: 集中管理需要跨组件、跨页面共享的全局状态。
    *   `core/`: 将底层的图形库（如 Konva.js）进行二次封装，提供统一、简洁的 API 给上层业务模块使用，避免业务代码与底层库强耦合。

3.  **路由与模块解耦:**
    *   在 `router/index.js` 中，路由配置会指向 `modules` 目录下的具体 `index.vue` 文件。这使得路由管理集中，易于配置和维护。
    *   路由可以使用动态导入（`() => import('@/modules/...')`），实现按需加载，优化首屏加载速度。

## 工作流示例：如何开发一个新知识点

假设要为五年级添加一个新的知识点“因数与倍数”(`factors-and-multiples`)：

1.  **创建目录结构:** 在 `src/modules/` 下创建 `grade-5/factors-and-multiples/` 目录，并按需创建其子目录 `components`, `composables`, `assets`。

2.  **开发主视图:** 在 `grade-5/factors-and-multiples/` 下创建 `index.vue`，这是该知识点互动玩法的入口界面。

3.  **编写核心逻辑:** 如果有复杂的交互逻辑（如拖拽数字、判断整除），在 `composables/` 目录下创建 `useFactorsGame.js` 等组合式函数来封装这部分逻辑。

4.  **创建模块内组件:** 在 `components/` 目录下创建该模块独有的组件，例如 `NumberCard.vue`。

5.  **添加全局组件 (如果需要):** 如果开发中发现某个组件（如一个通用的“提示框”）可以在其他模块复用，则应将其提取到 `src/components/common/` 中。

6.  **注册路由:** 打开 `src/router/index.js`，添加一条新路由：
    ```javascript
    {
      path: '/grade-5/factors-and-multiples',
      name: 'FactorsAndMultiples',
      component: () => import('@/modules/grade-5/factors-and-multiples/index.vue'),
      meta: { layout: 'FocusLayout' } // 使用专注模式布局
    }
    ```

7.  **更新状态 (如果需要):** 如果需要跟踪用户是否已完成此模块，可以在 `src/stores/user.js` 的状态中进行记录。
## 🤝 如何贡献 (How to Contribute)

欢迎任何形式的贡献，包括但不限于：
*   提交代码 (新功能, Bug修复)
*   提供新的知识点模块设计方案
*   优化 UI/UX 设计
*   完善文档或翻译

贡献流程:
1.  将此仓库 **Fork** 到你自己的账户下。
2.  基于 `main` 分支创建一个新的特性分支 (`git checkout -b feature/your-new-feature`)。
3.  在你的分支上进行修改和开发。
4.  确保你的代码通过了 lint 检查。
5.  提交你的修改 (`git commit -m 'feat: Add some amazing feature'`)。
6.  将你的分支推送到你的 Fork 仓库 (`git push origin feature/your-new-feature`)。
7.  创建一个 **Pull Request** 到本仓库的 `main` 分支，并清晰地描述你的修改内容。

在开始大的改动之前，建议先通过 [Issues](https://github.com/jsven/MindStairs/issues) 创建一个议题来讨论你的想法。

更多细节请参考 [CONTRIBUTING.md](./CONTRIBUTING.md) (待创建)。

## 📄 许可证 (License)

本项目基于 [MIT License](./LICENSE) 开源。