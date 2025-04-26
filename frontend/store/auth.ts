// stores/auth.ts
import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import type { IUserMember, IUserEmployer } from "~/types";

interface RootState {
    user: IUserEmployer | IUserMember | null
    loaded: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): RootState => ({
        user: null as IUserEmployer | IUserMember | null,
        loaded: false,
    }),

    actions: {
        async fetchUser() {

            try {
                const { data } = await useApi<{ user: IUserEmployer | IUserMember }>('/api/user', { method: 'GET', credentials: "include", })
                const user: RootState['user'] = data?.value?.user || null
                if (user) {
                    this.user = toRaw(user)
                }
            } catch (e) {
                console.error('User fetch error:', e)
                this.user = null
            } finally {
                this.loaded = true
            }
        },

        async logout() {
            try {
                const { data } = await useApi('/api/auth/logout', { method: 'POST' })

                this.user = null
                this.loaded = false

            } catch (e) {
                console.error('User fetch error:', e)
                this.user = null
            } finally {
                this.loaded = true
            }
        }
    },
    getters: {
        isAuthenticated: (state: RootState) => !!state.user,
        userRole: (state: RootState) => state.user?.userType || null
    }
})
