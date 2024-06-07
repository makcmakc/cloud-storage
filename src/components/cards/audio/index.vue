<script setup lang="ts">
import type { Album } from '../albums'
import { playlists } from '../playlists'
import { cn } from '@/lib/utils'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from '@/components/ui/context-menu'
import { Skeleton } from '@/components/ui/skeleton'

import { Heart, ListMusic } from 'lucide-vue-next'

import { usePlayerStore } from '@/stores/player'
import { computed, ref, toRef } from 'vue'


interface AlbumArtworkProps {
  album: Album
  aspectRatio?: 'portrait' | 'square'
  width?: number
  height?: number
}

const playerStore = usePlayerStore()

const props = withDefaults(defineProps<AlbumArtworkProps>(), {
  aspectRatio: 'portrait'
})

toRef(props, 'album')

const isPlaying = computed({
  get() {
    return playerStore.getAudioState
  },
  set(v) {
    return playerStore.setAudioState(v)
  }
})

const playbackCircle = ref()
const current = ref()

const currentTrack = computed(() => playerStore.getCurrentTrack)
const currentTrackTime = computed(() => playerStore.getCurrentSeconds)
const currentTrackDuration = computed(() => playerStore.getDurationSeconds)

const totalLength = computed(() => {
  const playbackCircleLength = playbackCircle.value?.getTotalLength() ?? 0
  return playbackCircleLength
})

const currentTrackProgress = computed(() => {
  const playbackCircleLength = playbackCircle.value?.getTotalLength() ?? 0
  return playbackCircleLength - ( currentTrackTime.value / currentTrackDuration.value * playbackCircleLength )
})

const playHandler = (track: object) => {
  isPlaying.value = !isPlaying.value

  if (!playerStore.getAudio) playerStore.initAudio()
  if (current.value !== currentTrack.value) current.value = track

  playerStore.setCurrentTrack(track)

  if (isPlaying.value) playerStore.playTrack()
  else playerStore.pauseTrack()
}
</script>


<style lang="scss">
.cover {
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    stroke: #fff;
    width: 90px;
    height: 90px;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
  }
}

.play {
  position: absolute;
	top: 50%;
	left: 50%;
	z-index: 3;
	width: 90px;
	background: transparent !important;
	height: 90px;
	cursor: pointer;
	transform: translate(-50%, -50%);

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 100%;
    opacity: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZdJREFUeNrs29FNQjEYBlAgDuAIuAFugBvgBrABTiBOgE4AGzgCbCAbwAayAbZJb0KMT77wt/ecpO/39qP9CqGDAQAAAAAAAAAAAAAA8A+Xy2WWxr2ZiBPILo1jGlOzESeQzmcaY7MSJ5DsO42lmYkTSOcrjYkZihNIZ630YwVyKaU/M1txAunsWir9UQPvkI/GuVtWPsoxVsjv0p9aIXHkE9iu5tIfNbrI8neWXPpzgcSRV8imttJvOZDr0j/WUvp9CKTzWsMPln0KJBuX0t9ELf2+BdKZl21sKZBYpb8upT8RSMBv+hG2MYFclX4JZioQBPKHtzQeh8Ph/pYPcSeHQQ7gJQVxsEJu61yCeIoSRp9XyLaEcY72YH0L5JTG4tY9YcsqpZ2CeIgcRl9WyL6sipNj7+1Le1FK+1TLQ7cayHsaeXva1vbgrW1Zh3J62tf6Aq0EkrenjxTEqvYXaSGQqkq75Q7JATzXVtpV8mfregJxHSFIIC7sBArElbYggbj0GSgQ16IBAAAAAAAAAAAAACCsHwEGACfr+SLf7BaJAAAAAElFTkSuQmCC');
    background-size: 80%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
}

.playback-circle {
	visibility: hidden;
	stroke-width: 5;
}

.playing {

  .playback-circle {
    visibility: visible;
  }

  .play::after {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK9JREFUeNrs0sEJhDAQQFEjW4ilWYp2slYS7MROYgrQZQc8DPgeiBcZQ/4MAwAAAAAAAAAAAAAAZFcyHaa1NvfX9PfhS1lu5iyB3x59ztcqXF9kbQE/5kTUTHcwWoNcBBEEQQRBEEEQRBAEEQRBEEQQBBEEQQRBEEEQBEEEQRBBEEQQBBEEQRBEEAQRBEEEQZB3+iQ7z9af/YE5a+DbwxoAAAAAAAAAAAAAAEDEKcAA4xprM8PkP94AAAAASUVORK5CYII=');
  }

  .play::before {
    opacity: 1;
  }
}
</style>

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


          <div class="card-action p-10" :class="{ 'is-playing': isPlaying && album.url == currentTrack }">
            <div class="track" :class="{'playing': isPlaying && album.url == currentTrack}">
              <div class="cover">
                <button class="play" @click="playHandler(album)"></button>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
                  <path ref="playbackCircle" class="playback-circle" :stroke-dashoffset="currentTrackProgress" :stroke-dasharray="totalLength" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z" />
                </svg>
              </div>
            </div>
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
