<template>
  <div class="gap-4 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
    <AudioCard
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
import { onMounted, ref } from "vue";
import AudioCard from "../components/AudioCard.vue";
import { madeForYouAlbums } from '../components/albums'

import { usePlaylistStore } from '@/stores/playlists' 

const filesStore = usePlaylistStore()
const playlists = ref([])

onMounted(async () => {
  const data = await filesStore.fetchPlaylists()
  await filesStore.fetchPublicURL()
  playlists.value = data
  console.log(playlists, ':playlists')


  console.log(filesStore.getPublicURL, ':files')
})
</script>
