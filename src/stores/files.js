import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
// import { handleError } from '@/utils/handleError'
import { defineType } from "@/utils/is.js"


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
      this.loading = true
      this.storageFilesSize = 0

      const { data, error } = await supabase.storage
        .from('avatars')
        .list();
      
      if (error) {
        console.log(error)
        return []
      }

      this.files = data
        .map(el => {
          this.storageFilesSize += el?.metadata?.size

          return {
            ...el,
            type: defineType(el.metadata.mimetype)
          }
        })

  
      this.loading = false

      return this.files
    },

    async fetchPublicURL() {
      const { data, error } = supabase
        .storage
        .from('avatars')
        .getPublicUrl('/')

      if (error) console.log(error)

      this.publicURL = data.publicUrl
    },    
  }
})
