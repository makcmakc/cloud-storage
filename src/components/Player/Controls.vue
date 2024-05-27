<template>
  <div class="player-controls">
    <div class="mr-2 flex items-center">
      <div class="flex gap-4">
        <!-- <SkipBack :size="22" /> -->
        <component :is="toggleIcon" @click="toggleHandler" :size="24" class="cursor-pointer" />
        <!-- <SkipForward :size="22" /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { SkipBack, SkipForward, CirclePause, Play, CirclePlay  } from 'lucide-vue-next';

import { usePlayerStore } from '@/stores/player' 

const playerStore = usePlayerStore()


const toggleIcon = computed(() => {
  return isPlaying.value ? CirclePause : CirclePlay
})



const isPlaying = computed({
  get() {
    return playerStore.getAudioState
  },
  set(v) {
    return playerStore.setAudioState(v)
  }
})

const audioPlayer = ref<HTMLAudioElement>();

const toggleHandler = () => {
  isPlaying.value = !isPlaying.value

  if (!playerStore.getAudio) playerStore.initAudio()

  if (isPlaying.value) playerStore.playTrack()
  else playerStore.pauseTrack()
}
</script>