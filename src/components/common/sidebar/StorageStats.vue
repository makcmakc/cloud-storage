<template>
  <Tooltip v-if="!isOpen">
    <TooltipTrigger as-child>
      <div class="flex items-center justify-center w-8 h-8 border rounded-md">
        <Database class="size-4" />
      </div>
    </TooltipTrigger>
    <TooltipContent side="right" class="flex items-center gap-4">
      <template v-if="stats">
        Used {{ formatFileSize(stats.usedSize) }} from {{ formatFileSize(stats.totalSize) }}
      </template>
      <template v-else-if="isLoading">
        Loading...
      </template>
      <template v-else>
        Error getting statistics
      </template>
    </TooltipContent>
  </Tooltip>
  <div class="border rounded-md p-2" v-else>
    <span class="truncate font-semibold block mb-3">Storage</span>
    <Progress v-model="usagePercent" />
    <div class="text-xs text-muted-foreground mt-2">
      <template v-if="stats">
        Used {{ formatFileSize(stats.usedSize) }} from {{ formatFileSize(stats.totalSize) }}
      </template>
      <template v-else-if="isLoading">
        Loading...
      </template>
      <template v-else>
        Error getting statistics
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { StorageStats } from '@/types/storage'

import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { Database } from 'lucide-vue-next'

import { formatFileSize } from "@/utils/formatFileSize"

// import { useFilesStore } from '@/stores/files'

interface props {
  isOpen: boolean
}

defineProps<props>()

const stats = ref<StorageStats | null>(null)
const isLoading = ref(true)

const fetchStats = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/storage/stats');
    stats.value = await response.json();
  } catch (error) {
    console.error('Error getting statistics:', error);
  } finally {
    isLoading.value = false;
  }
};

const usagePercent = computed(() => {
  if (!stats.value) return 0
  return (stats.value.usedSize / stats.value.totalSize) * 100
})

onMounted(() => {
  fetchStats()
})
</script>
