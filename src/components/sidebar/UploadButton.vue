<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Upload } from 'lucide-vue-next'
import axios from 'axios';
import { ref } from 'vue';

interface props {
  isOpen: boolean
}

defineProps<props>()

const handleUpload = () => {}
</script>

<template>
  <Button v-if="isOpen" class="w-full gap-2" variant="secondary" @click="handleUpload">
    <Upload :size="16" />
    Upload file
  </Button>
  <div v-else :class="cn(buttonVariants({ variant: 'secondary' }), 'p-1 w-8 h-8 cursor-pointer')" @click="handleUpload">
    <Upload :size="14" />
  </div>
</template>
