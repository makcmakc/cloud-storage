<template>
  <ScrollArea class="w-full py-4 px-2">
    <div v-if="filesStore.getFiles.length" class="gap-6 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
      <component
        v-for="file in filesStore.getFiles"
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
import { onMounted } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/toast/use-toast'
import { useFilesStore } from '@/stores/files' 
import { getFileComponent } from '@/utils/fileComponent'

const { toast } = useToast()

const filesStore = useFilesStore();

const loadingStates = filesStore.loadingStates

const handleDelete = async (fileId: string) => {
  try {
    await filesStore.deleteFile(fileId)
    toast({
      title: 'File has been deleted successfully!',
    })
  } catch (error) {
    console.error('Error when deleting a file:', error)
  }
}

onMounted(async () => {
  await filesStore.fetchFiles()
})
</script>
