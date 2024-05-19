<template>
  <header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
    <div class="px-4 flex h-14 items-center">

    <Sheet v-if="isDesktop">
      <SheetTrigger as-child>
        <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden mr-4"
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col">
        <SheetTitle>
          <router-link to="/" class="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Meme Inc
          </router-link>        
        </SheetTitle>
        <ScrollArea>
          <nav class="grid gap-2 text-base font-medium">
            <div class="px-1">
              <h2 class="mb-2 px-1 text-base font-semibold tracking-tight">
                Discover
              </h2>
              <div>
                <SidebarNav :links="nav"/>
              </div>
            </div>
            <Collapsible v-model:open="isPlaylistsOpen">
              <CollapsibleTrigger class="py-2 flex items-center justify-between w-full">
                <h2 class="relative px-1 text-base font-semibold tracking-tight">Playlists</h2>
                <ChevronDown class="transition-transform text-muted-foreground origin-center text-sm" :size="20" :class="{'rotate-180': isPlaylistsOpen}" /></CollapsibleTrigger>
              <CollapsibleContent class="w-full">
                <ScrollArea class="h-[220px] px-1">
                <div class="space-y-1 pt-2">
                  <Button
                    v-for="(playlist, i) in playlists"
                    :key="`${playlist}-${i}`"
                    variant="ghost"
                    class="w-full justify-start font-normal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      class="mr-2 h-4 w-4"
                    >
                      <path d="M21 15V6" />
                      <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path d="M12 12H3" />
                      <path d="M16 6H3" />
                      <path d="M12 18H3" />
                    </svg>
                    <span class="text-sm">{{ playlist }}</span>
                  </Button>
                </div>
              </ScrollArea>           
              </CollapsibleContent>
            </Collapsible>
            <Collapsible v-model:open="isAlbumsOpen">
              <CollapsibleTrigger class="py-2 flex items-center justify-between w-full">
                <h2 class="relative px-1 text-base font-semibold tracking-tight">Albums</h2>
                <ChevronDown class="transition-transform text-muted-foreground origin-center text-sm" :size="20" :class="{'rotate-180': isAlbumsOpen}" /></CollapsibleTrigger>
              <CollapsibleContent class="w-full">
                <ScrollArea class="h-[200px] px-1">
                <div class="space-y-1 pt-2">
                  <Button
                    v-for="(album, i) in albums"
                    :key="`${album}-${i}`"
                    variant="ghost"
                    class="w-full justify-start font-normal"
                  >
                    <BookImage  class="mr-2 h-4 w-4" :size="24" />
                    <span class="text-sm">{{ album }}</span>
                  </Button>
                </div>
              </ScrollArea>           
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </ScrollArea>
        <div class="mt-auto -ml-4 -mr-4">
          <div class="rounded-lg border p-4">
            <div class="flex flex-col justify-between w-full">
              <span class="text-base text-muted-foreground">Storage size</span>
              <Progress v-model="progress" class="mt-3 mb-2"  />
              <div class="text-xs text-muted-foreground">Used 1.3gb from 4gb</div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>   

      <div class="mr-4 md:mr-24 hidden md:flex shrink-0">
        <router-link to="/" class="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Meme Inc
        </router-link>
      </div>


      <div class="border-solid border-l-[1px] border-r-[1px] border-border w-full h-full mx-10 px-8">
        <div class="w-full h-full justify-center flex items-center">


        <audio
          autoplay
          ref="audioPlayer"
          src="https://dmlhcuolooluzgphdomp.supabase.co/storage/v1/object/public/avatars/Ysa_Ferrer_-_Made_in_Japan_48275178.mp3"
        ></audio>

          <div class="mr-2 flex items-center">
            <div class="flex gap-4">
              <SkipBack :size="22" />
              <CirclePlay :size="22" class="cursor-pointer" @click="playHandler" v-if="!isPlaying" />
              <CirclePause :size="22" class="cursor-pointer" @click="playHandler" v-else />
              <SkipForward :size="22" />
            </div>
          </div>

          <div class="w-full px-8 flex flex-col items-center">

            <div class="-mb-2 mt-7">Made in Japan - Ysa Ferrer</div>

            <div class="flex w-full items-center mb-4">
              <span class="text-zinc-400 text-xs font-light mb-6">3:26</span>
              <Slider v-model="progress" :max="100" :step="1" :class="cn('progress-slider mx-4', $attrs.class ?? '')" />
              <span class="text-zinc-400 text-xs font-light mb-6">4:40</span>
            </div>
          </div>

          <div class="flex w-1/6 items-center">

            <VolumeX class="ml-4 mr-1" :size="20" v-if="progress[0] === 0" />
            <Volume class="ml-4 mr-1" :size="20" v-else-if="progress[0] < 20" />
            <Volume1 class="ml-4 mr-1" :size="20" v-else-if="progress[0] < 50" />
            <Volume2 class="ml-4 mr-1" :size="20" v-else />

            <Slider v-model="progress" :max="100" :step="1" :class="cn('w-3/4 volume-slider', $attrs.class ?? '')" />
          </div>
        </div>
      </div>



      <div class="flex items-center justify-between space-x-2 md:justify-end">
        <nav class="flex items-center">
          <Button
            v-for="link in links"
            :key="link.name"
            as="a"
            class="w-9 h-9 md:flex hidden"
            :href="link.href" target="_blank"
            :variant="'ghost'"
            :size="'icon'"
          >
            <component :is="link.icon" class="w-5 h-5" />
          </Button>

          <Button
            class="w-9 h-9"
            aria-label="Toggle dark mode"
            :variant="'ghost'"
            :size="'icon'"
            @click="toggleDark()"
          >
            <component
              :is="isDark ? Sun : Moon"
              class="w-5 h-5 text-foreground"
            />
          </Button>
        </nav>
      </div>
    </div>
  </header>  
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { ChevronDown, File, Menu, Moon, Files, Sun, Github, Images, Image, Music4, FileVideo, ListMusic, BookImage } from 'lucide-vue-next';
import SidebarNav from '@/components/SidebarNav.vue'
// import Player from '@/components/Player.vue'




