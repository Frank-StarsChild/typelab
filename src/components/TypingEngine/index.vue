<script setup>
import TypingEngine from './TypingEngine.vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

function handleComplete() {
  console.log('恭喜你输入完成！')
}
</script>

<template>
  <div class="typing-engine">
    <TypingEngine :text="text" @complete="handleComplete" />
  </div>
</template>

<style scoped>
.typing-engine {
  font-family: 'Fira Code', 'Consolas', monospace;
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 8px;
  min-height: 200px;
}
</style>