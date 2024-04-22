import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
// import { handleError } from '@/utils/handleError'


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

    setUploadingFiles(files) {
      console.log('Files: ', files)
      files.map(file => {
        this.files.push({
          name: file.name,
          id: self.crypto.randomUUID(),
          uploading: true,
          metadata: {
            size: file.size,
            mimetype: file.type,
            lastModified: file.lastModified,
          }        
        })
      })
    },

    async fetchFiles() {
      this.loading = true

      const { data, error } = await supabase.storage.from('avatars').list();
      
      if (error) {
        console.log(error)
        return []
      }

      this.files = data
      this.loading = false

      return data
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
