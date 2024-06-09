<script setup lang="ts">
import type { File } from '@/types/file'
import { cn } from '@/lib/utils'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Share, ImagePlus, Download, FilePenLine, Copy, Trash } from 'lucide-vue-next';

import { useFilesStore } from '@/stores/files'
import { truncateString } from '@/utils/truncateString'
import { computed, ref } from 'vue'

interface FileProps {
  file: File
}

defineProps<FileProps>()

const loading = ref(true)
const filesStore = useFilesStore()
const publicURL = computed(() => filesStore.getPublicURL)

const loadedHandler = () => loading.value = false
</script>

<template>
  <div :class="cn('space-y-3 relative w-full xs:w-[150px]')" v-if="loading">
    <Skeleton class="h-[150px] w-auto " />
    <div class="space-y-2">
      <Skeleton class="h-4 w-full" />
    </div>
  </div>
  
  <div :class="cn('space-y-3 relative w-full xs:w-[150px] overflow-hidden')" v-show="!loading">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="overflow-hidden card rounded-md relative">
          <img
            :src="publicURL+file.name"
            :alt="file.name"
            @load="loadedHandler"
            class="card-image h-auto w-auto object-contain aspect-square"
          >
        </div>  
      </ContextMenuTrigger>
      <ContextMenuContent class="w-40">
        <ContextMenuItem>
          <Share :size="14" class="mr-2" />
          Share
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ImagePlus :size="14" class="mr-2" />
          Add to Album
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Download :size="14" class="mr-2" />
          Download
        </ContextMenuItem>
        <ContextMenuItem>
          <FilePenLine :size="14" class="mr-2" />
          Rename
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy :size="14" class="mr-2" />
          Copy
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Trash :size="14" class="mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>

    <div class="space-y-1 text-sm">
      <h3 class="font-medium leading-5 text-center">
        {{ truncateString(file.name) }}
      </h3>
    </div>
  </div>
</template>