<script setup>
//导入规范：按照首字母顺序
import { computed, ref } from 'vue'

//组件通信（父传子）：string类型的text（必传）
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

//组件通信（子传父）：打字完成触发complete事件
defineEmits(['complete'])

//ref 绑定响应式数据，表示当前在哪一个字符，初始化为0
const currentIndex = ref(0)
const isStarted = ref(false)
const startTime = ref(null)
const errorCount = ref(0)

//computed 绑定响应式数据，表示当前字符的状态
const chars = ref(
  props.text.split('').map((char, index) => ({
    char,
    status: 'pending',
    index,
  })),
)

function handleKeydown(e) {
  if (currentIndex.value >= chars.value.length) {
    return
  }

  if (e.key === 'Tab') {
    e.preventDefault()
    if (chars.value[currentIndex.value].char === '\t') {
      chars.value[currentIndex.value].status = 'correct'
      currentIndex.value++
    }
    return
  }

  if (e.key.length !== 1) {
    return
  }

  if (!isStarted.value) {
    isStarted.value = true
    startTime.value = Date.now()
  }

  const currentChar = chars.value[currentIndex.value]

  if (e.key === currentChar.char) {
    currentChar.status = 'correct'
  } else {
    currentChar.status = 'wrong'
    errorCount.value++
  }

  currentIndex.value++
}
</script>

<template>
  <div class="typing-engine" tabindex="0" @keydown="handleKeydown">
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
  outline: none;
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