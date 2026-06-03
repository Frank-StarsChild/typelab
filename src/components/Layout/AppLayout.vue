<script setup>
import AppNavbar from './AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <AppNavbar />
    <main>
      <slot />
    </main>
  </div>
</template>
