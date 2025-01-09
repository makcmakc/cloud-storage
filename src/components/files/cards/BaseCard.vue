<script setup lang="ts">
import { ref, watch } from 'vue'
import { cn } from '@/lib/utils'
import type { FileInfo } from '@/types/file'

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

import { Share, Download, FilePenLine, Info, Trash } from 'lucide-vue-next'


const props = defineProps<{
  file: FileInfo
  onDelete: (id: string) => void
  onEdit?: (id: string) => void
  onShare?: (id: string) => void
  loading?: boolean
}>()

const isLoading = ref(props.loading ?? false)

// monitoring changes in the loading status
watch(() => props.loading, (newValue) => {
  isLoading.value = newValue ?? false
})
</script>

<template>
  <div :class="cn('space-y-3 relative w-full xs:w-[150px]')" v-if="loading">
    <Skeleton class="h-[150px] w-auto" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-full" />
    </div>
  </div>
  
  <div :class="cn('space-y-3 relative w-full xs:w-[150px] overflow-hidden')" v-if="!loading">
    <ContextMenu>
      <ContextMenuTrigger>
        <slot name="icon" />
      </ContextMenuTrigger>
      <ContextMenuContent class="w-40">
        <ContextMenuItem><Share :size="16" class="mr-2"/>Share</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem><Download :size="16" class="mr-2"/>Download</ContextMenuItem>
        <ContextMenuItem><FilePenLine :size="16" class="mr-2"/>Edit</ContextMenuItem>
        <ContextMenuItem v-if="file.audioMetadata">
          <HoverCard :openDelay="0">
            <HoverCardTrigger class="w-full flex items-center">
              <Info :size="16" class="mr-2" />
              Info
            </HoverCardTrigger>
            <HoverCardContent side="right">
              <slot name="info" />
            </HoverCardContent>
          </HoverCard>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem @click="onDelete(file.id)"><Trash :size="16" class="mr-2" />Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>        

    <div class="space-y-1 text-sm">
      <slot name="description" />
    </div>
  </div>
</template>
