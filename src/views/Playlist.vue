<template>
  <div class="p-4 pb-8">{{  currentTrack  }}</div>
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


    <!-- <RadialSlider /> -->
    <!-- <round-slider
      v-model="playback"
      start-angle="90"
        end-angle="+360"
        line-cap="round"
      startValue="0"
      radius="80"
      min="0"
      max="100"
/> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AudioCard from "../components/AudioCard.vue";

// import RadialSlider from '../components/RadialSlider.vue'

import { madeForYouAlbums } from '../components/albums'

import { usePlaylistStore } from '@/stores/playlists' 

import RoundSlider from 'vue-three-round-slider'

// import { Slider } from '@/components/ui/slider'
const playback = ref(30)


import { usePlayerStore } from '@/stores/player' 
import { computed } from 'vue'

const playerStore = usePlayerStore()

const currentTrack = computed(() => {
  return playerStore.getCurrentTrack
})

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
