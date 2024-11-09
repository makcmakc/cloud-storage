<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth' 
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// icons
import { ShieldEllipsis, Mail, LoaderCircle, ShieldCheck } from 'lucide-vue-next'

// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter.vue'

const isLoading = ref(false)
const passwordScore = ref(0)
const password = ref('')

const router = useRouter()
const store = useAuthStore()

const scoreChange = score => passwordScore.value = score

const formSchema = toTypedSchema(z
  .object({
    email: z
      .string()
      .min(2, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(2, { message: "This field has to be filled." })
      .refine(() => passwordScore.value >= 60, {
        message: "The password is too weak. Use a stronger password.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      })
    }
  })
)

const form = useForm({
  validationSchema: formSchema,
})

const signUpHandler = form.handleSubmit(async values => {
  const { email, password } = values
  try {
    isLoading.value = true
    await store.signUp({ email, password })
    router.push('/')
  } catch (e) {
    console.error('Auth Error:', e.message);
  } finally {
    isLoading.value = false
  }  
})
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        Create an account
      </h1>
      <p class="text-sm text-muted-foreground">
        Let's get started
      </p>
    </div>    
    <form>
      <div class="grid gap-3">
        <div class="grid gap-3">

          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormControl>
                <div class="relative w-full max-w-sm items-center">
                  <Input
                    v-bind="componentField"
                    id="email"
                    placeholder="Email"
                    type="email"
                    autocomplete="off"
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
                <div>
                  <div class="relative w-full max-w-sm items-center">
                    <Input
                      v-bind="componentField"
                      v-model="password"
                      id="password"
                      placeholder="Password"
                      autocomplete="off"
                      type="password"
                      class="pl-8"
                      :disabled="isLoading"
                    />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                      <ShieldEllipsis class="size-4 text-muted-foreground" />
                    </span>
                  </div>

                  <PasswordStrengthMeter :password="password" @score-change="scoreChange" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormControl>
                <div class="relative w-full max-w-sm items-center">
                  <Input
                    v-bind="componentField"
                    id="confirm-password"
                    placeholder="Confirm password"
                    autocomplete="off"
                    type="password"
                    class="pl-8"
                    :disabled="isLoading"
                  />
                  <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <ShieldCheck class="size-4 text-muted-foreground" />
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>                
        </div>

        <Button :disabled="isLoading" @click="signUpHandler" class="mt-2" type="button">
          <LoaderCircle v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
          Sign Up
        </Button>
      </div>
    </form>
  </div>
</template>