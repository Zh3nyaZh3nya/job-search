import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import type { IUserMember, IUserEmployer, IResume } from '~/types'

type UserType = IUserEmployer | IUserMember

interface RootState {
    user: UserType | null
    loaded: boolean
    resume: IResume[]
}

export const useAuthStore = defineStore('auth', {
    state: (): RootState => ({
        user: null,
        loaded: false,
        resume: []
    }),

    actions: {
        async fetchUser(): Promise<void> {
            try {
                const { data } = await useApi<{ user: UserType }>('/api/user', { method: 'GET', credentials: 'include' })
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

        async logout(): Promise<void> {
            try {
                await useApi('/api/auth/logout', { method: 'POST' })
                this.user = null
                this.loaded = false
            } catch (e) {
                console.error('User logout error:', e)
                this.user = null
            } finally {
                this.loaded = true
            }
        },

        async fetchUserResumes(): Promise<void> {
            try {
                const { data } = await useApi<{ resume: IResume }>('/api/resume-user', { method: 'GET', credentials: 'include' })
                this.resume = toRaw(data.value.resume)
            } catch (e) {
                console.error('Resume fetch error:', e)
                this.resume = []
            } finally {
                this.loaded = true
            }
        }
    },

    getters: {
        isAuthenticated: (state): boolean => !!state.user,
        userRole: (state): UserType['userType'] | null => state.user?.userType || null
    }
})
