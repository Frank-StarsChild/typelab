<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['complete'])

const chars = ref(
  props.text.split('').map((char) => ({
    char,
    status: 'pending',
  }))
)

const currentIndex = ref(0)

function handleKeyDown(e) {
  if (currentIndex.value >= chars.value.length) return

  if (e.key === 'Tab') {
    e.preventDefault()
    if (chars.value[currentIndex.value].char === '\t') {
      chars.value[currentIndex.value].status = 'correct'
      currentIndex.value++
    } else {
      chars.value[currentIndex.value].status = 'wrong'
      currentIndex.value++
    }
    return
  }

  if (e.key.length === 1) {
    const expected = chars.value[currentIndex.value].char
    if (e.key === expected) {
      chars.value[currentIndex.value].status = 'correct'
    } else {
      chars.value[currentIndex.value].status = 'wrong'
    }
    currentIndex.value++
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    class="font-mono text-lg leading-relaxed"
    tabindex="0"
  >
    <div class="flex flex-wrap">
      <span
        v-for="(item, index) in chars"
        :key="index"
        class="relative"
        :class="{
          'text-slate-400': item.status === 'pending',
          'text-green-600': item.status === 'correct',
          'text-red-500': item.status === 'wrong',
        }"
      >
        <span
          v-if="item.char === '\n'"
          class="whitespace-pre-wrap"
        >↵</span>
        <span v-else-if="item.char === '\t'">→</span>
        <span v-else>{{ item.char }}</span>
        <span
          v-if="index === currentIndex && item.status === 'pending'"
          class="absolute -bottom-0.5 left-0 h-0.5 w-full bg-blue-500"
        ></span>
      </span>
    </div>
  </div>
</template>
