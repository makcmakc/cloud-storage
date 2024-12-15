<template>
  <ScrollArea class="w-full py-4 px-2">
    <div class="gap-6 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]" v-if="!loading">
      <component
        v-for="(file, idx) in madeForYouAlbums"
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
  </ScrollArea>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFilesStore } from '@/stores/files' 
import { ScrollArea } from '@/components/ui/scroll-area'

// cards
import File from '../components/File.vue'
import AudioCard from '../components/cards/audio/index.vue'
import ImageCard from '../components/cards/image/index.vue'
import VideoCard from '../components/cards/video/index.vue'
import DocumentCard from '../components/cards/document/index.vue'

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

import { madeForYouAlbums } from '../components/albums'

onMounted(async () => {
  // const data = await filesStore.fetchFiles()
  // await filesStore.fetchPublicURL()
  // files.value = data
})
</script>