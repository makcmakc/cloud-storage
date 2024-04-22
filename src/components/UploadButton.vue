<template>
  <span>
    <label v-if="isDesktop" for="upload-input" :class="cn(buttonVariants({ variant: 'default' }))" class="cursor-pointer">
      <Upload class="mr-2 h-4 w-4" />
      <span>Загрузить файл</span>
    </label>
    <label v-else for="upload-input" class="flex items-center">
      <Upload :size="30" />
      <span class="ml-4">Upload file</span>
    </label>

    <input type="file"
      class="input-upload hidden"
      id="upload-input"
      multiple
      @change="uploadAvatar"
    />
  </span> 
</template>

<script setup lang="ts">

import { Upload, Plus } from 'lucide-vue-next';
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'

import { supabase } from '@/services/supabaseClient'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'



import { useFilesStore } from '@/stores/files' 

const filesStore = useFilesStore()
const { toast } = useToast()

// Reuse `form` section
// const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')


// Function for uploading files
async function uploadFiles(files) {
  const promises = files.map(async file => {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(file.name, file)

    if (error) {
      console.error('Ошибка при загрузке файла:', error.message);
    } else {
      console.log('Файл успешно загружен:', data);
    }
  });

  await Promise.all(promises);
  await filesStore.fetchFiles() 
}

// Handler for the file selection event
const uploadAvatar = async (event) => {
  const files = Array.from(event.target.files);
  await uploadFiles(files);
}
</script>