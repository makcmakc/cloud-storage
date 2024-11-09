<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth' 

// icons
import LucideSpinner from '~icons/lucide/loader-2'
import GitHubLogo from '~icons/radix-icons/github-logo'
import { LockKeyhole, Mail } from 'lucide-vue-next'

// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const isLoading = ref(false)
const email = ref('')
const password = ref('')

const router = useRouter()
const store = useAuthStore()

async function signInHandler() {
  try {
    isLoading.value = true
    await store.signIn({ email: email.value, password: password.value })
    router.push('/')
  } catch (e) {
    console.error('Auth Error:', e.message);
  } finally {
    isLoading.value = false
  }
}

async function signInWithGitHubHandler() {
  try {
    await store.signInWithGitHub()

  } catch (e) {
    console.error('Auth Error:', e.message);
  }
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form>
      <div class="grid gap-2">
        <div class="grid gap-2">
          <div class="relative w-full max-w-sm items-center">
            <Input
              v-model="email"
              id="email"
              placeholder="Email"
              type="email"
              autocapitalize="none"
              autocomplete="username"
              auto-correct="off"
              class="pl-8"
              :disabled="isLoading"
            />
            <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <Mail class="size-4 text-muted-foreground" />
            </span>
          </div>

          <div class="relative w-full max-w-sm items-center">
            <Input
              v-model="password"
              id="password"
              placeholder="Password"
              type="password"
              autocapitalize="none"
              autocomplete="current-password"
              auto-correct="off"
              class="pl-8"
              :disabled="isLoading"
            />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
              <LockKeyhole class="size-4 text-muted-foreground" />
            </span>
          </div>
        </div>

        <Button :disabled="isLoading" @click="signInHandler" class="mt-2" type="button">
          <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Sign In
        </Button>
      </div>
    </form>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <Button variant="outline" @click="signInWithGitHubHandler" type="button" :disabled="isLoading">
      <GitHubLogo class="mr-2 h-4 w-4" />
      GitHub
    </Button>
  </div>
</template>