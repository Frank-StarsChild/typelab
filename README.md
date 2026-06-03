# TypeLab

面向程序员的打字练习网站，通过打出算法实现来同时训练手速和算法记忆。

## npm create vue@latest 配置选择

建议初始化时选择：

- Project name: `typelab`
- Add TypeScript? `No`
- Add JSX Support? `No`
- Add Vue Router for Single Page Application development? `Yes`
- Add Pinia for state management? `Yes`
- Add Vitest for Unit Testing? `No`（后续 TypingEngine 需要时再补）
- Add an End-to-End Testing Solution? `No`
- Add ESLint? `No`
- Add Prettier? `No`

本仓库已按上述选择生成 Vue 3 + Vite + Vue Router + Pinia 骨架，并补充 Tailwind CSS、Supabase、ECharts 依赖声明。

## 环境变量

在根目录创建 `.env.local`：

```bash
VITE_SUPABASE_URL=你的supabase项目url
VITE_SUPABASE_ANON_KEY=你的supabase anon key
```
