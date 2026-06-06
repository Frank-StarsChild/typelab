<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

defineEmits(['complete'])

const currentIndex = ref(0)

const chars = computed(() => {
  return props.text.split('').map((char, index) => {
    let status = 'pending'
    if (index < currentIndex.value) {
      status = 'correct'
    }
    return { char, status, index }
  })
})
</script>

<template>
  <div class="typing-engine">
    <div class="text-display">
      <span
        v-for="item in chars"
        :key="item.index"
        :class="[
          'char',
          item.status,
          { cursor: item.index === currentIndex },
        ]"
      >{{ item.char === '\n' ? '↵\n' : item.char }}</span>
    </div>
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

.text-display {
  font-size: 1.25rem;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-all;
}

.char {
  display: inline;
  transition: color 0.05s ease;
}

.char.pending {
  color: #6b7280;
}

.char.correct {
  color: #22c55e;
}

.char.wrong {
  color: #ef4444;
}

.cursor {
  position: relative;
}

.cursor::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #3b82f6;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>