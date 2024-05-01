<template>
  <div class="space-between md:flex items-center hidden">
    
      <div class="flex items-center justify-between w-full">
        <div class="space-y-1">
          <div class="gap-1 inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" class="h-7 px-2">
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent >
                <DropdownMenuRadioGroup v-model="sortBy">
                  <DropdownMenuRadioItem value="name">
                    Name
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="size">
                    Size
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="date">
                    Date
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" class="h-7 px-2">
                  View by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup v-model="viewBy">
                  <DropdownMenuRadioItem value="tile">
                    Tile
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="list">
                    List
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> 
        </div>
        <UploadButton />
      </div>
  </div>

    <!-- MOBILE -->
  <div class="md:hidden ml-auto mt-0">
    <div class="flex gap-2 justify-between">
    <h1 class="text-xl font-semibold	">Files</h1>
    <div class="flex gap-4 justify-end">
      <Drawer v-model:open="isOpen">
        <DrawerTrigger>
          <Plus />
        </DrawerTrigger>
        <DrawerContent>
          <div class="p-6 pb-8 text-lg">
            <div class="flex items-center mb-4">
              <FolderPlus :size="30" />
              <span class="ml-4">Create folder</span>
            </div>
            <UploadButton :isOpen="isOpen" @open="openHandler" />
          </div>
        </DrawerContent>
      </Drawer>      
      <Drawer>
        <DrawerTrigger>
          <EllipsisVertical />
        </DrawerTrigger>
        <DrawerContent>
          <FormField v-slot="{ componentField }" type="radio" name="type">
            <FormItem class="p-6">
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
            <FormItem class="p-6">
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
    </div>      
    </div>
  </div>

  <Separator class="my-4" />

  <div class="gap-4 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]" v-if="files.length">
    <File
      v-for="file in files"
      :key="file.name"
      :album="file"
      aspect-ratio="square"
      :width="150"
      :height="150"
    />      
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Separator } from '@/components/ui/separator'

import { AudioLines, Folder, EllipsisVertical, Plus, Upload, Music, FolderPlus } from 'lucide-vue-next';
// import File from '../components/File.vue'

import { ref, computed } from 'vue';
import { useFilesStore } from '@/stores/files' 

import UploadButton from '../components/UploadButton.vue';

import { onMounted } from "vue"

import { defineAsyncComponent } from 'vue'

const File = defineAsyncComponent(() => import('../components/File.vue'))


const isOpen = ref(false)
const viewBy = ref('tile')
const sortBy = ref('name')

const filesStore = useFilesStore()

const openHandler = (val: boolean) => {
  console.log(val, 'uploading!')
  isOpen.value = false
}


onMounted(async () => {
  filesStore.setLoading(true)
  await filesStore.fetchFiles()
  await filesStore.fetchPublicURL()
  filesStore.setLoading(false)
})


const files = computed(() => filesStore.getFiles)


// import { madeForYouAlbums } from '../components/albums'
</script>