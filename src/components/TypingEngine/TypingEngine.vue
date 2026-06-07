<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['complete', 'progress'])

/* ==================== 状态初始化 ==================== */
const chars = ref([])
const currentIndex = ref(0)
const container = ref(null)
let isCompleted = false
let startTime = null

/* ==================== 监听 text 变化，重置状态 ==================== */
watch(
  () => props.text,
  async (newText) => {
    chars.value = newText.split('').map((char) => ({
      char,
      status: 'pending',
      touched: false,
    }))
    currentIndex.value = 0
    isCompleted = false
    startTime = null

    await nextTick()
    container.value?.focus()
  },
  { immediate: true },
)

/* ==================== WPM 计算 ==================== */
function calculateWpm() {
  if (!startTime) return 0
  const elapsedMinutes = (Date.now() - startTime) / 60000
  if (elapsedMinutes === 0) return 0
  const correctChars = chars.value.filter((c) => c.touched && c.status === 'correct').length
  return Math.round(correctChars / 5 / elapsedMinutes)
}

/* ==================== 准确率计算 ==================== */
function calculateAccuracy() {
  const typed = chars.value.filter((c) => c.touched)
  if (typed.length === 0) return 100
  const correct = typed.filter((c) => c.status === 'correct').length
  return Math.round((correct / typed.length) * 100)
}

/* ==================== 键盘事件处理 ==================== */
function handleKeyDown(e) {
  if (isCompleted) return

  // 忽略 Ctrl/Meta/Alt 组合键，防止快捷键干扰
  if (e.ctrlKey || e.metaKey || e.altKey) return

  // Backspace：回退并清除当前字符状态
  if (e.key === 'Backspace') {
    if (currentIndex.value > 0) {
      currentIndex.value--
      chars.value[currentIndex.value].status = 'pending'
      chars.value[currentIndex.value].touched = false
    }
    return
  }

  // 忽略输入法组合键（如中文输入法）
  if (e.isComposing) return

  // 已打完所有字符
  if (currentIndex.value >= chars.value.length) return

  // 首次按键时记录开始时间
  if (!startTime) {
    startTime = Date.now()
  }

  const expected = chars.value[currentIndex.value].char

  // 根据按键类型处理输入
  switch (e.key) {
    case 'Tab':
      e.preventDefault()
      chars.value[currentIndex.value].status = expected === '\t' ? 'correct' : 'wrong'
      chars.value[currentIndex.value].touched = true
      currentIndex.value++
      break
    case 'Enter':
      e.preventDefault()
      chars.value[currentIndex.value].status = expected === '\n' ? 'correct' : 'wrong'
      chars.value[currentIndex.value].touched = true
      currentIndex.value++
      break
    case ' ':
      // 空格可以代替 Tab
      if (expected === '\t') {
        chars.value[currentIndex.value].status = 'correct'
      } else {
        chars.value[currentIndex.value].status = e.key === expected ? 'correct' : 'wrong'
      }
      chars.value[currentIndex.value].touched = true
      currentIndex.value++
      break
    default:
      // 普通字符输入
      if (e.key.length === 1) {
        chars.value[currentIndex.value].status = e.key === expected ? 'correct' : 'wrong'
        chars.value[currentIndex.value].touched = true
        currentIndex.value++
      }
  }

  // 每次按键都更新进度
  emit('progress', { wpm: calculateWpm(), accuracy: calculateAccuracy() })

  // 打字完成，触发 complete 事件
  if (currentIndex.value >= chars.value.length) {
    isCompleted = true
    const duration = Math.max(1, Math.floor((Date.now() - startTime) / 1000))
    const correctCount = chars.value.filter((c) => c.status === 'correct').length
    const finalAccuracy = Math.round((correctCount / chars.value.length) * 100)
    emit('complete', {
      wpm: calculateWpm(),
      accuracy: finalAccuracy,
      duration,
      errors: chars.value.filter((c) => c.status === 'wrong').length,
    })
  }
}
</script>

<template>
  <div
    ref="container"
    class="font-mono text-lg leading-relaxed whitespace-pre-wrap break-words"
    tabindex="0"
    @keydown="handleKeyDown"
    @click="container?.focus()"
  >
    <span
      v-for="(item, index) in chars"
      :key="index"
      class="relative"
      :class="{
        'text-slate-400': item.status === 'pending',
        'text-green-600': item.status === 'correct',
        'text-red-500': item.status === 'wrong',
        'caret': index === currentIndex,
      }"
    >{{ item.char }}</span>
    <span
      v-if="currentIndex >= chars.length && chars.length > 0"
      class="caret"
    ></span>
  </div>
</template>

<style scoped>
.caret::after {
  content: '';
  display: inline-block;
  width: 2px;
  height: 1em;
  background: #3b82f6;
  margin-left: 1px;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>