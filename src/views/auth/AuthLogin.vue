<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth' 
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// icons
import GitHubLogo from '~icons/radix-icons/github-logo'
import { LockKeyhole, Mail, LoaderCircle } from 'lucide-vue-next'

// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

const router = useRouter()
const store = useAuthStore()

const isLoading = ref(false)

const formSchema = toTypedSchema(z
  .object({
    email: z
      .string()
      .min(2, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(2, { message: "This field has to be filled." }),
  })
)

const form = useForm({
  validationSchema: formSchema,
})

const signInHandler = form.handleSubmit(async values => {
  const { email, password } = values

  try {
    isLoading.value = true
    await store.signIn({ email, password })
    router.push('/')
  } catch (e) {
    console.error('Auth Error:', e.message);
  } finally {
    isLoading.value = false
  }
})

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
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        Sign In with E-mail
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your email & password below to sign in 
      </p>
    </div>
    <form>
      <div class="grid gap-2">
        <div class="grid gap-2">

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormControl>
                <div class="relative w-full max-w-sm items-center">
                  <Input
                    v-bind="componentField"
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
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormControl>
                <div class="relative w-full max-w-sm items-center">
                  <Input
                    v-bind="componentField"
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
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <Button :disabled="isLoading" @click="signInHandler" class="mt-2" type="button">
          <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
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