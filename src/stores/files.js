import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
// import { handleError } from '@/utils/handleError'
import { defineType } from "@/utils/is.ts"


export const useFilesStore = defineStore('files', {
  state: () => ({
    loading: false,
    files: [],
    publicURL: '',
    uploadingFiles: []
  }),
  getters: {
    getLoading: state => state.loading,
    getPublicURL: state => state.publicURL,
    getFiles: state => state.files,
    getUploadingFiles: state => state.uploadingFiles
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },

    setUploadingFiles(files) {
      this.uploadingFiles = files
    },

    setUploadingfile(file) {
      this.uploadingFiles.push(file);
    },

    setUploadingProgress(file, progress) {
      console.log(this.uploadingFiles[0], 'this.uploadingFiles')
      // const files = [...this.uploadingFiles]
      // let c = this.uploadingFiles.find(el => el.id === file.id)

      this.uploadingFiles[0] = {...this.uploadingFiles[0], progress: progress }

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
