# AGENTS.md

## 项目是什么

TypeLab：面向程序员的打字练习网站，通过打出算法实现来同时训练手速和算法记忆。

技术栈：Vue 3 + Vite + Tailwind CSS + Supabase + Vercel

## 重要文档（遇到不确定的先查这里）

- `SPEC.md` — 数据库表结构、组件接口、路由定义，所有人的对齐基准
- `docs/01_requirements.md` — 完整需求和验收标准
- `docs/02_architecture.md` — 模块职责和数据流
- `docs/03_tasks.md` — 你负责的任务详情在这里
- `CONTRIBUTING.md` — git 操作流程

## 你当前负责的模块

在 `docs/03_tasks.md` 里找到你的任务编号，看清楚：
- 文件范围（只改这些文件）
- 验收标准（做到这些才算完成）

## 开发规范

- 不新增 SPEC.md 里没有定义的接口或数据库字段
- 不修改其他人负责的组件文件
- Supabase 客户端统一从 `@/lib/supabase` 导入
- Pinia user store 统一从 `@/stores/user` 导入
- 样式用 Tailwind CSS，不要写内联 style

## 完成一个任务后

1. 对照 `docs/03_tasks.md` 中自己任务的验收标准逐条检查
2. `git add . && git commit -m "新增：xxx"` （commit 格式见 CONTRIBUTING.md）
3. `git push origin feature/你的分支名`
4. 去 CNB 仓库页面开 PR，目标分支是 `dev`
5. PR 描述里写：做了什么 / 怎么验证的 / 有什么问题

## 环境变量

运行项目需要在根目录建 `.env.local` 文件：
```
VITE_SUPABASE_URL=你的supabase项目url
VITE_SUPABASE_ANON_KEY=你的supabase anon key
```
这两个值找张老师要，不要提交到仓库。
