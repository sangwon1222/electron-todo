<script setup lang="ts" scoped>
import { onMounted } from 'vue'
import { store } from './store/store'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push(store.page.tab)
})
</script>

<template>
  <router-view />
</template>
