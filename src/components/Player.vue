<template>
  <div class="w-full h-full justify-center flex items-center">

    <div class="w-1/4 flex items-center">
      <div class="w-1/4">
        <SkipBack size="18" />
        <!-- <Heart class="ml-4" size="18" /> -->
      </div>
    </div>

    <div class="w-1/2 h-full flex flex-col items-center">
      <div class="flex w-full items-center mt-2">
        <span class="text-zinc-300 text-xs font-light">3:26</span>
        <div class="flex-1 h-1 w-full bg-zinc-300 rounded mx-4">
          <div class="bg-emerald-500 h-full rounded" style="width: 25%;"></div>
        </div>
        <span class="text-zinc-300 text-xs font-light">4:40</span>
      </div>
    </div>

    <div class="w-1/4 flex items-center justify-end">
      <!-- <div class="w-1/4"> -->
      <Volume class="ml-4" size="18" />
      <!-- <Progress v-model="progress" class="w-1/3" /> -->
      <div class=" h-1 w-[100px] bg-zinc-300 rounded mx-4">
        <div class="bg-emerald-500 h-full rounded" style="width: 25%;"></div>
      </div>

      <!-- </div> -->
    </div>

  </div>
</template>

<script>
import { Volume, Volume1, Volume2, VolumeX, SkipBack, Play, Heart, CirclePlay  } from 'lucide-vue-next';
// import { cn } from '@/lib/utils'
</script>