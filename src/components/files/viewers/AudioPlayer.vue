<template>
  <div class="bg-muted h-11 relative">
    <div class="flex items-center px-2 pb-2" style="height: 45px;">
      <div class="controls flex items-center gap-2">
        <svg @click="prevTrack" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"><path fill="currentColor" d="M8.445 14.832A1 1 0 0 0 10 14v-2.798l5.445 3.63A1 1 0 0 0 17 14V6a1 1 0 0 0-1.555-.832L10 8.798V6a1 1 0 0 0-1.555-.832l-6 4a1 1 0 0 0 0 1.664z"/></svg>

        <svg v-if="!isPlaying" @click="playPause" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 22 22"><path fill="currentColor" d="m6.192 3.67l13.568 7.633a.8.8 0 0 1 0 1.394L6.192 20.33A.8.8 0 0 1 5 19.632V4.368a.8.8 0 0 1 1.192-.697" /></svg>

        <svg v-if="isPlaying" @click="playPause" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M4.8 3h4.4a.8.8 0 0 1 .8.8v16.4a.8.8 0 0 1-.8.8H4.8a.8.8 0 0 1-.8-.8V3.8a.8.8 0 0 1 .8-.8m10 0h4.4a.8.8 0 0 1 .8.8v16.4a.8.8 0 0 1-.8.8h-4.4a.8.8 0 0 1-.8-.8V3.8a.8.8 0 0 1 .8-.8"/></svg>

        <svg @click="nextTrack" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"><path fill="currentColor" d="M4.555 5.168A1 1 0 0 0 3 6v8a1 1 0 0 0 1.555.832L10 11.202V14a1 1 0 0 0 1.555.832l6-4a1 1 0 0 0 0-1.664l-6-4A1 1 0 0 0 10 6v2.798z"/></svg>
      </div>

      <div class="info grow ml-6 pr-6">
        <div v-if="currentTrack" class="track-info">
          <!-- <span>{{ formatTime(currentTime) }}</span> -->
          <span class="info-title text-xs">{{ currentTrack.audioMetadata.title }}</span>
          <span class="info-author text-xs text-zinc-400 block">{{ currentTrack.audioMetadata.artist }}</span>
        </div>
      </div>

      <div class="actions flex items-center gap-4">
        <div @click="toggleRepeatMode" class="repeat cursor-pointer outline-none">
          <Repeat1 v-if="repeatMode === 'one'" :size="16" />
          <Repeat v-else-if="repeatMode === 'all'" :size="16" />
          <Repeat v-else-if="repeatMode === 'none'" :size="16" :color="'#a1a1aa'" />
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><path fill="currentColor" d="M51.063 22.41c1.453 0 2.25-.797 2.25-2.297V9.215c0-1.688-1.078-2.813-2.719-2.813c-1.383 0-2.18.446-3.281 1.29l-3 2.32c-.54.422-.75.89-.75 1.406c0 .75.562 1.383 1.523 1.383c.375 0 .75-.117 1.078-.399l2.414-1.945h.188v9.656c0 1.5.82 2.297 2.297 2.297m-48.68 4.008a2.57 2.57 0 0 0 2.578 2.578a2.576 2.576 0 0 0 2.602-2.578v-1.547c0-3.726 2.554-6.187 6.398-6.187h12.656v4.898c0 1.266.82 2.063 2.11 2.063c.562 0 1.148-.211 1.593-.586l8.86-7.313c1.054-.867 1.031-2.25 0-3.14l-8.86-7.36c-.445-.352-1.03-.586-1.593-.586c-1.29 0-2.11.82-2.11 2.086v4.852H14.453c-7.36 0-12.07 4.242-12.07 10.898Zm21.96 6.281c0-1.265-.796-2.062-2.085-2.062c-.563 0-1.148.21-1.594.562l-8.86 7.313c-1.054.867-1.054 2.25 0 3.14l8.86 7.36a2.52 2.52 0 0 0 1.594.586c1.289 0 2.086-.797 2.086-2.063v-4.898h17.203c7.36 0 12.07-4.266 12.07-10.899v-1.922a2.58 2.58 0 0 0-2.601-2.601a2.576 2.576 0 0 0-2.579 2.601v1.547c0 3.703-2.554 6.188-6.398 6.188H24.344Z"/></svg> -->
        </div>

        <div class="volume">
          <HoverCard :open-delay="50">
            <HoverCardTrigger as-child>
              <Volume2 :size="18" />
            </HoverCardTrigger>
            <HoverCardContent class="w-4 p-4 flex items-center justify-center">
              <Slider
                :model-value="volume"
                :max="1"
                :step="0.01"
                @update:model-value="setVolume"
                orientation="vertical"
                class="volume-slider h-24 w-4"
              />
            </HoverCardContent>
          </HoverCard>
        </div>
        <CircleX :size="18" class="cursor-pointer" @click="closePlayer" />
      </div>
    </div>

    <div class="duration absolute bottom-0 w-full">
      <!-- <div>{{ formatTime(currentTime) }}</div> -->
        <Slider
          :model-value="currentTime"
          :max="duration"
          @update:model-value="setCurrentTime"
          class="h-0.5 w-full"
        />
        <!-- <div>{{ formatTime(duration) }}</div> -->
    </div>
  </div>
</template>

<script setup>
import { Play,  Rewind, FastForward, Volume2, CircleX, Repeat, Repeat1, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { computed, ref } from 'vue';
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const isPlaying = computed(() => playerStore.isPlaying)
const currentTime = computed(() => [playerStore.currentTime])
const duration = computed(() => playerStore.duration)
const volume = computed(() => [playerStore.volume])
const repeatMode = computed(() => playerStore.repeatMode)
const currentTrack = computed(() => playerStore.currentTrack)

const playPause = () => playerStore.playPause()
const nextTrack = () => playerStore.nextTrack()
const prevTrack = () => playerStore.prevTrack()
const setVolume = volume => playerStore.setVolume(volume)
const setCurrentTime = (time) => playerStore.setCurrentTime(time)
const toggleRepeatMode = () => playerStore.toggleRepeatMode()
const closePlayer = () => playerStore.closePlayer()


// Форматирование времени в минуты и секунды
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// const isPlaying = computed(() => playerStore.isPlaying)

// const playPauseHandler = () => {
//   playerStore.isPlaying = !playerStore.isPlaying
// }

// const repeatHandler = () => {
//   repeat.value = !repeat.value
// }

// const closeHandler = () => {
//   playerStore.visible = false
// }

import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
// import { CalendarIcon } from 'lucide-vue-next'
</script>

<style lang="scss">
// .info {
//   &-author {}
//   &-title {}
// }

.volume-slider {
  .slider {
    &-thumb {
      background-color: hsl(var(--primary));
      transform: translate(calc(0% - 5px), 50%) !important;
      width: 14px;
      height: 14px;
      border: none;
    }

    &-track {
      span {
        background-color: hsl(var(--primary));
        width: 4px;
      }
    }
  }  
}

.duration {
  .slider {
    &-thumb {
      width: 4px;
      height: 4px;
      margin-bottom: 3px;
      cursor: pointer;
      background-color: hsl(var(--primary));
    }

    &-track {
      margin-bottom: 3px;
    }
  }
}
</style>