<script setup>
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue';

const router = useRouter()
const currentRoute = computed(() => router.currentRoute.value.name)
const routeName = computed(() => currentRoute.value === 'login' ? 'create' : 'login')
const buttonTitle = computed(() => currentRoute.value === 'login' ? 'Sign Up' : 'Sign In')
</script>

<template>
  <div class="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <router-link :to="`/${routeName}`" :class="cn(
        buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8'
      )">
      {{  buttonTitle  }}
    </router-link>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <router-link to="/" class="relative z-20 flex items-center text-lg font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Meme Inc
      </router-link>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <RouterView />
      </div>
    </div>
  </div>
</template>
