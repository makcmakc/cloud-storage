<script setup lang="ts">
import type { Album } from './albums'
import { playlists } from './playlists'
import PlusCircledIcon from '~icons/radix-icons/plus-circled'
import { cn } from '@/lib/utils'
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

import { Skeleton } from '@/components/ui/skeleton'

import { Play, CirclePlay } from 'lucide-vue-next';


interface AlbumArtworkProps {
  album: Album
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}
withDefaults(defineProps<AlbumArtworkProps>(), {
  aspectRatio: 'portrait',
})

const playHandler = (song: object) => {
  alert('Song play click!')
  console.log(song)
}
</script>
<!-- space-y-3 -->
<template>
  <div :class="cn('space-y-3 relative w-full xs:w-[150px]')">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="overflow-hidden card rounded-md relative">
          <img
            :src="album.cover"
            :alt="album.name"
            :width="width"
            :height="height"

            :class="cn(
              'card-image h-auto w-auto object-cover',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square',
            )"
          >
          <div class="card-action">
            <CirclePlay class="cursor-pointer" @click="playHandler(album)" color="#fff" :size="42" />
          </div>
        </div>

      </ContextMenuTrigger>
      <ContextMenuContent class="w-40">
        <ContextMenuItem>Add to Library</ContextMenuItem>
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
        <ContextMenuSeparator />
        <ContextMenuItem>Play Next</ContextMenuItem>
        <ContextMenuItem>Play Later</ContextMenuItem>
        <ContextMenuItem>Create Station</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Like</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
    <div class="space-y-1 text-sm">
      <h3 class="font-medium leading-none">
        {{ album.name }}
      </h3>
      <p class="text-xs text-muted-foreground">
        {{ album.artist }}
      </p>
    </div>
  </div>
</template>

<style>
.card:hover .card-action {
  opacity: 1;
  transition-property: opacity;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 150ms;  
}

.card-image {
  position: relative;
}

.card-action {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 100%;
  opacity: 0;
  z-index: 9;
  background: rgba(0, 0, 0, .5);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>