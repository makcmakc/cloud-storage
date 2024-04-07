<script setup>
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Progress } from '@/components/ui/progress'
import { ref, watchEffect } from 'vue'

import { ChevronDown, File, Files, Images, Image, Music4, FileVideo, ListMusic } from 'lucide-vue-next';


import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'


import SidebarNav from './SidebarNav.vue'

const isOpen = ref(false)
const progress = ref(13)

const playlists = [
  'Ariana Grande',
  'Linkin Park',
  'Smashing Pumpkins',
  'Taylor Swift',
  'Bring Me The Horizon',
  'Eminem',
]

const links = [
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

<template>

  <div :class="cn('pb-12', $attrs.class ?? '')" class="md:flex hidden">
    <div class="space-y-4 py-4">
      <div class="px-3 py-2">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
          Discover
        </h2>
        <div>
          <SidebarNav :is-collapsed="isCollapsed" :links="links"/>
        </div>
      </div>
      <!-- <div class="px-3 py-2">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
          Library
        </h2>
        <div class="space-y-1">
          <Button variant="ghost" class="w-full justify-start">
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
            Playlists
          </Button>
          <Button variant="ghost" class="w-full justify-start">
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
              <circle cx="8" cy="18" r="4" />
              <path d="M12 18V2l7 4" />
            </svg>
            Songs
          </Button>
          <Button variant="ghost" class="w-full justify-start">
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Made for You
          </Button>
          <Button variant="ghost" class="w-full justify-start">
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
              <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
              <circle cx="17" cy="7" r="5" />
            </svg>
            Artists
          </Button>
          <Button variant="ghost" class="w-full justify-start">
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
              <path d="m16 6 4 14" />
              <path d="M12 6v14" />
              <path d="M8 8v12" />
              <path d="M4 4v16" />
            </svg>
            Albums
          </Button>
        </div>
      </div> -->

      <div class="">
        <h2 class="relative px-7 text-lg font-semibold tracking-tight">
          Playlists
        </h2>
        <ScrollArea class="h-[200px] px-1">
          <div class="space-y-1 p-2">
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
              {{ playlist }}
            </Button>
          </div>
        </ScrollArea>
      </div>

      <div class="mt-auto p-4">
        <Collapsible v-model:open="isOpen" class="flex flex-col items-start gap-2 rounded-lg border p-3">
          <CollapsibleTrigger class="flex items-center justify-between w-full">
            <span>Storage size</span>
            <ChevronDown class="transition-transform origin-center text-sm" :size="20" :class="{'rotate-180': isOpen}" /></CollapsibleTrigger>
          <!-- <CollapsibleContent class="w-full">
            <div class="flex text-sm justify-between w-full mb-2">
              <div class="flex items-center">
                <Image size="15" class="mr-1" />
                <span class="text-sm font-semibold">Images</span>
              </div>
              <span class="opacity-65 text-xs	leading-relaxed">12 Mb</span>
            </div>
            <div class="flex text-sm justify-between w-full mb-2">
              <div class="flex items-center">
                <Files size="15" class="mr-1" />
                <span class="text-sm font-semibold">Documents</span>
              </div>
              <span class="opacity-65 text-xs	leading-relaxed">12 Mb</span>
            </div> 
            <div class="flex text-sm justify-between w-full mb-2">
              <div class="flex items-center">
                <Music4 size="15" class="mr-1" />
                <span class="text-sm font-semibold">Audios</span>
              </div>
              <span class="opacity-65 text-xs	leading-relaxed">12 Mb</span>
            </div>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <FileVideo size="15" class="mr-1" />
                <span class="text-sm font-semibold">Videos</span>
              </div>
              <span class="opacity-65 text-xs	leading-relaxed">12 Mb</span>
            </div>                                   
          </CollapsibleContent> -->
          <Progress v-model="progress" class="mt-3 mb-2"  />
          <div>
            Used 1.3gb from 4gb
          </div>
        </Collapsible>
      </div>

    </div>
  </div>
</template>


