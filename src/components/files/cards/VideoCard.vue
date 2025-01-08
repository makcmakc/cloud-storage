<script setup lang="ts">
import type { FileInfo } from '@/types/file'
import { truncateString } from '@/utils/truncateString'

import BaseCard from './BaseCard.vue';
import { computed, ref } from 'vue';


const props = defineProps<{
  file: FileInfo
  onDelete: (id: string) => void
  onEdit?: (id: string) => void
  onShare?: (id: string) => void
}>()

// const emit = defineEmits<{
//   (e: 'delete', id: string): void
//   (e: 'rename', id: string): void
//   (e: 'share', id: string): void
// }>()

// const showDropdown = ref(false)
const showPreview = ref(false)


// const resolution = computed(() => {
//   const { width, height } = props.file.videoMetadata || {}
//   if (!width || !height) return ''
//   return `${width}x${height}`
// })

</script>

<template>
  <BaseCard :file="props.file" :onDelete="props.onDelete">
    <template #icon>
      <div class="overflow-hidden card rounded-md relative">
        <video :src="file.url" :alt="file.name" controls class="card-image h-auto w-auto object-contain aspect-square"></video>
      </div>
    </template>

    <!-- Превью видео -->
    <div class="relative group">
      <div 
        class="w-full aspect-video rounded-lg overflow-hidden bg-gray-100"
        :class="{ 'cursor-pointer': !showPreview }"
      >
        <template v-if="showPreview && props.file.videoMetadata?.previewUrl">
          <video :src="props.file.videoMetadata.previewUrl" class="w-full h-full object-cover" controls />
        </template>
        <template v-else-if="props.file.videoMetadata?.thumbnailUrl">
          <img 
            :src="props.file.videoMetadata.thumbnailUrl"
            :alt="props.file.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <!-- <Play class="w-12 h-12 text-white" /> -->
          </div>
        </template>
      </div>
    </div>
    
    <template #description>
      <h3 class="font-medium leading-5 text-center">
        {{ truncateString(file.name) }}
      </h3>
    </template>
  </BaseCard>
</template>