<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Upload } from 'lucide-vue-next'

interface props {
  isOpen: boolean
}

defineProps<props>()
</script>

<template>
  <div class="cursor-pointer relative">
    <Button v-if="isOpen" class="w-full gap-2" variant="secondary">
      <Upload :size="16" />
      Upload file
    </Button>
    <div v-else :class="cn(buttonVariants({ variant: 'secondary' }), 'p-1 w-8 h-8')">
      <Upload :size="14" />
    </div>
  </div>
</template>
