<template>
  <ScrollArea class="w-full py-4 px-2">
    <!-- <div class="gap-6 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]" v-if="!loading">
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
    </div> -->

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
import { ref, computed, onMounted } from 'vue'
import type { Component } from 'vue'
import type { FileInfo } from '@/types/file'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/toast/use-toast'
import { useFilesStore } from '@/stores/files' 
import { getFileComponent } from '@/utils/fileComponent'

const loadingStates = ref<Record<string, boolean>>({})

const { toast } = useToast()

const files = ref([])

const filesStore = useFilesStore()

const handleDelete = async (filename: string) => {
  try {
    await fetch(`http://localhost:3000/api/files/${filename}`, {
      method: 'DELETE'
    })
    filesStore.fetchFiles()
  } catch (error) {
    console.error('Ошибка при удалении файла:', error)
  }
}


const fetchFiles = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/files')
    const data = await response.json()
    
    // Устанавливаем начальное состояние загрузки для каждого файла
    data.forEach((file: FileInfo) => {
      loadingStates.value[file.id] = true
      
      // Имитируем загрузку метаданных с разной задержкой для каждого файла
      setTimeout(() => {
        loadingStates.value[file.id] = false
      }, Math.random() * 5000 + 500) // Случайная задержка от 500мс до 1.5с
    })
    
    files.value = data
    toast({ title: 'Scheduled: Catch up', description: 'Friday, February 10, 2023 at 5:57 PM'});
  } catch (error) {
    console.error('Ошибка при получении файлов:', error)
    toast({ variant: 'destructive', title: 'Uh oh! Something went wrong.', description: 'There was a problem with your request.'});
  }
}

onMounted(async () => {
  await fetchFiles()
})
</script>