import { Volume, Volume1, Volume2, VolumeX, SkipBack, SkipForward, CirclePause, Play, Heart, CirclePlay  } from 'lucide-vue-next';
  
import { useDark, useToggle } from '@vueuse/core'
import { onMounted, ref } from 'vue';
import { cn } from '@/lib/utils' 


const audioPlayer = ref<HTMLAudioElement>();
const isPlaying= ref(false)

const playHandler = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    audioPlayer.value?.play()
  } else {
    audioPlayer.value?.pause()
  }
}

// onMounted(() => {
//       console.log(audioPlayer.value);
//       //@ts-ignore
//       audioPlayer.value?.play()
//     });


const isDark = useDark({
  selector: 'html',
  valueDark: 'dark',
  valueLight: 'light',  
  storageKey: 'meme-inc-color-scheme'
})
const toggleDark = useToggle(isDark)

const isDesktop = ref(false)

const isPlaylistsOpen = ref(true)
const isAlbumsOpen = ref(true)
const progress = ref([53])

const links = [
  {
    name: 'GitHub',
    href: 'https://github.com/makcmakc/cloud-storage',
    icon: Github,
  },
]

const playlists = [
  'Ariana Grande',
  'Linkin Park',
  'Smashing Pumpkins',
  'Taylor Swift',
  'Bring Me The Horizon',
  'Eminem',
]

const albums = [
  'ROMANS',
  'Disappear'
  // into the starry sky
]

const nav = [
  {
    title: 'Files',
    icon: File,
    variant: 'ghost',
    route: 'files'
  },
  {
    title: 'Gallery',
    icon: Images,
    variant: 'ghost',
    route: 'gallery'
  },
  {
    title: 'Playlist',
    icon: ListMusic,
    variant: 'ghost',
    route: 'playlist'
  },
]
</script>

<style lang="scss">
.progress-slider {
  > span {
    height: 0.25rem;

    // > span {
    //   // background-color: rgb(16 185 129);
    // }
  }

  &:hover {
    > div {
      opacity: 1;
    }
  }

  > div {
    // background-color: rgb(16 185 129);
    // border: none;
    width: 0.75rem; /* 14px */
    height: 0.75rem; /* 14px */
    // border-width: 2px;
    // display: none;
    // opacity: 0;
    // transition: opacity .25s ease;
    border-width: 7px;
    cursor: pointer;
  }  
}

.volume-slider {
  > span {
    height: 0.25rem;
    // background-color: red;

    > span {
      // background: yellow;
    }
  }

  > div {
    width: 0.75rem; /* 14px */
    height: 0.75rem; /* 14px */
    border-width: 7px;
    cursor: pointer;
  }
}
</style>