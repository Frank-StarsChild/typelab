<script setup>
// TypingEngine 组件接口遵循 SPEC.md。
// 不在骨架阶段实现打字状态、计时、WPM、准确率等内部逻辑。
defineProps({
  text: {
    type: String,
    required: true,
  },
})

defineEmits(['complete'])
</script>

<template>
  <div>
    <!-- TypingEngine: 核心打字组件占位；不依赖 Supabase / 路由 / 登录状态。 -->
  </div>
</template>
