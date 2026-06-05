<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

defineEmits(['complete'])

const chars = computed(() => {
  return props.text.split('').map((char) => ({
    char,
    status: 'pending',
  }))
})
</script>

<template>
  <div class="font-mono text-lg leading-relaxed">
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
          v-if="index === 0 && item.status === 'pending'"
          class="absolute -bottom-0.5 left-0 h-0.5 w-full bg-blue-500"
        ></span>
      </span>
    </div>
  </div>
</template>
