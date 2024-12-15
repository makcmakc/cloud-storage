<template>
  <ScrollArea class="w-full py-4 px-2">
    <div class="gap-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      <AudioCard
        v-for="album in madeForYouAlbums"
        :key="album.name"
        :album="album"
        class="w-[150px]"
        aspect-ratio="square"
        :width="150"
        :height="150"
      />
    </div>
  </ScrollArea>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { ScrollArea } from '@/components/ui/scroll-area'
import AudioCard from "../components/AudioCard.vue";

import { madeForYouAlbums } from '../components/albums'

import { usePlaylistStore } from '@/stores/playlists' 
</script>
