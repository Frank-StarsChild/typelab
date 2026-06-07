<script setup>
import { computed } from 'vue'

const props = defineProps({
  wpm: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  duration: { type: Number, required: true },
  errors: { type: Number, required: true },
  bestWpm: { type: Number, default: null },
})

const formattedDuration = computed(() => {
  const secs = props.duration
  if (secs < 60) return `${secs}秒`
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return s > 0 ? `${m}分${s}秒` : `${m}分钟`
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
    <div class="rounded-xl bg-white p-4 shadow-sm">
      <p class="text-sm text-slate-500">打字速度</p>
      <p class="mt-1 text-2xl font-bold text-slate-900">{{ wpm }}<span class="text-base font-medium">WPM</span></p>
    </div>
    <div class="rounded-xl bg-white p-4 shadow-sm">
      <p class="text-sm text-slate-500">准确率</p>
      <p class="mt-1 text-2xl font-bold text-slate-900">{{ accuracy }}<span class="text-base font-medium">%</span></p>
    </div>
    <div class="rounded-xl bg-white p-4 shadow-sm">
      <p class="text-sm text-slate-500">用时</p>
      <p class="mt-1 text-2xl font-bold text-slate-900">{{ formattedDuration }}</p>
    </div>
    <div class="rounded-xl bg-white p-4 shadow-sm">
      <p class="text-sm text-slate-500">错误数</p>
      <p class="mt-1 text-2xl font-bold text-slate-900">{{ errors }}</p>
    </div>
  </div>

  <div v-if="bestWpm !== null" class="mt-4 rounded-xl bg-amber-50 p-4">
    <p class="text-sm text-amber-700">
      本课程历史最佳：
      <span class="font-bold">{{ bestWpm }} WPM</span>
      <span v-if="wpm > bestWpm" class="ml-2 text-green-600">新纪录!</span>
      <span v-else-if="wpm === bestWpm" class="ml-2 text-slate-500">持平</span>
      <span v-else class="ml-2 text-slate-500">还需努力</span>
    </p>
  </div>
</template>
