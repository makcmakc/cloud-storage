<template>
  <header class="">
    <div class="navigation space-between md:flex items-center flex h-11 bg-muted border-b px-2" :class="{'border-zinc-700': playerStore.visible}">    
      <div class="flex items-center justify-between w-full">
        <div class="gap-3 inline-flex items-center justify-center">
          <SidebarTrigger class="size-4 text-muted-foreground" />
          <Separator orientation="vertical" class="h-5 bg-zinc-700" />
          <Breadcrumb>
            <BreadcrumbList class="text-xs sm:gap-1.5">
              <BreadcrumbItem class="text-xs">
                <BreadcrumbLink :href="`/${String(currentPath)}`">{{ capitalizeString(currentPath) }}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="[&>svg]:size-3"><SlashIcon /></BreadcrumbSeparator>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div class="flex shrink-0 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="px-2 text-xs flex items-center gap-1">
              <ArrowDownUp :size="14" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuRadioGroup v-model="sortBy">
              <DropdownMenuRadioItem value="name">
                Name
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="size">
                Size
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="date">
                Date
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="px-2 text-xs flex items-center gap-1">
              <Grid2x2 :size="14" />
              View by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup v-model="viewBy">
              <DropdownMenuRadioItem value="tile">
                Tile
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="list">
                List
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <Transition name="slide-down">
      <AudioPlayer v-if="playerStore.visible" />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRoute } from 'vue-router'

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import AudioPlayer from "@/components/files/viewers/AudioPlayer.vue"

import { SlashIcon } from '@radix-icons/vue'
import { ArrowDownUp, Grid2x2 } from 'lucide-vue-next'

import { usePlayerStore } from '@/stores/player'

import { capitalizeString } from "@/utils/capitalizeString"

const playerStore = usePlayerStore()
const router = useRoute();

const viewBy = ref('tile')
const sortBy = ref('name')

const currentPath = computed(() => router.name)
</script>
