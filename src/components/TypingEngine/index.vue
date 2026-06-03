<script setup>
// TypingEngine 组件接口遵循 SPEC.md；内部逻辑由后续 T05 实现。
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
    <!-- TypingEngine 模块入口占位。 -->
  </div>
</template>
