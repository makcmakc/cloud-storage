<template>
  <div class="player">
    <!-- border-solid border-l-[1px] border-r-[1px] border-border -->
    <div class=" w-full h-full mx-10 px-8">
        <div class="w-full h-full justify-center flex items-center">

        <audio
          autoplay
          @timeupdate="handleTimeUpdate"
          @buffered="handleBuffer"
          @loadedmetadata="handleLoadMetaData"
          :loop="innerLoop"
          ref="audioPlayer"
          src="https://dmlhcuolooluzgphdomp.supabase.co/storage/v1/object/public/avatars/Ysa_Ferrer_-_Made_in_Japan_48275178.mp3"
        ></audio>

          <div class="player__controls">
            <div class="mr-2 flex items-center">
              <div class="flex gap-4">
                <SkipBack :size="22" />
                <CirclePlay :size="22" class="cursor-pointer" @click="playHandler" v-if="!isPlaying" />
                <CirclePause :size="22" class="cursor-pointer" @click="playHandler" v-else />
                <SkipForward :size="22" />
              </div>
            </div>
          </div>

          <div class="w-full px-8 flex flex-col items-center">

            <div class="-mb-2 mt-7">Made in Japan - Ysa Ferrer</div>

            <div class="flex w-full items-center mb-4">
              <span class="mb-6">
                <span class="text-zinc-400 text-xs font-light" v-if="currentTime">{{ currentTime }}</span>
                <span class="text-zinc-400 text-xs font-light" v-else>-:-</span>
              </span>
              <Slider v-model="progress" @valueCommit="seekHandler" :max="100" :step="1" class="progress-slider mx-4" />
              <span class="mb-6">
                <span class="text-zinc-400 text-xs font-light" v-if="duration">{{ duration }}</span>
                <span class="text-zinc-400 text-xs font-light" v-else>-:-</span>
              </span>
            </div>
          </div>

          <div class="flex w-1/6 items-center">

            <VolumeX class="ml-4 mr-1" :size="20" v-if="progress[0] === 0" />
            <Volume class="ml-4 mr-1" :size="20" v-else-if="progress[0] < 20" />
            <Volume1 class="ml-4 mr-1" :size="20" v-else-if="progress[0] < 50" />
            <Volume2 class="ml-4 mr-1" :size="20" v-else />

            <Slider v-model="progress" :max="100" :step="1" class="w-3/4 volume-slider" />
          </div>
        </div>
      </div>

  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { cn } from '@/lib/utils' 
import { Slider } from '@/components/ui/slider'
import { Volume, Volume1, Volume2, VolumeX, SkipBack, SkipForward, CirclePause, Play, Heart, CirclePlay  } from 'lucide-vue-next';

const audioPlayer = ref<HTMLAudioElement>();
const isPlaying= ref(false)
const progress = ref([0])
const innerLoop = ref(false)

const currentTime = ref(null)
const duration = ref(null)

const playHandler = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    audioPlayer.value?.play()
  } else {
    audioPlayer.value?.pause()
  }
}

// const muteHandler = () => {
//   if (muted.value) {
//     volume.value = previousVolume.value
//     return volume.value
//   }
//   previousVolume = volume.value
//   volume.value = 0
// }

const seekHandler = (e: Event) => {
  // if (!loaded ) return
  // const el = e.target.getBoundingClientRect()
  // const seekPos = ( e.clientX - el.left ) / el.width
  // audioPlayer.value?.currentTime = audioPlayer.value?.duration * seekPos
  // audioPlayer.value.currentTime = e[0]
  // console.log(e[0], 'E [0=]')
  // console.log(e[0], (audioPlayer.value?.duration / e[0]) * 100, 'EEEE')
  // audioPlayer.value.currentTime = (e[0] / audioPlayer.value?.duration) * 100
}

onMounted(() => {
  audioPlayer.value?.pause()
})

const convertTimeToHHMMSS = (val: number) => {
  // const hhmmss = new Date(val * 1000).toISOString().substring(14, 19)
  // // return hhmmss.indexOf( '00:' ) === 0 ? hhmmss.substring( 3 ) : hhmmss
  // return hhmmss
  const minutes = Math.floor(val / 60000);
  const seconds = ((val % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const isPlaylistsOpen = ref(true)
const isAlbumsOpen = ref(true)


const handleBuffer = () => {

}

const handleTimeUpdate = (e: Event) => {
  const curTime = audioPlayer.value?.currentTime
  const dur = audioPlayer.value?.duration

  // console.log(convertTimeToHHMMSS(audioPlayer.value?.currentTime))
  // currentTime.value = convertTimeToHHMMSS(e.timeStamp)
  // duration.value = convertTimeToHHMMSS(audioPlayer.value?.duration)
  // progress.value = [(curTime / dur) * 100]

  console.log(e)

  // console.log('dur', audioPlayer.value, dur)

  // console.log(audioPlayer.value?.currentTime, audioPlayer.value?.duration)
  // console.log(audioPlayer.value?.currentTime)
  // this.currentSeconds = this.audio.currentTime
//     this.buffered = this.audio.buffered.end( 0 )
}

const handleLoadMetaData = (e) => {
  const duration = e.target.duration
  console.log(e, 'handleLoadMetaData')
}
</script>