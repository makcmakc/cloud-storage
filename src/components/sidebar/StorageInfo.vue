<template>
  <div class="border rounded-md  p-2">
    <span class="truncate font-semibold ">Storage</span>
    <Progress v-model="progress" class="mt-3 mb-2" />
    <div class="text-xs text-muted-foreground">
      Used 1.3gb from 4gb
    </div>
  </div>
</template>

<script setup>
import { Progress } from '@/components/ui/progress'
import { ref } from 'vue'

const progress = ref(13)
</script>
