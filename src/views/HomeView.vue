<script setup>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/app/Header.vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { computed, ref } from 'vue'

import { useMediaQuery } from '@vueuse/core'
import { useFilesStore } from '@/stores/files'

import UploadList from '@/components/UploadList.vue'

const filesStore = useFilesStore()
const uploadingFiles = computed(() => filesStore.getUploadingFiles)
const isDesktop = useMediaQuery('(min-width: 768px)')
const openUploadList = ref(false)

import { useEventBus } from '@vueuse/core'


const bus = useEventBus('upload')
bus.on((e) => {
    console.log(e) // "Hello"
  setTimeout(() => {
    openUploadList.value = true
  }, 300)
})
</script>

<template>
  <Header></Header>

  <main class="flex h-full">
    <Sidebar v-if="isDesktop"/>
    <ScrollArea class="w-full h-full p-4 md:border-l">
      <RouterView></RouterView>
    </ScrollArea>
  </main>

  <UploadList v-if="openUploadList && uploadingFiles.length" />
</template>
