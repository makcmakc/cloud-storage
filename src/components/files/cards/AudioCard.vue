<template>
  <BaseCard :file="props.file" :onDelete="props.onDelete">
    <template #icon>
      <div class="overflow-hidden card rounded-md relative">
        <div v-if="hasMetadata">
          <img :src="file.audioMetadata?.coverUrl" :alt="file.name" class="card-image h-auto w-auto object-contain aspect-square" />
        </div>
        <div
          v-else
          style="box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);"
          class="overflow-hidden flex items-center bg-zinc-800 justify-center rounded-xl border bg-card text-card-foreground shadow p-4 card rounded-md relative"
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
        <div class="card-action p-10" :class="{'is-playing': isPlaying && currentTrackId === file.id}">
          <div class="track" :class="{'playing': isPlaying  && currentTrackId === file.id}">
            <div class="cover">
              <button class="play" @click="playHandler"></button>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
                <path ref="playbackCircle" class="playback-circle" :stroke-dashoffset="currentTrackProgress" :stroke-dasharray="totalLength" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #description>
      <h3 class="font-medium leading-5 text-center">
        {{ truncateString(file.name) }}
      </h3>
    </template>

    <template #info>
      <div class="space-y-2">
        <img 
          v-if="props.file.audioMetadata?.coverUrl" 
          :src="props.file.audioMetadata.coverUrl" 
          class="w-20 h-20 object-cover rounded-md object-contain aspect-square" 
        />
        <div v-if="props.file.audioMetadata" class="text-sm space-y-1">
          <p v-if="props.file.audioMetadata.title">
            <strong>Name:</strong> {{ props.file.audioMetadata.title }}
          </p>
          <p v-if="props.file.audioMetadata.artist">
            <strong>Artist:</strong> {{ props.file.audioMetadata.artist }}
          </p>
          <p v-if="props.file.audioMetadata.album">
            <strong>Album:</strong> {{ props.file.audioMetadata.album }}
          </p>
          <p v-if="props.file.audioMetadata.duration">
            <strong>Duration:</strong> {{ formatDuration(props.file.audioMetadata.duration) }}
          </p>
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import type { FileInfo } from '@/types/file'
import BaseCard from './BaseCard.vue'
import { truncateString } from '@/utils/truncateString'
import { usePlayerStore } from '@/stores/player'
import { formatDuration } from '@/utils/formatFileSize';
import { computed, ref } from 'vue';

const props = defineProps<{
  file: FileInfo
  onDelete: (id: string) => void
  onEdit?: (id: string) => void
  onShare?: (id: string) => void
}>()

const playerStore = usePlayerStore()

const playbackCircle = ref()

const playHandler = () => playerStore.openPlayerById(props.file.id)
const playPause = () => playerStore.playPause()

const hasMetadata = computed(() => props.file?.audioMetadata?.coverUrl ?? null)
const currentTime = computed(() => [playerStore.currentTime])
const duration = computed(() => playerStore.duration)
const isPlaying = computed(() => playerStore.isPlaying)
const currentTrackId = computed(() => playerStore.currentTrack.id)
const totalLength = computed(() => playbackCircle.value?.getTotalLength() ?? 0)

const currentTrackProgress = computed(() => {
  const playbackCircleLength = playbackCircle.value?.getTotalLength() ?? 0
  return playbackCircleLength - ( currentTime.value[0] / duration.value * playbackCircleLength)
})
</script>


<style lang="scss">
.card:hover .card-action {
  opacity: 1;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.card-action {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 100%;
  opacity: 0;
  z-index: 9;
  background: rgba(24, 24, 27, 0.8);
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
