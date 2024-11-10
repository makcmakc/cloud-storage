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
  }),
  getters: {
    getLoading: state => state.loading,
    getPublicURL: state => state.publicURL,
    getFiles: state => state.files,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },
    async fetchFiles() {
      this.loading = true

      const { data, error } = await supabase.storage
        .from('avatars')
        .list();
      
      if (error) {
        console.log(error)
        return []
      }

      this.files = data
        .map(el => ({...el, type: defineType(el.metadata.mimetype)} ))

      // console.log(this.files)
  
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
