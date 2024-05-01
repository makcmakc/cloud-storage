<script setup lang="ts">
import type { Album } from './albums'
import { playlists } from './playlists'
import PlusCircledIcon from '~icons/radix-icons/plus-circled'
import { cn } from '@/lib/utils'
import { isVideo, isImage, isDocument, isDOC, isPDF, isAudio } from "@/utils/is.js"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

import { Share, ImagePlus, Download, FilePenLine, Copy, Trash, Upload, Music, FolderPlus } from 'lucide-vue-next';

import { Skeleton } from '@/components/ui/skeleton'

import { useFilesStore } from '@/stores/files'
import { truncateString } from '@/utils/truncateString'


// folder icon - https://cdn-icons-png.freepik.com/256/12482/12482849.png?semt=ais_hybrid

const filesStore = useFilesStore()

interface AlbumArtworkProps {
  album: Album
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

withDefaults(defineProps<AlbumArtworkProps>(), {
  aspectRatio: 'portrait',
})
</script>

<template>
  <div :class="cn('space-y-3 relative w-full xs:w-[150px]')" v-if="filesStore.getLoading">
    <Skeleton class="h-[150px] w-auto" />
    <div class="space-y-2">
      <Skeleton class="h-3 w-full" />
    </div>
  </div>

  <div :class="cn('space-y-3 relative w-full p-2 xs:w-[150px] overflow-hidden')" v-else>
    <ContextMenu>
      <ContextMenuTrigger>
        <div v-if="isImage(album.metadata.mimetype)" class="overflow-hidden card rounded-md relative">
          <div :class="cn('relative w-full xs:w-[150px] relative')" v-if="album.uploading">
            <img
            :src="album.src"
            :alt="album.name"
            :width="width"
            :height="height"
            :class="cn('card-image h-auto w-auto object-contain', aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square')">
            <div class="status backdrop-blur-xs	bg-fil absolute	inset-y-0	">
                <svg class="w-full h-full" viewBox="0 0 130 130">
                  <!-- Background circle -->
                  <circle
                    class="text-neutral-400	 stroke-current"
                    stroke-width="5"
                    cx="65"
                    cy="65"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <!-- Progress circle -->
                  <circle
                    class="text-zinc-50 progress-ring__circle stroke-current"
                    stroke-width="5"
                    stroke-linecap="round"
                    cx="65"
                    cy="65"
                    r="40"
                    fill="transparent"
                    stroke-dasharray="251.2" 
                    :stroke-dashoffset="`calc(251.2 - (251.2 * ${album.progress}) / 100)`"
                  ></circle>
                  
                  <!-- Center text -->
                  <text style="font-weight: 700;" x="65" y="65" font-family="Verdana" fill="#fff" font-size="16" text-anchor="middle" alignment-baseline="middle">
                    {{  album.progress + '%' }}
                  </text>

                </svg>
            </div>
          </div>      
          <img v-else
            :src="filesStore.getPublicURL+album.name"
            :alt="album.name"
            :width="width"
            :height="height"
            :data-status="album.uploading"
            :class="cn('card-image h-auto w-auto object-contain', aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square')"
          >
        </div>
        <div v-if="isVideo(album.metadata.mimetype)" class="card relative">
          <!-- <div class="relative h-full w-full"> -->
            <video controls :src="filesStore.getPublicURL+album.name"           :class="cn(
              'card-image w-auto object-contain',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )"></video>
          <!-- </div> -->
        </div>
        <div v-if="isDOC(album.metadata.mimetype)" class="overflow-hidden p-4 card rounded-md relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png"
            :alt="album.name"
            :width="width"
            :height="height"
            :class="cn(
              'card-image w-auto object-contain',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )"
          >
        </div>
        <div v-if="isPDF(album.metadata.mimetype)" class="overflow-hidden p-4 card rounded-md relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png"
            :alt="album.name"
            :width="width"
            :height="height"
            :class="cn(
              'card-image w-auto object-contain',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )"
          >
        </div>          
        <div v-if="isAudio(album.metadata.mimetype)" class="overflow-hidden p-4 card rounded-md relative">
          <img
            src="https://cdn-icons-png.flaticon.com/256/4287/4287943.png"
            :alt="album.name"
            :width="width"
            :height="height"
            :class="cn(
              'card-image h-auto w-auto object-cover',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )"
          >
        </div>        
      </ContextMenuTrigger>
      <ContextMenuContent class="w-40">
        <ContextMenuItem>
          <Share :size="14" class="mr-2" />
            Share
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ImagePlus :size="14" class="mr-2" />
            Add to Album
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Download :size="14" class="mr-2" />
            Download
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <FilePenLine :size="14" class="mr-2" />
            Rename
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy :size="14" class="mr-2" />
            Copy
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Trash :size="14" class="mr-2" />
            Delete
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
    <div class="space-y-1 text-sm" v-if="!album.uploading">
      <h3 class="font-medium leading-5 text-center">
        {{ truncateString(album.name) }}
      </h3>
    </div>
  </div>
</template>


<style>
.progress-ring__circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>