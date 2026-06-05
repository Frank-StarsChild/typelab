# TypeLab — 进度看板

## 当前里程碑

**MVP**：用户能登录、选课、打字、看成绩、上排行榜

目标完成时间：\_\_\_\_

---

## 已完成

- [x] T01 项目骨架 — Vue 3 + Vite + Router + Pinia + Tailwind + Supabase 基础结构已完成并通过构建验证
- [x] T02 Layout 与导航 — 顶部导航、路由入口、基础页面布局已合并到 dev/main

---

## 进行中

| 任务 | 负责人 | 分支 | 状态 |
|---|---|---|---|
| T01 骨架 | Tech Lead | main | 已完成 |
| T02 Layout | Yang | feature/layout | 已完成 |
| T03 Auth | Yang | feature/auth | 进行中 |
| T04 课程选择 | | feature/lesson-select | 未开始 |
| T05 打字引擎 | | feature/typing-engine | 未开始 |
| T06 结果页 | | feature/result | 未开始 |
| T07 排行榜 | | feature/leaderboard | 未开始 |
| T08 个人主页 | | feature/profile | 未开始 |
| T09 题库内容 | | content/xxx | 未开始 |

---

## 阻塞中

- T03 Auth PR #2 当前和 `dev` 存在文档冲突，且用户状态自动同步仍需完善，暂不标记完成。

---

## 已变更的决策

（无）

---

## 下一步

1. 先处理 T03 Auth PR #2：解决冲突并完善用户状态自动同步
2. 继续分配 T04-T09 负责人
3. T05 打字引擎优先，其他模块可以先用假数据
