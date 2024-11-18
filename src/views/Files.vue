<template>
  <!-- DESKTOP -->
  <div class="space-between md:flex items-center hidden">    
    <div class="flex items-center justify-between w-full">
      <div class="space-y-1">
        <div class="gap-3 inline-flex items-center justify-center">
          <SidebarTrigger class="size-4 text-muted-foreground" />
          <Separator orientation="vertical" class="h-5" />
        </div>
      </div>
    </div>
  </div>

  <Separator class="mb-3 mt-1" />
  
  <div class="gap-6 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]" v-if="!loading">
    <component
      v-for="(file, idx) in files"
      :is="card(file)"
      :key="idx"
      :file="file"
    />      
  </div>
  <div class="relative w-full flex" v-else>
    <div class="inline-block ml-auto mr-auto mt-24 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
      <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from "@/components/ui/sidebar"

import { EllipsisVertical, Plus, Upload, FolderPlus } from 'lucide-vue-next';

import { useFilesStore } from '@/stores/files' 

// cards
import File from '../components/File.vue'
import AudioCard from '../components/cards/audio/index.vue'
import ImageCard from '../components/cards/image/index.vue'
import VideoCard from '../components/cards/video/index.vue'
import DocumentCard from '../components/cards/document/index.vue'


const viewBy = ref('tile')
const sortBy = ref('name')
const files = ref([])

const filesStore = useFilesStore()

const loading = computed(() => filesStore.getLoading)

const cards = {
  image: ImageCard,
  audio: AudioCard,
  video: VideoCard,
  document: DocumentCard,
}

const card = (file: object) => {
  return cards[file.type]
}

onMounted(async () => {
  const data = await filesStore.fetchFiles()
  await filesStore.fetchPublicURL()
  files.value = data
})
</script>