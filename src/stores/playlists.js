import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
// import { handleError } from '@/utils/handleError'
import { isAudio } from "@/utils/is.js"

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    loading: false,
    playlists: [],
    publicURL: '',

    isPlaying: false,
    currentTrack: null,
    changingSong: false,
    audio: null,
    currentPlaylist: null,     
    
  }),
  getters: {
    getLoading: state => state.loading,
    getPublicURL: state => state.publicURL,
    getPlaylists: state => state.playlists,

    // gettracks: state => state.tracks
    getCurrentTracks: state => state.currentTrack,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },

    setCurrentTrack(track) {
      this.currentTrack = track;
    },

    playTrack() {
      if (this.changingSong && this.audio) {
        this.audio.pause();
      }
      if (this.audio === null || this.changingSong) {
        this.audio = new Audio(this.currentTrack.url);
      }
      if (this.currentTrack) {
        if (this.isPlaying === false) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }
      this.isPlaying = !this.isPlaying;
      this.changingSong = false;      
    },

    async fetchPlaylists() {
      this.loading = true

      const { data, error } = await supabase.storage
        .from('avatars')
        .list();
      
      if (error) {
        console.log(error)
        return []
      }

      this.playlists = data.reduce((acc, el) => {
        if (isAudio(el.metadata?.mimetype)) acc.push(el)
          return acc
      }, [])
  
      this.loading = false

      return this.playlists
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
