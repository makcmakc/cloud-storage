<template>
  <div class="player-volume-bar">
    <div class="flex w-1/6 items-center  w-full">
      <component :is="volumeIcon" :size="24" class="ml-4 mr-1 cursor-pointer" @click="muteHandler" />
      <Slider v-model="volume" :max="1" :step="0.01" :min="0" class="volume-slider" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Slider } from '@/components/ui/slider'
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-vue-next';
import { usePlayerStore } from '@/stores/player' 

const playerStore = usePlayerStore()

const muteHandler = () => playerStore.setMute()

const volume = computed({
  get() {
    return [playerStore.getVolume]
  },
  set(v) {
    playerStore.setVolume(v[0])
  } 
})

const volumeIcon = computed(() => {
  if (volume.value[0] === 0) return VolumeX
  if (volume.value[0] < 0.2) return Volume
  if (volume.value[0] < 0.5) return Volume1
  else return Volume2
})
</script>