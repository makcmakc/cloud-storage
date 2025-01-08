import { defineStore } from 'pinia'

const TOKEN_STORAGE_KEY = 'meme-inc-token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    getUser: state => state.user,
  },
  actions: {
    async signIn({ email = '', password = '' }) {
    },

    async signInWithGitHub() {
    },

    async signOut() {
    },

    async initUser() {
    },
  }
})
