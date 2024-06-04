<script setup lang="ts">
import type { Album } from './albums'
import { playlists } from './playlists'
import { cn } from '@/lib/utils'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'

import { Skeleton } from '@/components/ui/skeleton'

import { CirclePause, CirclePlay, Play, Heart, ListMusic } from 'lucide-vue-next'

import { usePlayerStore } from '@/stores/player'
import { computed, ref, toRef, watch } from 'vue'

const playerStore = usePlayerStore()

interface AlbumArtworkProps {
  album: Album
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}
const props = withDefaults(defineProps<AlbumArtworkProps>(), {
  aspectRatio: 'portrait'
})

toRef(props, 'album')

// console.log(props.album)

const isPlaying = computed({
  get() {
    return playerStore.getAudioState
  },
  set(v) {
    return playerStore.setAudioState(v)
  }
})

const playback = ref(0)

const current = ref()

const currentTrack = computed(() => {
  return playerStore.getCurrentTrack
})

const toggleIcon = computed(() => {
  return (!isPlaying.value || currentTrack.value !== current.value?.url) ? CirclePlay : CirclePause
  // return isPlaying.value ? 'pause-circle.svg' : 'play-circle.svg'
})

const currentTime = computed(() => {
  return playerStore.getCurrentSeconds
})

const duration = computed(() => {
  return playerStore.getDurationSeconds
})

// watch(currentTime, (v) => {
//   playback.value = Math.round([(currentTime.value / duration.value) * 100])
// })

watch(current, (v) => {
  // console.log(v)
  // playerStore.setCurrentTrack(v)
})

const playHandler = (track: object) => {
  isPlaying.value = !isPlaying.value


  if (current.value !== currentTrack.value) {
    current.value = track
  } 

  playerStore.setCurrentTrack(track)


  if (!playerStore.getAudio) {
    playerStore.initAudio()
  }

  if (isPlaying.value) playerStore.playTrack()
  else playerStore.pauseTrack()
}

// const circumference = ref(2 * 22 / 7 * 120)
const circumference = 2 * 16 * Math.PI;
</script>

<template>
  <div :class="cn('space-y-3 relative w-full xs:w-[150px]')">
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="overflow-hidden card rounded-md relative">
          <img
            v-if="album.cover"
            :src="album.cover"
            :alt="album.name"
            :width="width"
            :height="height"
            :class="
              cn(
                'card-image h-auto w-auto object-cover',
                aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
              )
            "
          />
          <div
            v-else
            style="
              background-color: rgba(18, 23, 10, 0.8);
              box-shadow:
                0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05);
              display: flex;
              align-items: center;
              justify-content: center;
            "
            class="overflow-hidden rounded-xl border bg-card text-card-foreground shadow p-4 card rounded-md relative"
            >
            <svg
              height="100%"
              fill="#FAFAFA"
              width="100%"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512  512"
              xml:space="preserve"
              style="padding: 15px"
            >
              <g>
                <g>
                  <path
                    d="M503.319,5.939c-5.506-4.705-12.783-6.767-19.958-5.635L169.555,49.852c-12.04,1.901-20.909,12.28-20.909,24.47v99.097
                  v156.903H99.097C44.455,330.323,0,371.073,0,421.161C0,471.25,44.455,512,99.097,512c54.642,0,99.097-40.75,99.097-90.839v-66.065
                  V194.588l264.258-41.725v136.169h-49.548c-54.642,0-99.097,40.75-99.097,90.839s44.455,90.839,99.097,90.839
                  S512,429.959,512,379.871v-66.065V123.871V24.774C512,17.529,508.827,10.646,503.319,5.939z"
                  />
                </g>
              </g>
            </svg>
          </div>

          <div
            class="card-action is-playing p-10"
            :class="{ 'is-playing': isPlaying && album.url == currentTrack }"
          >
            <!-- {{  playback  }}
            {{  duration  }} -->
            <!-- {{  circumference  }} -->
            <!-- w-20 h-20 -->
            <!-- <div class="relative block">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                stroke-width="3"
                class="z-0 relative overflow-hidden text-warning w-12 h-12"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  role="presentation"
                  stroke-dasharray="81.68140899333463 81.68140899333463"
                  stroke-dashoffset="0"
                  transform="rotate(-90 16 16)"
                  stroke-linecap="round"
                  class="h-full stroke-default-300/50"
                ></circle>
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  role="presentation"
                  stroke-dasharray="81.68140899333463 81.68140899333463"
                  :stroke-dashoffset="210 / Math.PI"
                  transform="rotate(-90 16 16)"
                  stroke-linecap="round"
                  class="h-full stroke-current transition-all !duration-500"
                ></circle>
                </svg>
                <span class="absolute font-normal inset-0 flex items-center justify-center text-[0.6rem]">60%</span>
            </div> -->

            <!-- <div v-if="!currentTrack.url"> -->
            <!-- v-if="isPlaying && currentTrack === album.url" -->

            <!-- <img src="@/assets/icons/play-circle.svg" class="cursor-pointer" @click="playHandler(album)" alt="" v-if="!isPlaying && !currentTrack">
            <img src="@/assets/icons/pause-circle.svg" class="cursor-pointer" @click="playHandler(album)" alt="" v-else-if="isPlaying && album.url == currentTrack"> -->

            <!-- <img src="@/assets/icons/play-circle.svg" class="cursor-pointer" @click="playHandler(album)" alt="" v-else> -->
            <component color="#fff" :is="toggleIcon" @click="playHandler(album)" :size="42" class="cursor-pointer" />

            <!-- <CirclePlay class="cursor-pointer" @click="playHandler(album)" color="#fff" :size="42" /> -->
          </div>
        </div>
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
    <div class="space-y-1 text-sm">
      <h3 class="font-medium leading-none">
        <!-- {{  currentTrack }}  -->
        {{ album.name }}
      </h3>
      <p class="text-xs text-muted-foreground">
        <!-- {{  album.url  }} -->
        {{ album.artist }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.progress-ring__circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.card:hover .card-action {
  opacity: 1;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.card-image {
  position: relative;
}

.card-action {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 100%;
  opacity: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &.is-playing {
    opacity: 1;
  }
}
</style>
