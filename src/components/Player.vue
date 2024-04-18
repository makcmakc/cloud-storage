<template>

  <!-- Player & Controls -->
  <div class="py-4 px-4 bg-accent	mt-auto fixed w-full z-40 bottom-0 flex items-center">

    <div class="w-1/4 flex items-center">
      <!-- <div class="w-1/4"> -->
      <img src="https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80" :alt="'album.name'"
        :width="56" :height="56" :class="cn('h-auto w-[60px] object-cover transition-all aspect-square')" />
      <div class="ml-4">
        <p class="text-white mb-2 flex flex-col font-light text-sm">
          <span>Come As You Are - Live</span>
        </p>
        <p class="text-grey-light text-xs font-light">Crowder</p>
      </div>

      <Heart class="ml-4" size="18" />
      <!-- </div> -->
    </div>

    <div class="w-1/2 h-full flex flex-col items-center">
      <div class="w-1/3 flex justify-around items-center text-zinc-600">
        <!-- <svg class="w-4 h-4 fill-current block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"></path>
    </svg> -->
        <!-- @todo - find some better icons :) -->
        <svg class="w-5 h-5 fill-current hover:text-grey-lightest block" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.58578644,12.8284271 L4.41028736,15.0039262 C3.83091964,15.5832939 2.81955537,16 2.00104344,16 L0,16 L0,14 L2.00104344,14 C2.29046199,14 2.79273472,13.7930517 2.9960738,13.5897126 L5.17157288,11.4142136 L6.58578644,12.8284271 L6.58578644,12.8284271 Z M16,6 L13.9998075,6 C13.7100858,6 13.2055579,6.20865568 13.0039262,6.41028736 L10.8284271,8.58578644 L10.8284271,8.58578644 L9.41421356,7.17157288 L11.5897126,4.9960738 C12.1666986,4.41908781 13.1800499,4 13.9998075,4 L16,4 L16,1 L20,5 L16,9 L16,6 Z M16,16 L13.9998075,16 C13.1800499,16 12.1666986,15.5809122 11.5897126,15.0039262 L2.9960738,6.41028736 C2.79273472,6.20694828 2.29046199,6 2.00104344,6 L0,6 L0,4 L2.00104344,4 C2.81955537,4 3.83091964,4.41670608 4.41028736,4.9960738 L13.0039262,13.5897126 C13.2055579,13.7913443 13.7100858,14 13.9998075,14 L16,14 L16,11 L20,15 L16,19 L16,16 Z">
          </path>
        </svg>
        <svg class="w-5 h-5 fill-current hover:text-grey-lightest block" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M4,5 L7,5 L7,15 L4,15 L4,5 Z M16,5 L7,10 L16,15 L16,5 Z"></path>
        </svg>
        <CirclePlay size="30" />
        <svg class="w-5 h-5 fill-current hover:text-grey-lightest block" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M13,5 L16,5 L16,15 L13,15 L13,5 Z M4,5 L13,10 L4,15 L4,5 Z"></path>
        </svg>
        <svg class="w-5 h-5 fill-current hover:text-grey-lightest block" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.99201702,4 C3.8918564,4 3,4.88670635 3,5.99810135 L3,12 L0,12 L4,16 L8,12 L5,12 L5,6 L12,6 L14,4 L4.99201702,4 Z M15,8 L12,8 L16,4 L20,8 L17,8 L17,14.0018986 C17,15.1054196 16.0998238,16 15.007983,16 L6,16 L8,14 L15,14 L15,8 Z">
          </path>
        </svg>
      </div>
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

<script scope>
import { Volume, Volume1, Volume2, VolumeX, Play, Heart, CirclePlay  } from 'lucide-vue-next';
</script>