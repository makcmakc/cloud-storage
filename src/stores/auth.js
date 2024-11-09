import { defineStore } from 'pinia'
import { supabase } from '@/services/supabaseClient'

const TOKEN_STORAGE_KEY = 'meme-inc-token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    async signIn({ email = '', password = '' }) {
      const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
  
      if (error) throw error
  
      this.user = user
      this.token = session.access_token

      localStorage.setItem(TOKEN_STORAGE_KEY, session.access_token)
    },

    async signInWithGitHub() {
      const { data: { user, session }, error } = await supabase.auth.signIn({
        provider: 'github',
      })

      if (error) throw error
      
      this.user = user
      this.token = session.access_token
    },

    async signOut() {
      await supabase.auth.signOut()
      this.user = null
      this.token = null
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    },

    async initUser() {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY)
      if (token) {
        const { data: { user }, error } = await supabase.auth.getUser()
      
        if (error) {
          this.signOut()
          return 
        }

        this.user = user
        this.token = token
      }
    },

    startListeningToAuthChanges() {
      supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session, 'event, session')
        if (event === 'SIGNED_IN') {
          this.user = session.user
          this.token = session.access_token
          localStorage.setItem(TOKEN_STORAGE_KEY, session.access_token)
        } else if (event === 'SIGNED_OUT') {
          this.signOut()
        } 
      })
    },
  }
})
