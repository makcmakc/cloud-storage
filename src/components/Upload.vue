<template>
  <template v-if="isDesktop">
    <Dialog v-model:open="uploadDialog">
      <DialogTrigger as-child>
        <label v-if="isDesktop" for="upload-input" :class="cn(buttonVariants({ variant: 'default' }))" class="cursor-pointer">
          <Upload class="mr-2 h-4 w-4" />
          <span>Upload file</span>
        </label>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px] md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>Drag and drop your files here or click to browse.</DialogDescription>
          <div class="absolute right-10 top-4">
            <Minus :size="20" class="cursor-pointer" />
          </div>
        </DialogHeader>

        <div class="grid gap-4 py-4">
          <div class="group relative w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 text-center transition hover:bg-muted/25 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <div v-bind="getRootProps()" class="flex items-center justify-center min-h-64" :class="{ isDragActive }">
              <input v-bind="getInputProps()" />
              <p v-if="isDragActive">Drop the files here ...</p>
              <p v-else><CloudUpload :size="52" color="#9e9da6" /></p>
            </div>
          </div>
        </div>

        <DialogFooter class="md:justify-start flex md:flex-col" v-if="files.length">
          <ScrollArea class="h-fit w-full overflow-hidden max-h-52">
            <div class="space-y-4 px-2">
              <div class="relative flex items-center w-full px-1" v-for="(file, idx) in uploadingFiles" :key="idx">
                <div class="flex flex-1 space-x-4 w-full pr-6">
                  <img
                    class="aspect-square shrink-0 w-14 h-14 rounded-md object-cover"
                    :src="file.preview"
                    loading="lazy"
                    alt="">

                  <div class="flex w-full flex-col gap-2">
                    <div class="space-y-px">
                      <p class="line-clamp-1 text-sm font-medium text-foreground/80">{{ file.name }}</p>
                      <p class="text-xs text-muted-foreground">{{ formatSize(file.size) }}</p>
                    </div>
                    <!-- {{ check(file)  }} -->
                    <!-- chec{{  file.progress }} -->
                    <!-- <Progress v-model="file.progress" class="w-5/5 h-1" /> -->
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <Button variant="outline" class="p-1 rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground">
                    <X :size="16"/>
                  </Button>
                  <span class="sr-only">Remove file</span>
                </div>
              </div>
            </div>      
          </ScrollArea>
        </DialogFooter>
      </DialogContent>
    </Dialog> 
  </template>

  <template v-else>
    <Drawer>
      <DrawerTrigger>
        <Plus />
      </DrawerTrigger>
      <DrawerContent>
        <div class="p-6 pb-8 text-lg">
          <div class="flex items-center mb-4">
            <FolderPlus :size="30" />
            <span class="ml-4">Create folder</span>
          </div>
          <label class="flex items-center" for="upload-input">
            <Upload :size="30" />
            <span class="ml-4">Upload file</span>
          </label>
          <input type="file"
            class="input-upload hidden"
            id="upload-input"
            multiple
            @change="uploadHandler"
          />
        </div>
      </DrawerContent>
    </Drawer>      
    <Drawer>
      <DrawerTrigger>
        <EllipsisVertical />
      </DrawerTrigger>
      <DrawerContent>
        <FormField v-slot="{ componentField }" type="radio" name="type">
          <FormItem class="p-6 pb-4">
            <FormLabel class="text-xl">View</FormLabel>
            <RadioGroup default-value="comfortable">
              <div class="flex items-center space-x-3 mt-2">
                <RadioGroupItem id="list" value="list" />
                <Label for="list" class="text-base">List</Label>
              </div>
              <div class="flex items-center space-x-3">
                <RadioGroupItem id="tile" value="tile" />
                <Label for="tile" class="text-base">Tile</Label>
              </div>
            </RadioGroup>
          </FormItem>
        </FormField>

        <Separator />

        <FormField v-slot="{ componentField }" type="radio" name="type">
          <FormItem class="p-6 pt-4">
            <FormLabel class="text-xl">Sort by</FormLabel>
            <RadioGroup default-value="comfortable">
              <div class="flex items-center space-x-3 mt-2 w-full">
                <RadioGroupItem id="name" value="name" />
                <Label for="name" class="text-base">Name</Label>
              </div>
              <div class="flex items-center space-x-3">
                <RadioGroupItem id="size" value="size" />
                <Label for="size" class="text-sm">Size</Label>
              </div>
              <div class="flex items-center space-x-3">
                <RadioGroupItem id="type" value="type" />
                <Label for="type" class="text-base">Type</Label>
              </div>
              <div class="flex items-center space-x-3">
                <RadioGroupItem id="date" value="date" />
                <Label for="date" class="text-base">Date</Label>
              </div>
            </RadioGroup>
          </FormItem>
        </FormField>
      </DrawerContent>
    </Drawer>
  </template>
