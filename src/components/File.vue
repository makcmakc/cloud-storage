<script setup lang="ts">
import type { Album } from './albums'
import { playlists } from './playlists'
import PlusCircledIcon from '~icons/radix-icons/plus-circled'
import { cn } from '@/lib/utils'
import { isVideo, isImage, isDocument, isAudio } from "@/utils/is.js"
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
        <div v-if="isDocument(album.metadata.mimetype)" class="overflow-hidden p-4 card rounded-md relative">
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
        <div v-if="isAudio(album.metadata.mimetype)" class="overflow-hidden p-4 card rounded-md relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10181/10181172.png"
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
        <!-- <ContextMenuItem>Add to Library</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
          <ContextMenuSubContent class="w-48">
            <ContextMenuItem>
              <PlusCircledIcon class="mr-2 h-4 w-4" />
              New Playlist
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem v-for="playlist in playlists" :key="playlist">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                class="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
              </svg>
              {{ playlist }}
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator /> -->
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