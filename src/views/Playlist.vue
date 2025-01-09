<template>
  <ScrollArea class="w-full py-4 px-2">
    <div class="gap-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      <ContextMenu v-for="album in madeForYouAlbums" :key="album.name">
        <ContextMenuTrigger>
          <AudioCard
            :album="album"
            class="w-[150px]"
            aspect-ratio="square"
            :width="150"
            :height="150"
          />
        </ContextMenuTrigger>
        <ContextMenuContent class="w-40">
          <ContextMenuItem>Add to Favorite</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent class="w-48">
              <ContextMenuItem>
                <Heart class="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem v-for="playlist in playlists" :key="playlist">
                <ListMusic class="mr-2 h-4 w-4" :strokeWidth="1" :size="10" />
                {{ playlist }}
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  </ScrollArea>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import AudioCard from "../components/AudioCard.vue";

const madeForYouAlbums = []
</script>
