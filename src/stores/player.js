import { defineStore } from 'pinia'
import { useFilesStore } from '@/stores/files'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    isPlaying: false,
    currentTrackIndex: 0,
    tracks: [],
    currentTime: 0,
    duration: 0,
    volume: .5,
    repeatMode: 'none', // 'none', 'one', 'all'
    isPlayerVisible: false,
    audioElement: null,
  }),
  actions: {
    initializeAudioElement() {
      if (!this.audioElement) {
        this.audioElement = new Audio()
        this.audioElement.crossOrigin = "anonymous" // CORS
        this.audioElement.volume = this.volume

        this.audioElement.addEventListener('timeupdate', () => {
          this.currentTime = this.audioElement.currentTime
        })

        this.audioElement.addEventListener('loadedmetadata', () => {
          this.duration = this.audioElement.duration
        })

        this.audioElement.addEventListener('ended', this.handleTrackEnd)

        this.audioElement.addEventListener('error', (e) => {
          console.error('Error loading audio:', e)
          this.stop()
        })
      }
    },
    playPause() {
      if (!this.audioElement) this.initializeAudioElement()

      if (this.audioElement.paused) {
        this.audioElement.play()
        this.isPlaying = true
      } else {
        this.audioElement.pause()
        this.isPlaying = false
      }
    },
    nextTrack() {
      const filesStore = useFilesStore()
      const audioFiles = filesStore.files.filter(file => file.mimetype.startsWith('audio/'))
      const currentIndex = audioFiles.findIndex(file => file.id === this.currentTrack?.id)

      if (currentIndex < audioFiles.length - 1) {
        this.currentTrack = audioFiles[currentIndex + 1]
      } else if (this.repeatMode === 'all') {
        this.currentTrack = audioFiles[0]
      } else {
        this.stop()
        return
      }
      this.loadTrack()
    },
    prevTrack() {
      const filesStore = useFilesStore()
      const audioFiles = filesStore.files.filter(file => file.mimetype.startsWith('audio/'))
      const currentIndex = audioFiles.findIndex(file => file.id === this.currentTrack?.id)

      if (currentIndex > 0) {
        this.currentTrack = audioFiles[currentIndex - 1]
      } else if (this.repeatMode === 'all') {
        this.currentTrack = audioFiles[audioFiles.length - 1]
      } else {
        this.stop()
        return
      }
      this.loadTrack()
    },
    loadTrack() {
      if (!this.currentTrack) return
      if (!this.audioElement) this.initializeAudioElement()

      this.audioElement.src = this.currentTrack.url
      this.audioElement.play()
      this.isPlaying = true
    },
    setVolume(volume) {
      this.volume = volume
      if (this.audioElement) {
        this.audioElement.volume = volume
      }
    },
    setCurrentTime(time) {
      if (this.audioElement) {
        this.audioElement.currentTime = time
      }
    },
    toggleRepeatMode() {
      const modes = ['none', 'one', 'all']
      const currentIndex = modes.indexOf(this.repeatMode)
      this.repeatMode = modes[(currentIndex + 1) % modes.length]
    },
    handleTrackEnd() {
      if (this.repeatMode === 'one') {
        this.audioElement.currentTime = 0
        this.audioElement.play()
      } else {
        this.nextTrack()
      }
    },
    stop() {
      if (this.audioElement) {
        this.audioElement.pause()
        this.audioElement.currentTime = 0
      }
      this.isPlaying = false
      this.isPlayerVisible = false
    },
    closePlayer() {
      this.stop()
      this.isPlayerVisible = false
    },
    openPlayerById(id) {
      const filesStore = useFilesStore()
      const track = filesStore.files.find(file => file.id === id && file.mimetype.startsWith('audio/'))

      if (track) {
        this.currentTrack = track
        this.loadTrack()
        this.isPlayerVisible = true
      } else {
        console.error('Track not found')
      }
    },
  }
})
