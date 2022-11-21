<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

const refreshing = ref(false)
const refreshAll = async () => {
  refreshing.value = true
  try {
    await refreshNuxtData()
  }
  finally {
    refreshing.value = false
  }
}
</script>

<template>
  <div class="fixed bottom-[24px] right-[20px] z-[9999]">
    <button :disabled="refreshing" :class="{ loading: refreshing }" class="btn shadow" @click="refreshAll">
      <ArrowPathIcon :class="refreshing ? 'hidden' : ''" class="h-4 w-4 mr-2" />
      Refresh
    </button>
  </div>
</template>

<style lang="scss" scoped>

</style>
