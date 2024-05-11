<template>
  <span >
    <label v-if="isDesktop" for="upload-input" :class="cn(buttonVariants({ variant: 'default' }))" class="cursor-pointer">
      <Upload class="mr-2 h-4 w-4" />
      <span>Загрузить файл</span>
    </label>
    <label v-else for="upload-input" class="flex items-center">
      <Upload :size="30" />
      <span class="ml-4">Upload file</span>
    </label>


    <!-- <file-pond
      name="test"
      ref="pond"
      label-idle="Drop files here..."
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      server="https://dmlhcuolooluzgphdomp.supabase.co/storage/v1/upload/resumable"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
    />     -->

    <!-- <div id="drag-drop-area"></div> -->

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
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { useFilesStore } from '@/stores/files' 
import { isVideo, isAudio } from "@/utils/is.js"


import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";


// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);


const handleFilePondInit = () => {
  console.log("FilePond has initialized");

// FilePond instance methods are available on `this.$refs.pond`
}


// import {Dashboard} from '@uppy/vue';
import Uppy from '@uppy/core';
// import Tus from '@uppy/core';
// import Dashboard from '@uppy/core';
// import { Uppy } from 'https://releases.transloadit.com/uppy/v3.6.1/uppy.min.mjs'
import XHRUpload from '@uppy/xhr-upload'

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


const emit = defineEmits(['open'])

const filesStore = useFilesStore()

const isDesktop = useMediaQuery('(min-width: 768px)')

const projectId = 'dmlhcuolooluzgphdomp'

function awaitableJsmediatags(file: File) {
  return new Promise(function(resolve, reject) {
    // @ts-ignore: Unreachable code error
    jsmediatags.read(file, {
      onSuccess: function(tag: object) { resolve(tag.tags) },
      onError: function(error: object) { reject(error)}
    });
  });
}


// Function for uploading files
async function uploadFile(file: File) {
  const { data: { session } } = await supabase.auth.getSession()

  filesStore.setUploadingFiles(file)

  if (isAudio(file.type)) {
    // @ts-ignore: Unreachable code error
    let tags = await awaitableJsmediatags(file);
    let blob

    const cover = tags?.picture

    if (cover) blob = new Blob([new Uint8Array(cover.data)], { type: cover.format })

    console.log(tags)
  }


  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbGhjdW9sb29sdXpncGhkb21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NzYzODcsImV4cCI6MjAxNTA1MjM4N30.kP112lC0VzvrwOm3WNfqho-ViQhugAQDtyDhcn4_P78'
  const SUPABASE_PROJECT_ID = 'dmlhcuolooluzgphdomp'
  const STORAGE_BUCKET = 'avatars'
  const BEARER_TOKEN = session.access_token

  const folder = ''
  const supabaseStorageURL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`

  var uppy = new Uppy()
//   uppy.use(XHRUpload, {
//     autoProceed: false,
//     restrictions: { maxNumberOfFiles: 1 },
// })
  uppy.use(XHRUpload, {
    endpoint: supabaseStorageURL, // Замените на URL для загрузки в Supabase Storage
    formData: true,
    fieldName: 'file',
    allowedMetaFields: ['name', 'artist', 'cover'], // Добавление метаданных
    autoProceed: false,
    restrictions: { maxNumberOfFiles: 1 },
  });

  uppy.on('file-added', (file) => {
    file.meta = {
      name: file.name,
      artist: 'Artist Name',
      cover: 'URL_TO_COVER_IMAGE',
    };
  });

  uppy.on('upload-progress', (file, progress) => {
    console.log(`Uploading ${file.name}: ${progress}%`);
  });

  uppy.on('upload-success', (file, response) => {
    console.log(`Upload successful: ${response.uploadURL}`);
  });
 
}

// Handler for the file selection event
async function uploadHandler (event?: HTMLInputEvent) {
  const files: any = Array.from(event?.target?.files as FileList);
  files.map(async file => await uploadFile(file))
}
</script>
