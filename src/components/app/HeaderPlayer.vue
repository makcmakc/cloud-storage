<template>
  <div class="bg-muted h-11">
    <div class="flex items-center px-2" style="height: 45px;">
      <div class="controls flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"><path fill="currentColor" d="M8.445 14.832A1 1 0 0 0 10 14v-2.798l5.445 3.63A1 1 0 0 0 17 14V6a1 1 0 0 0-1.555-.832L10 8.798V6a1 1 0 0 0-1.555-.832l-6 4a1 1 0 0 0 0 1.664z"/></svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 22 22"><path fill="currentColor" d="m6.192 3.67l13.568 7.633a.8.8 0 0 1 0 1.394L6.192 20.33A.8.8 0 0 1 5 19.632V4.368a.8.8 0 0 1 1.192-.697"/></svg>

        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.8 3h4.4a.8.8 0 0 1 .8.8v16.4a.8.8 0 0 1-.8.8H4.8a.8.8 0 0 1-.8-.8V3.8a.8.8 0 0 1 .8-.8m10 0h4.4a.8.8 0 0 1 .8.8v16.4a.8.8 0 0 1-.8.8h-4.4a.8.8 0 0 1-.8-.8V3.8a.8.8 0 0 1 .8-.8"/></svg> -->

        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"><path fill="currentColor" d="M4.555 5.168A1 1 0 0 0 3 6v8a1 1 0 0 0 1.555.832L10 11.202V14a1 1 0 0 0 1.555.832l6-4a1 1 0 0 0 0-1.664l-6-4A1 1 0 0 0 10 6v2.798z"/></svg>
      </div>

      <div class="info grow ml-6 pr-6">
        <span class="info-title text-xs">Made in Japan</span>
        <!-- <div class="info-author text-xs text-zinc-400	">Ysa Ferrer</div> -->
      </div>

      <div class="actions flex items-center gap-3">
        <div @click="repeatHandler" class="cursor-pointer">
          <Repeat :size="16" :color="repeat ? '' : '#a1a1aa'" />
        </div>

        <Popover>
          <PopoverTrigger>
            <Volume2 :size="18" />
          </PopoverTrigger>
          <PopoverContent class="w-4 p-4 flex items-center justify-center">
            <Slider v-model="volume" orientation="vertical" class="h-24 w-4" />
          </PopoverContent>
        </Popover>
        <CircleX :size="18" class="cursor-pointer" @click="closeHandler" />
      </div>
    </div>

    <div class="duration relative">
      <!-- <span class="h-0.5 w-full bg-gray-100	flex absolute bottom-0"></span> -->
    </div>
  </div>
</template>

<script setup>
import { Play,  Rewind, FastForward, Volume2, CircleX, Repeat, Repeat1, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { computed, ref } from 'vue';
import { usePlayerStore } from '@/stores/player'

const volume = ref([50])
const repeat = ref(false)


const playerStore = usePlayerStore()

const repeatHandler = () => {
  repeat.value = !repeat.value
}

const closeHandler = () => {
  playerStore.visible = false
}
</script>

<style lang="scss">
// .info {
//   &-author {}
//   &-title {}
// }

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
</style>