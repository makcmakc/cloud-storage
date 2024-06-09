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
      // const trackUrl = this.publicURL+track.name
      // console.log(trackUrl)

      if (this.audio && this.currentTrack !== track.url) {
        this.currentTrack = track.url
        this.audio.src = this.currentTrack
        this.audio.load()
        this.playTrack()
        return
      }

      console.log(track)

      this.currentTrack = track.url
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

    pauseTrack() {
      this.isPlaying = false
      this.audio.pause();
    },

    playTrack() {
      console.log(this.audio, 'audio')
      this.isPlaying = true
      this.audio.play();     
    },
  }
})
