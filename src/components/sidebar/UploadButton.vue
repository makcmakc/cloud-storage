<script lang="ts" setup>
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Dashboard } from '@uppy/vue'
import { Upload } from 'lucide-vue-next'
import axios from 'axios'
// import Tus from '@uppy/tus'
import Uppy from '@uppy/core'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface props {
  isOpen: boolean
}

defineProps<props>()

const handleUpload = () => {}

const uppy = ref(new Uppy({
  debug: false,
  autoProceed: true,
}));

const files = ref([]);

onMounted(() => {
  // uppy.value.use(Dashboard, {
  //   inline: true,
  //   target: '#uppy-dashboard',
  //   height: 280,
  //   metaFields: [
  //     { id: 'name', name: 'Name', placeholder: 'file name' }
  //   ]
  // });
  fetchFiles();

  uppy.value.on('complete', (result) => {
    console.log('Upload result:', result);
    // fetchFiles();
  });

  uppy.value.on('upload-success', (file, response) => {
    // const fileData = JSON.parse(response.body);
    // files.value.push({ name: fileData.originalname, path: `/uploads/${fileData.filename}` });
  });

  // fetchFiles();
});

const fetchFiles = () => {
  fetch('http://localhost:3000/files')
    .then(response => response.json())
    .then(data => {
      files.value = data;
      console.log(data,  'fetchFiles')
    });
};

const deleteFile = (filename: string) => {
  fetch(`http://localhost:3000/files/${filename}`, {
    method: 'DELETE'
  }).then(() => {
    fetchFiles();
  });
};

// onBeforeUnmount(() => {
//   if (uppy.value) {
//     uppy.value.close();
//   }
// });
</script>

<template>
  	<Dialog>
      <DialogTrigger as-child>
        <Button v-if="isOpen" class="w-full gap-2" variant="secondary" @click="handleUpload">
          <Upload :size="16" />
          Upload file
        </Button>
        <div v-else :class="cn(buttonVariants({ variant: 'secondary' }), 'p-1 w-8 h-8 cursor-pointer')" @click="handleUpload">
          <Upload :size="14" />
        </div>
      </DialogTrigger>

		<DialogContent class=" w-1/2 p-10 max-w-[800px]">
			<Dashboard :uppy="uppy" />
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

.uppy-DashboardContent-bar {
  background-color: var(--muted) !important;
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

// :deep {
.uppy-Dashboard-AddFiles {
	margin: 0 !important;
// }
}

.uppy-Dashboard-AddFiles-title {
	color: #fff;
}

.uppy-Dashboard-AddFiles-info {
	display: none !important;
}
</style>