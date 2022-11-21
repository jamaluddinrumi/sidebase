<script setup lang="ts">
// definePageMeta({
//   middleware: 'auth',
// })

const { data } = await useLazyFetch('/api/progress')
</script>

<template>

  <Head>
    <Title>Progress | INDOMASCOT</Title>
    <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  </Head>
  <main class="container grid min-h-screen place-content-center overflow-scroll bg-white dark:bg-gray-800">
    <Card :orders="data" />
    <RefreshButton />
  </main>
</template>
