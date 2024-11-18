<template>
  <div class="border rounded-md  p-2">
    <span class="truncate font-semibold ">Storage</span>
    <Progress v-model="progress" class="mt-3 mb-2" />
    <div class="text-xs text-muted-foreground">
      Used {{ formatFileSize(storageSize) }} from {{ formatFileSize(storageCapacity) }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useFilesStore } from '@/stores/files'
import { formatFileSize } from "@/utils/formatFileSize"
import { Progress } from '@/components/ui/progress'

const filesStore = useFilesStore()

const storageSize = computed(() => filesStore.getTotalFilesSize)
const storageCapacity = computed(() => filesStore.getStorageCapacity)
const storageVolume = computed(() => filesStore.getStorageVolume)

const progress = ref(storageVolume)
</script>
