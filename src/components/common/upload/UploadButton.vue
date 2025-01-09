<script lang="ts" setup>
import { onBeforeUnmount, nextTick, ref } from 'vue'
import { cn } from '@/lib/utils'

import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Upload } from 'lucide-vue-next'

import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import XHRUpload from '@uppy/xhr-upload'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'


interface props {
  isOpen: boolean
}

defineProps<props>()

const uppy = ref(null)
const dashboardElement = ref(null)

const isDialogOpen = ref(false)

const initUppy = () => {
  if (!uppy.value) {
    uppy.value = new Uppy({
      restrictions: {
        maxNumberOfFiles: 10,
      },
    })
    .use(Dashboard, {
      inline: true,
      target: dashboardElement.value,
      height: 400,
      showProgressDetails: true,
      proudlyDisplayPoweredByUppy: false,
    })
    .use(XHRUpload, {
      endpoint: 'http://localhost:3000/api/upload',
      fieldName: 'file',
      formData: true,
    })

    uppy.value.on('complete', (result) => {
      console.log(result,' result')
      cleanupUppy()
    })
  }
}
const cleanupUppy = () => {
  if (uppy.value) {
    uppy.value.getPlugin('Dashboard').unmount()
    uppy.value.destroy()
    uppy.value = null
  }
}

const handleDialogChange = (open: boolean) => {
  if (open) {
    nextTick(() => initUppy())
  } else {
    cleanupUppy()
  }
}

onBeforeUnmount(() => {
  if (uppy.value) uppy.value.close()
})
</script>

<template>
  <Dialog @update:open="handleDialogChange">
    <DialogTrigger as-child>
      <Button v-if="isOpen" class="w-full gap-2" variant="secondary">
        <Upload :size="16" />
        Upload file
      </Button>
      <div v-else :class="cn(buttonVariants({ variant: 'secondary' }), 'p-1 w-8 h-8 cursor-pointer')">
        <Upload :size="14" />
      </div>
    </DialogTrigger>

		<DialogContent class=" w-1/2 p-10 max-w-[800px]">
      <div ref="dashboardElement"></div>
		</DialogContent>
	</Dialog>
</template>

<style lang="scss">
.uppy-Dashboard-AddFiles {
	/* background-color: #000; */
}

.uppy-StatusBar::before {
  // background-color: ;
}

.uppy-DashboardContent-title {
  color: #fff;
}

.uppy-Dashboard-Item-fileInfo {
  color: #fff;
}

.uppy-StatusBar-actions {
  // background-color: hsl(var(--muted)) !important;
  background-color: hsl(var(--muted)) !important;
}

.uppy-StatusBar {
  background-color: hsl(var(--muted)) !important;
  border-color: hsl(var(--muted)) !important;;

  &::before {
     background-color: hsl(var(--muted)) !important;
  }
}

.uppy-Dashboard-Item-action.uppy-Dashboard-Item-action--remove {
  color: rgb(64 64 64);
}

.uppy-DashboardContent-back {
  color: hsl(var(--primary)) !important;
}

.uppy-DashboardContent-addMore {
  color: hsl(var(--primary)) !important;
}

.uppy-DashboardContent-bar {
  background-color: hsl(var(--muted)) !important;
  border-color: rgb(38 38 38);
}

.uppy-StatusBar-actionBtn--upload {
  background-color: hsl(var(--primary)) !important;
  color: hsl(var(--input)) !important;
}

.uppy-StatusBar-actions {
  // background-color: red;
}
// .uppy-StatusBar.is-waiting .uppy-StatusBar-actions

.uppy-Dashboard-inner {
	width: 100% !important;
	background: var(--vt-c-divider-light-1);
	border: none;
}

.uppy-Dashboard-AddFiles {
	// margin: 0 !important;

  &-title {
    color: #fff;
  }
}

.uppy-Dashboard-AddFiles-info {
	display: none !important; 
}
</style>