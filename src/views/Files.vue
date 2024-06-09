<template>
  <!-- DESKTOP -->
  <div class="space-between md:flex items-center hidden">    
    <div class="flex items-center justify-between w-full">
      <div class="space-y-1">
        <div class="gap-1 inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="h-7 px-2">
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
              <Button variant="outline" class="h-7 px-2">
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
      <Button>
        <Upload class="mr-2 h-4 w-4" />
        Upload file
      </Button>
    </div>
  </div>

    <!-- MOBILE -->
  <div class="md:hidden ml-auto mt-0">
    <div class="flex gap-2 justify-between">
    <h1 class="text-xl font-semibold	">Files</h1>
    <div class="flex gap-4 justify-end">
      <Drawer>
        <DrawerTrigger>
          <Plus />
        </DrawerTrigger>
        <DrawerContent>
          <div class="p-6 pb-8 text-lg">
            <div class="flex items-center mb-4">
              <FolderPlus :size="30" />
              <span class="ml-4">Create folder</span>
            </div>
            <div class="flex items-center">
              <Upload :size="30" />
              <span class="ml-4">Upload file</span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>      
      <Drawer>
        <DrawerTrigger>
          <EllipsisVertical />
        </DrawerTrigger>
        <DrawerContent>
          <FormField v-slot="{ componentField }" type="radio" name="type">
            <FormItem class="p-6">
              <FormLabel class="text-xl">View</FormLabel>
              <RadioGroup default-value="comfortable">
                <div class="flex items-center space-x-3 mt-2">
                  <RadioGroupItem id="list" value="list" />
                  <Label for="list" class="text-base">List</Label>
                </div>
                <div class="flex items-center space-x-3">
                  <RadioGroupItem id="tile" value="tile" />
                  <Label for="tile" class="text-base">Tile</Label>
                </div>
              </RadioGroup>
            </FormItem>
          </FormField>

          <Separator />

          <FormField v-slot="{ componentField }" type="radio" name="type">
            <FormItem class="p-6">
              <FormLabel class="text-xl">Sort by</FormLabel>
              <RadioGroup default-value="comfortable">
                <div class="flex items-center space-x-3 mt-2 w-full">
                  <RadioGroupItem id="name" value="name" />
                  <Label for="name" class="text-base">Name</Label>
                </div>
                <div class="flex items-center space-x-3">
                  <RadioGroupItem id="size" value="size" />
                  <Label for="size" class="text-sm">Size</Label>
                </div>
                <div class="flex items-center space-x-3">
                  <RadioGroupItem id="type" value="type" />
                  <Label for="type" class="text-base">Type</Label>
                </div>
                <div class="flex items-center space-x-3">
                  <RadioGroupItem id="date" value="date" />
                  <Label for="date" class="text-base">Date</Label>
                </div>
              </RadioGroup>
            </FormItem>
          </FormField>
        </DrawerContent>
      </Drawer>
    </div>
    </div>
  </div>

  <Separator class="my-4" />

  <div class="gap-6 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]" v-if="!loading">
    <component
      v-for="(file, idx) in files"
      :is="card(file)"
      :key="idx"
      :file="file"
      @load="loadHandler"
      v-show="!fileLoaded"
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
import { Skeleton } from '@/components/ui/skeleton'

import { EllipsisVertical, Plus, Upload, FolderPlus } from 'lucide-vue-next';


import { useFilesStore } from '@/stores/files' 

// cards
import File from '../components/File.vue'
import AudioCard from '../components/cards/audio/index.vue'
import ImageCard from '../components/cards/image/index.vue'
import VideoCard from '../components/cards/video/index.vue'
import DocumentCard from '../components/cards/document/index.vue'

import { isVideo, isImage, isDocument, isAudio } from "@/utils/is.js"


const viewBy = ref('tile')
const sortBy = ref('name')
const files = ref([])

const filesStore = useFilesStore()

const loading = computed(() => filesStore.getLoading)

const fileLoaded = ref()

const loadHandler = (e: Boolean) => {
  console.log('Loading: ', e)
  fileLoaded.value = e
}

const cards = {
  image: ImageCard,
  audio: AudioCard,
  video: VideoCard,
  document: DocumentCard,
}

const card = (file: object) => {
  const type = file?.metadata?.mimetype

  return cards[file.type]

  // if (isAudio(type)) return AudioCard
  // if (isImage(type)) return ImageCard
  // if (isVideo(type)) return VideoCard
  // if (isDocument(type)) return DocumentCard



  // return null
}

onMounted(async () => {
  const data = await filesStore.fetchFiles()
  await filesStore.fetchPublicURL()
  files.value = data
})
</script>