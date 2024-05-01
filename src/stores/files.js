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

    setUploadedFile(file, status) {},

    setUploadingFiles(file, status) {
      // console.log('Files: ', file, status)
      let f = {
        name: file.name,
        src: URL.createObjectURL(file),
        uploading: true,
        progress: null,
        metadata: {
          size: file.size,
          mimetype: file.type,
          lastModified: file.lastModified ?? null,
        }        
      }

      // if (status === 'success') {
      //   // this.files.push(file)
      //   f.src = file.url
      //   delete f.uploading
      //   delete f.progress
      // }

      this.files.push(f)
    },

    setProgress(file, progress) {
      console.log('percentage : ', progress)
      const current = this.files.find(el => el.id === file.id)
      // console.log(current, this.files)
      current.progress = progress
    },

    removeUploadingBlank(file, upload) {
      console.log(file, upload, this.files)

      this.files = this.files.filter(el => el.id !== file.id)
      // this.files.push(upload.file)
      // const current = this.files.find(el => el.id === file.id)
      // this.files = {...this.files, ...upload}
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
