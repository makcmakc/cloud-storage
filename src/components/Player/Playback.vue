<template>
  <div class="player-playback">
    <!-- {{  playback }}  -->
  
    <div class="w-full px-8 flex items-center">
      <div class="pr-4">
        <div class="text-zinc-400 text-xs font-light w-8">{{ trackProgress  }}</div>
      </div>
      <!-- truncate overflow-hidden text-ellipsis -->
      <div class="flex w-full -mt-2 flex-col items-center">
        <div class="pb-2 ">Made in Japan - Ysa Ferrer</div>
        <!-- update:modelValue -->
        <!-- @valueCommit="playbackHandler" -->
        <Slider v-model="playback" @update:modelValue="playbackHandler" class="progress-slider mx-4"/>
      </div>

      <div class="pl-4">
        <div class="text-zinc-400 text-xs font-light w-8">{{ trackDuration  }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { Slider } from '@/components/ui/slider'
import { usePlayerStore } from '@/stores/player' 

const playerStore = usePlayerStore()
// const progressInterval = ref(0)

const playback = ref([0])

const playbackHandler = (e: Event) => {
  playerStore.setPlayback(e[0])
}

// const playback = computed({
//   get() {
//     return [playerStore.getPlayback]
//   },
//   // set(v) {
//   //   // playerStore.setPlayback(v[0])
//   //   // console.log(v)
//   //   // playerStore.setPlayback((currentTime.value / duration.value * 100))
//   // }
// })






const toHHMMSS = (secs: number) => {
  const hours   = Math.floor(~~secs / 3600)
  const minutes = Math.floor(~~secs / 60) % 60
  const seconds = ~~secs % 60

  return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
}


const trackDuration = computed(() => {
  return duration.value ? toHHMMSS(duration.value) : '--:--'
})
// || currentTime.value == 0
const trackProgress = computed(() => {
  console.log(currentTime.value)
  return currentTime.value ? toHHMMSS(currentTime.value) : '--:--'
})

const currentTime = computed(() => {
  return playerStore.getCurrentSeconds
})

const duration = computed(() => {
  return playerStore.getDurationSeconds
})

const isPlaying = computed(() => {
  return playerStore.getAudioState
})


watch(currentTime, (v) => {
  playback.value = [currentTime.value / duration.value * 100]
})

watch(isPlaying, () => {
  // console.log(playerStore.getAudioState)
})
</script>
