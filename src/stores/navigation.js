import { defineStore } from 'pinia'
// import { supabase } from '@/services/supabaseClient'

import { File, Images, ListMusic  } from 'lucide-vue-next'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    sidebarLinks: [
      {
        title: 'Files',
        icon: File,
        variant: 'ghost',
        route: 'files'
      },
      {
        title: 'Gallery',
        icon: Images,
        variant: 'ghost',
        route: 'gallery'
      },
      {
        title: 'Playlist',
        icon: ListMusic,
        variant: 'ghost',
        route: 'playlist'
      },      
    ]
  }),
  getters: {
    getNavigationLinks: state => state.sidebarLinks,
  }
})
