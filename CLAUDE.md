# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 命令

- `yarn dev` — 启动 Vite 开发服务器
- `yarn build` — 先用 `tsc -b` 做类型检查，再用 Vite 构建（任何类型错误都会导致构建失败）
- `yarn preview` — 在本地预览生产构建产物
- `yarn lint` — 对整个项目运行 ESLint
- `yarn commit` — 通过 cz-git 交互式生成符合 Conventional Commits 的提交信息（用它代替 `git commit`）
- `yarn clean` — 删除 `node_modules`、`dist` 和 `yarn.lock`

包管理器为 **yarn**（v1）。项目未配置测试框架。

## 架构

Vite + React 18 + TypeScript 的单页应用。入口是 `src/main.tsx`，它挂载了来自 `src/router/index.ts` 的 `RouterProvider`。没有全局 context/provider 包裹层——状态直接通过 Zustand hook 访问。

- **路由** — `src/router/index.ts` 使用 `createBrowserRouter` 定义路由，采用 `Component` 字段（而非 `element`）。页面位于 `src/pages/<Name>/index.tsx`。
- **状态管理** — Zustand。仓库位于 `src/store/`（如 `counterStore.ts`），通过 `create<T>()` 创建，并用 selector hook 消费：`useCounterStore((state) => state.value)`。action 与 state 一起定义在仓库内部，无需 provider。
- **UI 组件** — shadcn/ui（不是依赖包，源码直接拷贝进仓库）。组件位于 `src/components/ui/`。`components.json` 用于配置 shadcn CLI。通过 `npx shadcn@latest add <component>` 新增组件。组件使用 `class-variance-authority` 管理变体，并用 `src/lib/utils.ts` 里的 `cn` 工具（clsx + tailwind-merge）组合类名。
- **样式方案** — 三层并存：Tailwind 原子类（主要方式）、Sass/CSS Modules（`*.module.scss`，用于组件级作用域样式）、以及 shadcn 设计令牌。主题令牌是 `src/index.css` 中的 HSL CSS 变量，在 `tailwind.config.js` 中映射为 Tailwind 颜色；暗色模式基于 class（`darkMode: ['class']`）。

## 约定

- 路径别名 `@/` 映射到 `src/`（在 `vite.config.ts` 和 `tsconfig.app.json` 中均有配置）。跨目录导入时使用它。
- 项目为 ESM（`"type": "module"`）。配置文件使用 `import`/`export` 而非 `require`。注意 `.cjs` 配置文件（`.commitlintrc.cjs`、`.lintstagedrc.cjs`）是例外。
- Prettier：单引号、加分号、尾逗号、JSX 使用单引号、每行宽度 100。

## Git 钩子（Husky）

- `pre-commit` 运行 `lint-staged` → Prettier 格式化暂存文件。
- `commit-msg` 使用 `@commitlint/config-conventional` 运行 commitlint。提交信息必须遵循 Conventional Commits 规范；建议用 `yarn commit` 交互式生成合规信息。
