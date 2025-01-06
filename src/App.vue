<script setup>
import { RouterView, /*useRouter*/ } from 'vue-router'
import { onMounted } from 'vue'
import { Toaster } from '@/components/ui/toast'
import { useAuthStore } from '@/stores/auth' 

// const router = useRouter()
const store = useAuthStore()

onMounted(async () => {
  // await store.initUser()
  // store.startListeningToAuthChanges()
  // if (!store.user) router.push('/auth')
})
</script>

<template>
  <Toaster />
  <RouterView />
</template>
