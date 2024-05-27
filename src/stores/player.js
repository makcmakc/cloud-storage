import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'
// import { handleError } from '@/utils/handleError'
import { isAudio } from "@/utils/is.js"

export const usePlayerStore = defineStore('player', {
  state: () => ({
    loading: false,
    playlists: [],
    publicURL: '',

    isPlaying: false,
    isMute: false,
    currentTrack: '',
    changingSong: false,
    audio: null,
    currentPlaylist: null,

    playback: 0,
    
    currentSeconds: 0,
    durationSeconds: 0,
    buffered: 0,
    innerLoop: false,
    loaded: false,
    previousVolume: 0.3,
    showVolume: false,
    volume: 0.5
  }),
  getters: {
    getLoading: state => state.loading,
    getPublicURL: state => state.publicURL,
    getPlaylists: state => state.playlists,

    // gettracks: state => state.tracks
    getCurrentTrack: state => state.currentTrack,

    getPlayback: state => state.playback,

    getAudioState: state => state.isPlaying,
    getAudio: state => state.audio,
    getVolume: state => state.volume,
    getPreviousVolume: state => state.previousVolume,
    getCurrentSeconds: state => state.currentSeconds,
    getDurationSeconds: state => state.durationSeconds,
  },
  actions: {
    setLoading(loading) {
      this.loading = loading;
    },

    setCurrentTrack(track) {
      // this.isPlaying = true
      this.currentTrack = track.url
      // this.pauseTrack()
    },

    setAudioState(payload) {
      this.isPlaying = payload
    },

    initAudio() {
      this.audio = new Audio(this.currentTrack);
      this.audio.addEventListener('timeupdate', this.updateProgress);
      this.audio.addEventListener('loadeddata', this.loadMetadata )
      this.audio.addEventListener('ended', this.endedTrack )
    },

    updateProgress() {
      this.currentSeconds = this.audio.currentTime
    },

    endedTrack() {
      console.log('ended track')
      this.audio.currentTime = 0
      this.isPlaying = false
    },

    setMute() {
      this.isMute = !this.isMute;

      if (this.isMute) {
        this.previousVolume = this.volume
        this.audio.volume = 0
        this.volume = 0
      } else {
        this.volume = this.previousVolume
        this.audio.volume = this.volume
      }
    },

    setVolume(payload) {
      this.volume = payload
      this.audio.volume = payload
      this.isMute = false
    },

    setPlayback(payload) {
      this.playback = payload
      // console.log(payload)
      this.audio.currentTime = payload * this.durationSeconds / 100
    },

    loadMetadata() {
      this.durationSeconds = parseInt(this.audio.duration)
    },

    progressTrack(payload) {
      // console.log(payload[0] * this.durationSeconds / 100, this.audio.currentTime, 'payload')

      // this.audio.currentTime = payload[0] * this.durationSeconds / 100
      this.currentSeconds = payload[0] * this.durationSeconds / 100
    },

    // setTime() {
    //   this.audio.currentTime = this.currentSeconds
    // },

    pauseTrack() {
      this.isPlaying = false
      this.audio.pause();
    },

    playTrack() {
      this.isPlaying = true
      this.audio.play();     
    },

    // updateProgress() {

    // },

    // playTrack() {
    //   if (this.changingSong && this.audio) {
    //     this.audio.pause();
    //   }
    //   if (this.audio === null || this.changingSong) {
    //     this.audio = new Audio(this.currentTrack.url);
    //   }
    //   if (this.currentTrack) {
    //     if (this.isPlaying === false) {
    //       this.audio.play();
    //     } else {
    //       this.audio.pause();
    //     }
    //   }
    //   this.isPlaying = !this.isPlaying;
    //   this.changingSong = false;      
    // },

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
