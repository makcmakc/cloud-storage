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
          <img
            :src="filesStore.getPublicURL+album.name"
            :alt="album.name"
            :width="width"
            :height="height"
            :class="cn(
              'card-image h-auto w-auto object-contain',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )"
          >
        </div>
        <div v-if="isVideo(album.metadata.mimetype)" class="overflow-hidden card rounded-md relative">
          <video controls :src="filesStore.getPublicURL+album.name"></video>
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
        <div v-if="isAudio(album.metadata.mimetype)" style="background-color: rgba(18, 23, 10, 0.8); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); display: flex; align-items: center; justify-content: center;" class="overflow-hidden rounded-xl border bg-card text-card-foreground shadow  p-4 card rounded-md relative">
          <!-- <img
            src="https://cdn-icons-png.flaticon.com/256/4287/4287943.png"
            :alt="album.name"
            :width="width"
            :height="height"
            :class="cn(
              'card-image h-auto w-auto object-cover',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )"
          > -->
          <div             :class="cn(
              'card-image h-auto w-auto object-cover',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )">
            <svg  height="100%" fill="#FAFAFA" width="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              viewBox="0 0 512  512" xml:space="preserve" style=" padding: 15px;">
            <g>
              <g>
                <path d="M503.319,5.939c-5.506-4.705-12.783-6.767-19.958-5.635L169.555,49.852c-12.04,1.901-20.909,12.28-20.909,24.47v99.097
                  v156.903H99.097C44.455,330.323,0,371.073,0,421.161C0,471.25,44.455,512,99.097,512c54.642,0,99.097-40.75,99.097-90.839v-66.065
                  V194.588l264.258-41.725v136.169h-49.548c-54.642,0-99.097,40.75-99.097,90.839s44.455,90.839,99.097,90.839
                  S512,429.959,512,379.871v-66.065V123.871V24.774C512,17.529,508.827,10.646,503.319,5.939z" />
              </g>
            </g>
            </svg>
          </div>
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
    <div class="space-y-1 text-sm">
      <h3 class="font-medium leading-5 text-center">
        {{ truncateString(album.name) }}
      </h3>
    </div>
  </div>
</template>