<template>
  <div class="player w-full">
    <div class=" flex items-center w-full px-10">
      <div class="player__left w-1/8">
        <Controls />
      </div>

      <div class="player__center w-5/6">
        <Playback />
      </div>

      <div class="player__right w-1/6">
        <VolumeBar />
      </div>

      <!-- {{  album }} -->
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'
import VolumeBar from './VolumeBar.vue'
import Controls from './Controls.vue'
import Playback from './Playback.vue'



interface Album {
  name: string
  artist: string
  cover: string
}

interface AlbumArtworkProps {
  album: Album
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}
withDefaults(defineProps<AlbumArtworkProps>(), {
  aspectRatio: 'portrait',
})


// console.log(album, aspectRatio, width, height)

// const props = defineProps<Props>();



</script>