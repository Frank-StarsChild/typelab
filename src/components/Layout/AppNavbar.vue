<template>
  <nav class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
      <RouterLink class="text-lg font-bold text-slate-900" :to="{ name: 'home' }">TypeLab</RouterLink>
      <div class="flex gap-4 text-sm text-slate-600">
        <RouterLink :to="{ name: 'home' }">课程</RouterLink>
        <RouterLink :to="{ name: 'leaderboard' }">排行榜</RouterLink>
        <RouterLink :to="{ name: 'profile' }">个人主页</RouterLink>
        <RouterLink :to="{ name: 'login' }">登录</RouterLink>
      </div>
    </div>
  </nav>
</template>
