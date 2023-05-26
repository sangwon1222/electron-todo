<script setup lang="ts" scoped>
import { useRouter } from 'vue-router'
import { store } from '../store/store'

const router = useRouter()

const goHome = () => {
  store.page.tab = '/'
  router.push('/')
}
</script>

<template>
  <div class="relative flex flex-col items-center flex-wrap gap-10 w-full text-white">
    <div class="flex flex-col items-center gap-10 py-10">
      <p>없는 페이지 이거나 준비중인 페이지 입니다.</p>
      <button class="border-2 p-20 rounded-xl" @click="goHome">Go Home</button>
    </div>
  </div>
</template>
