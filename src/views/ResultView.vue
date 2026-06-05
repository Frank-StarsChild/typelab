<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getBestLessonWpm, saveResult } from '@/lib/db'
import ResultSummary from '@/components/Result/ResultSummary.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const result = ref(null)
const bestWpm = ref(null)
const saving = ref(false)

onMounted(async () => {
  const state = history.state?.result
  const hasQueryParams = route.query.wpm

  if (!state && !hasQueryParams) {
    router.replace({ name: 'home' })
    return
  }

  if (hasQueryParams) {
    result.value = {
      wpm: Number(route.query.wpm),
      accuracy: Number(route.query.accuracy),
      duration: Number(route.query.duration),
      errors: Number(route.query.errors),
      lessonId: route.query.lessonId,
    }
  } else {
    result.value = state
  }

  if (userStore.session) {
    const { data } = await getBestLessonWpm(userStore.user.id, state.lessonId)
    bestWpm.value = data || 0

    saving.value = true
    await saveResult({
      user_id: userStore.user.id,
      lesson_id: state.lessonId,
      wpm: state.wpm,
      accuracy: state.accuracy,
      duration: state.duration,
      errors: state.errors,
    })
    saving.value = false
  }
})

function tryAgain() {
  router.push({ name: 'lesson', params: { id: result.value.lessonId } })
}

function goHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-8">
    <h1 class="text-2xl font-semibold text-slate-900">成绩结果</h1>

    <div v-if="result" class="mt-6 space-y-6">
      <ResultSummary
        :wpm="result.wpm"
        :accuracy="result.accuracy"
        :duration="result.duration"
        :errors="result.errors"
        :best-wpm="bestWpm"
      />

      <div class="flex flex-col gap-3 sm:flex-row">
        <button
          class="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700"
          @click="tryAgain"
        >
          再来一次
        </button>
        <button
          class="rounded-lg border border-slate-300 bg-white px-6 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
          @click="goHome"
        >
          选其他课程
        </button>
      </div>

      <p v-if="!userStore.session" class="text-sm text-slate-500">
        登录后成绩将自动保存
      </p>
      <p v-else-if="saving" class="text-sm text-slate-400">
        成绩保存中...
      </p>
    </div>
  </section>
</template>