<template>
	<Dialog>
		<DialogTrigger as-child>
			<Button variant="outline">Upload Files</Button>
		</DialogTrigger>

		<DialogContent class=" w-1/2 p-10 max-w-[800px]">
			<Dashboard :uppy="uppy" />
		</DialogContent>
	</Dialog>
</template>

<script>
	import { defineComponent, computed, ref, onBeforeUnmount } from 'vue'
	import { Dashboard } from '@uppy/vue'
	import { Button } from '@/components/ui/button'
	import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

	import '@uppy/core/dist/style.css';
	import '@uppy/dashboard/dist/style.css';

	// import { supabase } from '@/services/supabaseClient'
	// import { Tus } from 'https://releases.transloadit.com/uppy/v3.6.1/uppy.min.mjs'
	import Tus from '@uppy/tus'
	import Uppy from '@uppy/core'

		const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbGhjdW9sb29sdXpncGhkb21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NzYzODcsImV4cCI6MjAxNTA1MjM4N30.kP112lC0VzvrwOm3WNfqho-ViQhugAQDtyDhcn4_P78'
		const SUPABASE_PROJECT_ID = 'dmlhcuolooluzgphdomp'
		const STORAGE_BUCKET = 'avatars'

		const folder = ''
	const supabaseStorageURL = `https://${SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`

	let token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6Ijdqb0RLaUF2SzNMWVAyV2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2RtbGhjdW9sb29sdXpncGhkb21wLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiIyNmU3NmE3Zi1kOTcwLTRlMWMtYTg4Ni04NmYwNWU3NTZiMGYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzMwNjgwNjQ0LCJpYXQiOjE3MzA2NzcwNDQsImVtYWlsIjoibWFrY21ha2MzMjFAbWFpbC5ydSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzMwNjcyNTYwfV0sInNlc3Npb25faWQiOiIwZjcxZjcyMy1iMDlkLTRjYTMtOWVkZC02NzgzNDE2NmYwYmIiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.DC1BxQ9o6yPPV8SYSNy0joUoj7qW-vvmL5Iok4dK-M8'

	export default defineComponent({
		name: 'upload-button',
		components: {
			Dashboard,
			Button,
			Dialog,
			DialogContent,
			DialogTrigger
		},
		setup() {
			const uppy = ref(null);

			const initializeUppy = computed(() => {
				return () => {
					const uppyInstance = new Uppy({
						debug: false,
						autoProceed: true,
					});

					uppyInstance.use(Tus, {
						endpoint: supabaseStorageURL,
						headers: {
							authorization: `Bearer ${token}`,
							apikey: SUPABASE_ANON_KEY,
						},
						uploadDataDuringCreation: true,
						chunkSize: 6 * 1024 * 1024,
						allowedMetaFields: ['bucketName', 'objectName', 'contentType', 'cacheControl'],
						onError: function (error) {
							console.log('Failed because: ' + error)
						},            
					});

					uppyInstance.on('file-added', (file) => {
						const supabaseMetadata = {
							bucketName: STORAGE_BUCKET,
							objectName: folder ? `${folder}/${file.name}` : file.name,
							contentType: file.type,
						}

						file.meta = {
							...file.meta,
							...supabaseMetadata,
						}
					})          

					uppyInstance.on('complete', async (result) => {
						console.log('Загрузка завершена!', result)
					})

					return uppyInstance
				}
			})

			uppy.value = initializeUppy.value()

			onBeforeUnmount(() => {
				if (uppy.value) {
					uppy.value.close();
				}
			});

			return { uppy };
		},
	})
</script>

<style lang="scss">
.uppy-Dashboard-AddFiles {
	/* background-color: #000; */
}

.uppy-Dashboard-inner {
	width: 100% !important;
	background: var(--background);
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


