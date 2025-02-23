import { defineStore } from 'pinia'
import type { FileInfo, FilesState } from '@/types/file'

export const useFilesStore = defineStore('files', {
  state: (): FilesState => ({
    loading: false,
    files: [],
    photos: [],
    publicURL: '',
    storageFilesSize: 0,
    storageCapacity: 1000000000, // bytes
    loadingStates: {},
  }),
  getters: {
    getLoading: state => state.loading,
    getPublicURL: state => state.publicURL,
    getFiles: state => state.files,
    getTotalFilesSize: state => state.storageFilesSize,
    getStorageCapacity: state => state.storageCapacity,
    getStorageVolume: (state) => Math.round(parseFloat(((state.storageFilesSize / state.storageCapacity) * 100).toFixed(2))) ?? 0,
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    async fetchFiles() {
      try {
        fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/files`)
          .then(response => response.json())
          .then(data => {
            data.forEach((file: FileInfo) => {
              this.loadingStates[file.id] = true
        
              setTimeout(() => {
                this.loadingStates[file.id] = false
              }, Math.random() * 5000 + 500)
            })

            this.files = data
          })
      } catch (e) {
        console.error('Error getting files:', e);
      }
    },
    async deleteFile(fileId: string) {
      try {
        this.files = this.files.filter(f => f.id !== fileId)
        await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/files/${fileId}`, {
          method: 'DELETE'
        })
      } catch (e) {
        console.error('Error getting files:', e);
      }
    }
  }
})
