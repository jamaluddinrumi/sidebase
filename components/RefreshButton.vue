<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

const refreshing = ref(false)
const refreshAll = async () => {
  refreshing.value = true
  try {
    await refreshNuxtData()
  } finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div class="fixed bottom-[24px] right-[20px] z-[9999]">
    <button :disabled="refreshing" :class="{ loading: refreshing }" class="btn shadow" @click="refreshAll">
      <ArrowPathIcon :class="refreshing ? 'hidden' : ''" class="mr-2 h-4 w-4" />
      Refresh
    </button>
  </div>
</template>

<style scoped>
.btn-disabled,
.btn-disabled:hover,
.btn[disabled],
.btn[disabled]:hover {
  color: hsl(var(--nc) / var(--tw-text-opacity));
}
</style>
