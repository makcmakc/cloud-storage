<template>
  <Tooltip v-if="!isOpen">
    <TooltipTrigger as-child>
      <div class="flex items-center justify-center w-8 h-8 border rounded-md">
        <Database class="size-4" />
      </div>
    </TooltipTrigger>
    <TooltipContent side="right" class="flex items-center gap-4">
      Used {{ formatFileSize(storageSize) }} from {{ formatFileSize(storageCapacity) }}
    </TooltipContent>
  </Tooltip>
  <div class="border rounded-md p-2" v-else>
    <span class="truncate font-semibold ">Storage</span>
    <Progress v-model="progress" class="mt-3 mb-2" />
    <div class="text-xs text-muted-foreground">
      Used {{ formatFileSize(storageSize) }} from {{ formatFileSize(storageCapacity) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Database } from 'lucide-vue-next'

import { useFilesStore } from '@/stores/files'
import { formatFileSize } from "@/utils/formatFileSize"

interface props {
  isOpen: boolean
}

defineProps<props>()

const filesStore = useFilesStore()

const storageSize = computed(() => filesStore.getTotalFilesSize)
const storageCapacity = computed(() => filesStore.getStorageCapacity)
const storageVolume = computed(() => filesStore.getStorageVolume)

const progress = ref(storageVolume)
</script>
