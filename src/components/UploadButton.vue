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
import { onMounted, ref } from 'vue'

import { supabase } from '@/services/supabaseClient'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'

import * as tus from 'tus-js-client'


import { useFilesStore } from '@/stores/files' 

const filesStore = useFilesStore()
const { toast } = useToast()

// Reuse `form` section
// const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')


interface Metadata {
  bucketName: string,
  objectName: number,
  contentType: string,
  cacheControl: number,
}

// console.log(filesStore.getPublicURL)
    // const imageSrc = URL.createObjectURL(file)
    // console.log(URL.revokeObjectURL(imageSrc))

const projectId = 'dmlhcuolooluzgphdomp'

// Function for uploading files
async function uploadFile(file: File) {
  const { data: { session } } = await supabase.auth.getSession()

  // file.id = self.crypto.randomUUID(),
  filesStore.setUploadingFiles(file)

  return new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(file, {
        endpoint: `https://${projectId}.supabase.co/storage/v1/upload/resumable`,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          authorization: `Bearer ${session.access_token}`,
          'x-upsert': 'true', // optionally set upsert to true to overwrite existing files
        },
        uploadDataDuringCreation: true,
        removeFingerprintOnSuccess: true, // Important if you want to allow re-uploading the same file https://github.com/tus/tus-js-client/blob/main/docs/api.md#removefingerprintonsuccess
        chunkSize: 6 * 1024 * 1024, // NOTE: it must be set to 6MB (for now) do not change it
        metadata: {
          bucketName: 'avatars',
          objectName: file.name,
          contentType: file.type,
          cacheControl: 3600,
        },
        onError: function (error) {
          console.log('Failed because: ' + error)
          reject(error)
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const progress = ~~((bytesUploaded / bytesTotal) * 100)
          console.log('progress : ', progress)
          filesStore.setProgress(file, progress)
        },
        onSuccess: function () {
            console.log('Download %s from %s', upload.file.name, upload.url)
      
            resolve()

            filesStore.removeUploadingBlank(file)
            filesStore.fetchFiles() 

            // filesStore.setUploadingFiles(uploaded, 'success')

            // filesStore.setUploadingFiles(file, 'success')

            // const current = filesStore.files.find(el => el.id === fileId)
            // console.log('onSuccess : ' ,current)
            // console.log('upload : ', upload.file)
        },
    })

    // Check if there are any previous uploads to continue.
    return upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }

      // Start the upload
      upload.start()
    })
  })
}

// Handler for the file selection event
const uploadAvatar = async (event) => {
  const files = Array.from(event.target.files);

  // files.map(async file => {
  //   // const fileId = self.crypto.randomUUID()
  //   // file.id = fileId
  //   // filesStore.setUploadingFiles(file, null)
  //   await uploadFile(file);
  // })
  await uploadFile(files[0]);
}
</script>