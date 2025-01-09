<template>
  <ScrollArea class="w-full py-4 px-2">
    <div v-if="files.length" class="gap-6 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
      <component
        v-for="file in files"
        :key="file.id"
        :is="getFileComponent(file.mimetype)"
        :file="file"
        :loading="loadingStates[file.id]"
        @delete="handleDelete"
      >
      </component>
    </div>
    <div v-else class="text-center text-gray-500 mt-8">
      There are no uploaded files
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { FileInfo } from '@/types/file'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/toast/use-toast'
// import { useFilesStore } from '@/stores/files' 
import { getFileComponent } from '@/utils/fileComponent'

const loadingStates = ref<Record<string, boolean>>({})

const { toast } = useToast()

const files = ref<FileInfo[]>([])

const handleDelete = async (filename: string) => {
  try {
    await fetch(`http://localhost:3000/api/files/${filename}`, {
      method: 'DELETE'
    })
    fetchFiles()
  } catch (error) {
    console.error('Ошибка при удалении файла:', error)
  }
}

const fetchFiles = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/files')
    const data = await response.json()

    data.forEach((file: FileInfo) => {
      loadingStates.value[file.id] = true

      setTimeout(() => {
        loadingStates.value[file.id] = false
      }, Math.random() * 5000 + 500)
    })
    
    files.value = data
    toast({ title: 'Scheduled: Catch up', description: 'Friday, February 10, 2023 at 5:57 PM'});
  } catch (error) {
    console.error('Error getting files:', error)
    toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.', description: 'There was a problem with your request.'});
  }
}

onMounted(async () => {
  await fetchFiles()
})
</script>
