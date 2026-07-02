# React Template

一个开箱即用的 React 前端工程模板，集成了现代化的技术栈与完善的工程化规范，适合作为中后台、SPA 等项目的起手脚手架。

## 技术栈

| 分类 | 技术 | 说明 |
| --- | --- | --- |
| 框架 | [React 18](https://react.dev/) | UI 框架 |
| 语言 | [TypeScript 5](https://www.typescriptlang.org/) | 类型系统 |
| 构建工具 | [Vite 5](https://vitejs.dev/) | 开发服务器与打包 |
| UI 组件库 | [shadcn/ui](https://ui.shadcn.com/) | 基于 Radix UI + Tailwind 的可复制组件 |
| 样式方案 | [Tailwind CSS 3](https://tailwindcss.com/) + [Sass](https://sass-lang.com/) + CSS Module | 原子化 + 预处理 + 局部作用域样式 |
| 状态管理 | [Zustand 5](https://zustand.docs.pmnd.rs/) | 轻量状态管理，无需 Provider |
| 路由 | [React Router 6](https://reactrouter.com/) | 客户端路由 |
| 请求 | [Axios](https://axios-http.com/) | HTTP 客户端 |
| 图标 | [lucide-react](https://lucide.dev/) | 图标库 |
| 代码规范 | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | 代码检查与格式化 |
| Git 规范 | [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) + [commitlint](https://commitlint.js.org/) + [commitizen (cz-git)](https://cz-git.qbb.sh/) | 提交前校验与规范化提交 |

## 环境要求

- Node.js >= 18.8.0
- 包管理器：Yarn (v1 Classic)

## 快速开始

```bash
# 安装依赖
yarn

# 启动开发服务器（默认 http://localhost:5173）
yarn dev

# 生产构建（先 tsc 类型检查，再 vite 打包，产物输出到 dist/）
yarn build

# 本地预览生产构建产物
yarn preview
```

## 可用脚本

| 命令 | 说明 |
| --- | --- |
| `yarn dev` | 启动 Vite 开发服务器，支持 HMR 热更新 |
| `yarn build` | 执行 `tsc -b` 类型检查后再用 Vite 打包 |
| `yarn preview` | 预览 `dist/` 生产构建产物 |
| `yarn lint` | 使用 ESLint 检查全部代码 |
| `yarn lint-staged` | 对暂存区文件执行 Prettier 格式化（由 Husky 调用） |
| `yarn commit` | 通过 cz-git 交互式生成规范化提交信息 |
| `yarn clean` | 删除 `node_modules`、`dist`、`yarn.lock` |

## 目录结构

```
react-template/
├── public/                     # 静态资源（不经打包，直接拷贝）
├── src/
│   ├── assets/                 # 图片等资源
│   ├── components/
│   │   └── ui/                 # shadcn/ui 组件（如 button.tsx）
│   ├── lib/
│   │   └── utils.ts            # cn() 工具：合并 Tailwind class
│   ├── pages/                  # 页面组件
│   │   ├── Home/
│   │   │   ├── CurItem/        # 列表项子组件
│   │   │   ├── Details/        # 详情区块（含 CSS Module 与 config）
│   │   │   └── index.tsx
│   │   └── Login/
│   │       └── index.tsx
│   ├── router/
│   │   └── index.ts            # 路由表（createBrowserRouter）
│   ├── store/
│   │   └── counterStore.ts     # Zustand 状态仓库示例
│   ├── index.css               # Tailwind 指令 + shadcn 设计变量
│   ├── main.tsx                # 应用入口
│   └── vite-env.d.ts
├── components.json             # shadcn/ui 配置
├── tailwind.config.js          # Tailwind 配置（含 shadcn 主题令牌）
├── postcss.config.js           # PostCSS 配置（tailwindcss + autoprefixer）
├── eslint.config.js            # ESLint Flat Config
├── .prettierrc                 # Prettier 规则
├── .commitlintrc.cjs           # commitlint + cz-git 提示配置
├── .lintstagedrc.cjs           # lint-staged 配置
├── .husky/                     # Git hooks（pre-commit / commit-msg）
├── vite.config.ts              # Vite 配置（含 @ 别名）
├── tsconfig.json               # TS 项目引用入口
├── tsconfig.app.json           # 应用侧 TS 配置
└── tsconfig.node.json          # Node（配置文件）侧 TS 配置
```

## 路径别名

`@` 指向 `src/` 目录，在 `vite.config.ts` 与 `tsconfig.app.json` 中均已配置：

```ts
import { Button } from '@/components/ui/button';
import useCounterStore from '@/store/counterStore';
```

## UI 组件库（shadcn/ui）

与传统组件库不同，shadcn/ui 不是 npm 依赖，而是把组件源码直接复制到项目中（位于 `src/components/ui/`），你可以自由修改。

配置文件为 `components.json`，别名、样式、图标库等已就绪。新增组件：

```bash
npx shadcn@latest add <component>
# 例如
npx shadcn@latest add input
npx shadcn@latest add dialog
```

组件依赖的样式令牌（颜色、圆角等）以 CSS 变量形式定义在 `src/index.css` 的 `:root` 与 `.dark` 中，并在 `tailwind.config.js` 里映射为 Tailwind 颜色。已内置明暗两套主题，切换时在根节点添加 `class="dark"` 即可。

用法示例：

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg" onClick={handleClick}>
  点击
</Button>;
```

Button 支持的 `variant`：`default` / `destructive` / `outline` / `secondary` / `ghost` / `link`；`size`：`default` / `sm` / `lg` / `icon`。

## 状态管理（Zustand）

Zustand 无需在应用顶层包裹 Provider，直接创建并使用 hook 即可。

定义仓库 `src/store/counterStore.ts`：

```ts
import { create } from 'zustand';

interface CounterState {
  value: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
  decrement: () => set((state) => ({ value: state.value - 1 })),
}));

export default useCounterStore;
```

在组件中按需选择状态（selector 可避免无关状态变化引起的重渲染）：

```tsx
import useCounterStore from '@/store/counterStore';

const value = useCounterStore((state) => state.value);
const increment = useCounterStore((state) => state.increment);
```

## 样式方案

- **Tailwind CSS**：原子化类名，全局可用。配置见 `tailwind.config.js`。
- **Sass**：支持 `.scss`，可在组件内配合 CSS Module 使用。
- **CSS Module**：以 `*.module.scss` 命名的文件自动启用局部作用域，例如 `src/pages/Home/Details/index.module.scss`：

  ```tsx
  import styles from './index.module.scss';
  <div className={styles.detail}>...</div>;
  ```

## 路由

路由集中定义在 `src/router/index.ts`，使用 `createBrowserRouter`：

```ts
import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';

const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/login', Component: Login },
]);

export default router;
```

在 `main.tsx` 中通过 `RouterProvider` 挂载。

## 代码规范

- **ESLint**：采用 Flat Config（`eslint.config.js`），集成 TypeScript、React Hooks、React Refresh 规则。运行 `yarn lint` 检查。
- **Prettier**：格式化规则见 `.prettierrc`（单引号、分号、行宽 100、尾逗号 all 等）。

## Git 提交规范

项目通过 Husky 在提交环节自动执行校验：

- **pre-commit**：执行 `lint-staged`，对暂存文件运行 Prettier 格式化。
- **commit-msg**：执行 `commitlint`，校验提交信息是否符合 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

推荐使用交互式提交（基于 cz-git，支持中文提示）：

```bash
yarn commit
```

支持的提交类型：

| 类型 | 说明 |
| --- | --- |
| `feat` | 新增功能 |
| `fix` | 修复缺陷 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响逻辑） |
| `refactor` | 代码重构 |
| `perf` | 性能提升 |
| `test` | 测试相关 |
| `build` | 构建 / 依赖变更 |
| `ci` | 持续集成配置 |
| `revert` | 回退代码 |
| `chore` | 其他修改 |

## License

MIT
