<template>
  <BaseCard :file="props.file" :onDelete="props.onDelete">
    <template #icon>
      <div class="overflow-hidden card rounded-md relative">
        <img :src="file.audioMetadata?.coverUrl" :alt="file.name" class="card-image h-auto w-auto object-contain aspect-square" />
      </div>
    </template>
    <template #description>
      <h3 class="font-medium leading-5 text-center">
        {{ truncateString(file.name) }}
      </h3>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import type { FileInfo } from '@/types/file'
import { truncateString } from '@/utils/truncateString'

import BaseCard from './BaseCard.vue';

const props = defineProps<{
  file: FileInfo
  onDelete: (id: string) => void
  onEdit?: (id: string) => void
  onShare?: (id: string) => void
}>()
</script>

  <!-- <div class="space-y-2">
        <img 
          v-if="props.file.audioMetadata?.coverUrl" 
          :src="props.file.audioMetadata.coverUrl" 
          class="w-full h-40 object-cover rounded-md" 
        />
        <div v-if="props.file.audioMetadata" class="text-sm space-y-1">
          <p v-if="props.file.audioMetadata.title">
            <strong>Название:</strong> {{ props.file.audioMetadata.title }}
          </p>
          <p v-if="props.file.audioMetadata.artist">
            <strong>Исполнитель:</strong> {{ props.file.audioMetadata.artist }}
          </p>
          <p v-if="props.file.audioMetadata.album">
            <strong>Альбом:</strong> {{ props.file.audioMetadata.album }}
          </p>
          <p v-if="props.file.audioMetadata.duration">
            <strong>Длительность:</strong> {{ formatDuration(props.file.audioMetadata.duration) }}
          </p>
        </div>
      </div> -->