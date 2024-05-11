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
      @change="uploadHandler"
    />
  </span> 
</template>

<script setup lang="ts">

import { Upload } from 'lucide-vue-next';
import { useMediaQuery } from '@vueuse/core'
import { supabase } from '@/services/supabaseClient'
// import { defineEmits } from 'vue';
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'

import * as tus from 'tus-js-client'
import { useFilesStore } from '@/stores/files' 


interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const emit = defineEmits(['open'])

const filesStore = useFilesStore()
const { toast } = useToast()

const isDesktop = useMediaQuery('(min-width: 768px)')

const projectId = 'dmlhcuolooluzgphdomp'

// console.log(jsmediatags, 'jsmediatags')


function awaitableJsmediatags(file) {
  return new Promise(function(resolve, reject) {
    // @ts-ignore: Unreachable code error
    jsmediatags.read(file, {
      onSuccess: function(tag: object) {
        resolve(tag.tags);
      },
      onError: function(error) {
        reject(error);
      }
    });
  });
}


// Function for uploading files
async function uploadFile(file: File) {
  const { data: { session } } = await supabase.auth.getSession()

  filesStore.setUploadingFiles(file)

  // let audioInfo = {}

    // @ts-ignore: Unreachable code error
  let tags = await awaitableJsmediatags(file);
  // console.log('TAGS L ', tags)

  const album = tags?.album
  const artist = tags?.artist
  const title = tags?.title
  const year = tags?.year
  let url = null

  const image = tags?.picture

  if (image) {
    const blob = new Blob([new Uint8Array(image.data)], { type: image.format });
    // url = URL.createObjectURL(blob);
    url = blob;
  }

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
          cacheControl: '3600',
          // test: 'asdasdasdas',
          // album: tags?.album,
          // artist: tags?.artist,
          // title: tags?.title,
          // year: tags?.year,
          // blobUrl: url
        },
        onError: function (error) {
          console.log('Failed because: ' + error)
          reject(error)
        },
        onProgress: function (bytesUploaded, bytesTotal) {
          const progress = ~~((bytesUploaded / bytesTotal) * 100)
          // console.log('progress : ', progress)
          filesStore.setProgress(file, progress)
        },
        onSuccess: function () {
          // console.log('Download %s from %s', upload.file.name, upload.url)
          resolve()
          filesStore.removeUploadingBlank(file)
          filesStore.fetchFiles()
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
async function uploadHandler (event?: HTMLInputEvent) {
  const files: any = Array.from(event?.target?.files as FileList);
  files.map(async file => await uploadFile(file))
}
</script>
