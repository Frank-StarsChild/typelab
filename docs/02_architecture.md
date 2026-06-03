# TypeLab — 架构设计

## 系统边界

TypeLab 是一个纯前端 Web 应用，外部依赖仅 Supabase（认证 + 数据库）。
无自定义后端服务。题库内容以静态 JSON 文件随前端代码一起部署。

```
Browser (Vue 3)
    ├── 读取 src/lessons/*.json     题库内容（静态文件）
    └── 调用 Supabase JS SDK        认证 + 读写 results 表
```

## 技术选型

| 层 | 选型 | 理由 |
|---|---|---|
| 前端框架 | Vue 3 + Vite | 团队已熟悉，LLM 代码质量稳定 |
| 路由 | Vue Router 4 | 官方标准 |
| 样式 | Tailwind CSS | 快速布局，无需自定义 CSS 体系 |
| 图表 | ECharts | 个人主页进步曲线 |
| 认证+数据库 | Supabase | 免费，内置 Auth，JS SDK 简单 |
| 部署 | Vercel | 免费，PR 自动预览，一键部署 |

见 `docs/adr/0001-supabase-over-custom-backend.md`。

## 目录结构

```
typelab/
├── docs/                    项目文档
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js         所有路由定义
│   ├── lib/
│   │   └── supabase.js      Supabase 客户端（单例）
│   ├── stores/
│   │   └── user.js          Pinia：当前登录用户状态
│   ├── lessons/             题库 JSON 文件
│   │   ├── index.js         聚合导出所有课程
│   │   ├── warmup/
│   │   ├── code/python/
│   │   └── concepts/
│   └── components/
│       ├── Layout/          导航栏、页面框架
│       ├── Auth/            登录、注册表单
│       ├── LessonSelect/    课程列表和筛选
│       ├── TypingEngine/    核心打字组件
│       ├── Result/          成绩结果页
│       ├── Leaderboard/     排行榜
│       └── Profile/         个人历史
├── SPEC.md                  接口约定（所有人必读）
├── AGENTS.md                Pi agent 上下文
└── CONTRIBUTING.md          Git 协作流程
```

## 路由设计

```
/                → LessonSelectView    课程列表
/lesson/:id      → TypingView          打字界面
/result          → ResultView          成绩页（通过 router state 传数据）
/leaderboard     → LeaderboardView     排行榜
/profile         → ProfileView         个人主页（需登录）
/login           → LoginView           登录/注册
```

## 模块职责

### TypingEngine（核心，优先级最高）

唯一输入：`text: string`
唯一输出：emit `complete` 事件，携带 `{ wpm, accuracy, duration, errors }`

内部状态：
- `chars`：将 text 拆分为字符数组，每个字符带状态（pending / correct / wrong）
- `startTime`：第一次按键时记录
- `currentIndex`：当前光标位置
- `errorCount`：累计错误次数

不依赖 Supabase，不依赖路由，是纯粹的 UI 组件。

### LessonSelect

从 `src/lessons/index.js` 读取所有课程元数据（不读 text 全文），
展示列表，用户点击后跳转 `/lesson/:id`。

### TypingView（页面级）

从路由参数拿到 `id`，从 lessons 找到对应课程，
把 `text` 传给 TypingEngine，
监听 `complete` 事件后：
1. 已登录 → 写 Supabase results 表
2. 未登录 → 跳过写库
3. 跳转 `/result`，通过 `router.push({ name: 'result', state: { result } })` 传成绩

### Leaderboard

直接查 Supabase：

```sql
SELECT user_id, users.email, MAX(wpm) as best_wpm, accuracy
FROM results
JOIN auth.users ON results.user_id = auth.users.id
GROUP BY user_id, users.email
ORDER BY best_wpm DESC
LIMIT 20
```

每 30 秒 setInterval 重查。

### Auth

使用 Supabase Auth：`supabase.auth.signUp()` / `supabase.auth.signInWithPassword()`
登录状态写入 Pinia user store，全局可用。

## 数据流

```
用户选课 → TypingView 加载文本 → TypingEngine 接收 text
         → 用户打字 → TypingEngine 内部状态变化
         → 打完 → emit complete({ wpm, accuracy, duration, errors })
         → TypingView 收到 → 写 Supabase → 跳转 Result
         → Result 展示数据
         → 排行榜读 Supabase 聚合数据
```

## 错误处理

| 场景 | 处理方式 |
|---|---|
| Supabase 写入失败 | 结果页显示"成绩保存失败"提示，不影响展示 |
| 课程 id 不存在 | 跳转回课程列表，显示提示 |
| 用户未登录访问 /profile | 跳转 /login |
| 网络断开时排行榜刷新 | 保留上次数据，显示"更新失败"小提示 |

## 测试策略

| 模块 | 测试方式 |
|---|---|
| TypingEngine | 单元测试（Vitest）：WPM 计算、字符状态转换、边界输入 |
| 其他组件 | 手动测试，Vercel PR 预览链接验证 |
| Supabase 操作 | 在开发环境 Supabase 项目里真实测试，不 mock |
