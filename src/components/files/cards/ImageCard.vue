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

<template>
  <BaseCard :file="props.file" :onDelete="props.onDelete">
    <template #icon>
      <div class="overflow-hidden card rounded-md relative">
        <img :src="file.url" :alt="file.name" class="card-image h-auto w-auto object-contain aspect-square" />
      </div>
    </template>
    
    <template #description>
      <h3 class="font-medium leading-5 text-center">
        {{ truncateString(file.name) }}
      </h3>
    </template>
  </BaseCard>  
  <!-- <div :class="cn('space-y-3 relative w-full xs:w-[150px]')" v-if="isLoading">
    <Skeleton class="h-[150px] w-auto " />
    <div class="space-y-2">
      <Skeleton class="h-4 w-full" />
    </div>
  </div>
  
  <div :class="cn('space-y-3 relative w-full xs:w-[150px] overflow-hidden')" v-if="!isLoading">
    <div class="overflow-hidden card rounded-md relative">
      <img
        :src="file.url"
        :alt="file.name"
        @load="loadedHandler"
        class="card-image h-auto w-auto object-contain aspect-square"
      >
    </div>

    <div class="space-y-1 text-sm">
      <h3 class="font-medium leading-5 text-center">
        {{ truncateString(file.name) }}
      </h3>
    </div>
  </div> -->
</template>