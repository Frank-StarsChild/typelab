import { defineStore } from 'pinia'

// Pinia User Store 结构遵循 SPEC.md：
// {
//   session: null | SupabaseSession,
//   user: null | { id: string, email: string }
// }
export const useUserStore = defineStore('user', {
  state: () => ({
    session: null,
    user: null,
  }),
  actions: {
    setSession(session) {
      this.session = session
      this.user = session?.user
        ? {
            id: session.user.id,
            email: session.user.email,
          }
        : null
    },
    clearSession() {
      this.session = null
      this.user = null
    },
  },
})
