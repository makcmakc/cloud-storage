<template>
  <div class="gap-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
    <Playlist
      v-for="album in madeForYouAlbums"
      :key="album.name"
      :album="album"
      class="w-[150px]"
      aspect-ratio="square"
      :width="150"
      :height="150" />
  </div>
</template>

<script setup>
import Playlist from "../components/Playlist.vue";
import { madeForYouAlbums } from '../components/albums'
</script>