</template>



<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'

import { Minus } from 'lucide-vue-next';


import { useDropzone } from "vue3-dropzone"

import { useFilesStore } from '@/stores/files' 
import { computed, ref, watch } from 'vue';
import { formatSize } from '@/utils/formatSize'
import { getCoverByType } from '../utils/is'
import { useEventBus } from '@vueuse/core'

import { supabase } from '@/services/supabaseClient'
import * as tus from 'tus-js-client'

const uploadDialog = ref(false)

const projectId = 'dmlhcuolooluzgphdomp'

const bus = useEventBus<string>('upload')

const files = ref([])
const filesStore = useFilesStore()

const progress = ref(0)



const uploadingFiles = computed(() => filesStore.getUploadingFiles)


const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({ onDrop })

watch(uploadDialog, (v) => {
  if (v)  files.value = []
  console.log(v)
  // if (!v) bus.emit('close')
})

// Function for uploading files
async function uploadFile(file) {
  const { data: { session } } = await supabase.auth.getSession()

  // console.log(file)
  filesStore.setUploadingfile(file)

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
          creator: 'John Doe'
        },
        onError: function (error: Error) {
          console.log('Failed because: ' + error)
          reject(error)
        },
        onProgress: function (bytesUploaded: number, bytesTotal: number) {
          const p = ~~((bytesUploaded / bytesTotal) * 100)
          console.log('progress : ', p)
          // progress.value = p
          file.progress = p
          // console.log(Array.from(files.value), file.id)
          // let n = uploadingFiles.value.find(el => el.id == file.id)
          // n.progress = p
          // console.log('n', n)
          // filesStore.setUploadingProgress(file, p)

          // filesStore.setProgress(file, progress)
        },
        onSuccess: function () {
          // console.log('Download %s from %s', upload.file.name, upload.url)
          resolve()
          // filesStore.removeUploadingBlank(file)
          // filesStore.fetchFiles()
        },
    })

    // Check if there are any previous uploads to continue.
    return upload.findPreviousUploads().then(function (previousUploads: Array<[]>) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }

      // Start the upload
      upload.start()
    })
  })
}

async function onDrop(acceptFiles: any, rejectReasons: any) {
  const newFiles = acceptFiles.map((file: File) =>
    Object.assign(file, {
      // cover: getCoverByType(file),
      id: crypto.randomUUID(),
      progress: 0,
      preview: URL.createObjectURL(file),
    })
  )

  // filesStore.setUploadingFiles(newFiles)



  // console.log('uploadingFiles ', uploadingFiles.value)
  // bus.emit('close')


  // const updatedFiles = files ? [...files, ...newFiles] : newFiles
  files.value = newFiles
  // setFiles(updatedFiles)

  // const files: any = Array.from(files.value as FileList);
  files.value.map(async file => await uploadFile(file))

  // if (rejectedFiles.length > 0) {
  //   rejectedFiles.forEach(({ file }) => {
  //     toast.error(`File ${file.name} was rejected`)
  //   })
  // }

  // setTimeout(() => {
  //   uploadDialog.value = false
  // }, 200)
}

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { Upload, X, CloudUpload, Plus, FolderPlus, EllipsisVertical } from 'lucide-vue-next';
import { useMediaQuery } from '@vueuse/core'
// import { supabase } from '@/services/supabaseClient'
// import { defineEmits } from 'vue';
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
// import { useToast } from '@/components/ui/toast/use-toast'

// import * as tus from 'tus-js-client'


const isDesktop = useMediaQuery('(min-width: 768px)')



interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const emit = defineEmits(['open'])

// const filesStore = useFilesStore()

// console.log('rest', rest)

</script>


<style lang="scss" scoped>

.border {
  &.isDragActive {
    border: 2px dashed #ffb300;
    background: rgb(255 167 18 / 20%);
  }
}

.file-item {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(255 167 18 / 20%);
  padding: 7px;
  padding-left: 15px;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .delete-file {
    background: red;
    color: #fff;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>