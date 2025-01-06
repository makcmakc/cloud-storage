import { defineStore } from 'pinia'
// import { defineType } from "@/utils/is.js"



export const useFilesStore = defineStore('files', {
  state: () => ({
    loading: false,
    files: [],
    photos: [],
    publicURL: '',
    storageFilesSize: 0,
    storageCapacity: 1000000000, // bytes
  }),
  getters: {
    getLoading: state => state.loading,
    getPublicURL: state => state.publicURL,
    getFiles: state => state.files,
    getTotalFilesSize: state => state.storageFilesSize,
    getStorageCapacity: state => state.storageCapacity,
    getStorageVolume: state => Math.round(((state.storageFilesSize / state.storageCapacity) * 100)?.toFixed(2)) ?? 0,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    async fetchFiles() {
      fetch(`${import.meta.env.VITE_API_ENDPOINT}/files`)
      .then(response => response.json())
      .then(data => {
        this.files = data
         console.log(this.getFiles , ' this.files ')
      });
    },  
  }
})
