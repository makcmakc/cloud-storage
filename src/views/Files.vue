<template>
  <div class="space-between md:flex items-center">    
    <div class="flex items-center md:justify-between justify-end gap-4 w-full">
      <div class="space-y-1 hidden md:flex">
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
      <UploadButton />
    </div>
  </div>

  <Separator class="my-4" />

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

// components
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

// cards
// import File from '../components/File.vue'
import AudioCard from '../components/cards/audio/index.vue'
import ImageCard from '../components/cards/image/index.vue'
import VideoCard from '../components/cards/video/index.vue'
import DocumentCard from '../components/cards/document/index.vue'
import UploadButton from '../components/Upload.vue'
import { useFilesStore } from '@/stores/files' 

const viewBy = ref('tile')
const sortBy = ref('name')

const filesStore = useFilesStore()

const loading = computed(() => filesStore.getLoading)
const files = computed(() => filesStore.getFiles)

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
  await filesStore.fetchFiles()
  await filesStore.fetchPublicURL()

  console.log(files.value)
})
</script>