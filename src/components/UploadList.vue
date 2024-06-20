<template>
  <div class="absolute top-0 z-[100] w-full max-w-lg p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col xs:max-w-[475px]">
    <div class="group gap-4 flex flex-col max-w-[475px] max sm:rounded-lg relative items-center justify-between space-x-2 overflow-hidden rounded-md p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]  border bg-background text-foreground max-h-[455px]" :class="{'max-h-[400px]': isOpen}">
    <div class="flex justify-between w-full px-1">
      <span class="font-medium">{{ files.length }} files uploading</span>
      <span class="flex gap-4">
        <ChevronDown v-if="isOpen" class="cursor-pointer" @click="hideHandler" />
        <ChevronUp v-else class="cursor-pointer" @click="hideHandler" />
        <X class="cursor-pointer" @click="closeHandler"/>
      </span>
    </div>

    <Separator />

    <ScrollArea class="h-fit w-full overflow-hidden max-h-40">
      <div class="space-y-4">
        <div class="relative flex items-center w-full px-1" v-for="(file, idx) in files" :key="idx">
          <div class="flex flex-1 space-x-4 w-full">
            <!-- <img
              class="aspect-square shrink-0 w-10 h-10 rounded-md object-cover"
              :src="file.preview"
              loading="lazy"
              alt=""> -->

            <div class="flex w-full flex-col gap-2">
              <div class="space-y-px">
                <p class="line-clamp-1 text-sm font-medium text-foreground/80">{{ file.name }}</p>
                <p class="text-xs text-muted-foreground">{{ formatSize(file.size) }}</p>
              </div>
              <!-- {progress ? <Progress value={progress} /> : null} -->
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
    </div>
  </div>
</template>

<script setup>
import { X, ChevronDown, ChevronUp} from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ref, computed } from 'vue'
import { useFilesStore } from '@/stores/files'
import { formatSize } from '@/utils/formatSize'

const emit = defineEmits(["close"]);

const filesStore = useFilesStore()
const files = computed(() => filesStore.getUploadingFiles)

const isOpen = ref(true)

const hideHandler = () => {
  isOpen.value = !isOpen.value
}

const closeHandler = () => {
  emit('close', isOpen)
}
</script>