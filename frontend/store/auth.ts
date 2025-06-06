import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { navigateTo } from '#app'
import type {IUserMember, IUserEmployer, IResume, IVacancy} from '~/types'

type UserType = IUserEmployer | IUserMember

interface RootState {
    user: UserType | null
    resume: IResume[]
    vacancy: IVacancy[]
}

export const useAuthStore = defineStore('auth', {
    state: (): RootState => ({
        user: null,
        resume: [],
        vacancy: []
    }),

    actions: {
        async fetchUser(): Promise<void> {
            try {
                const { data } = await useApi<{ user: UserType }>('/api/auth/user', { method: 'GET', credentials: 'include' })
                const user: RootState['user'] = data?.value?.user || null
                if (user) {
                    this.user = toRaw(user)
                }
            } catch (e) {
                console.error('User fetch error:', e)
                this.user = null
            }
        },

        async logout(): Promise<void> {
            try {
                await useApi('/api/auth/logout', { method: 'POST' })
                this.user = null

                await navigateTo('/', { redirectCode: 302 })
            } catch (e) {
                console.error('User logout error:', e)
                this.user = null
            }
        },

        async fetchUserResumes(): Promise<void> {
            try {
                const { data } = await useApi<{ resume: IResume[] }>('/api/auth/user/resume', { method: 'GET', credentials: 'include' })
                this.resume = toRaw(data.value.resume)
            } catch (e) {
                console.error('Resume fetch error:', e)
                this.resume = []
            }
        },

        async deleteUserResume(resumeId: number) {
            try {
                const { data } = await useApi(`/api/resume/${resumeId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                })

                this.resume = this.resume.filter((r: any) => r.id !== resumeId)

            } catch (e) {
                console.error('Ошибка удаления:', e)
            }
        },

        async fetchUserVacancy(): Promise<void> {
            try {
                const { data } = await useApi<{ vacancy: IVacancy[] }>('/api/auth/user/vacancy', { method: 'GET', credentials: 'include' })
                this.vacancy = toRaw(data.value.vacancy)
            } catch (e) {
                console.error('Vacancy fetch error:', e)
                this.vacancy = []
            }
        },

        async deleteUserVacancy(vacancyId: number) {
            try {
                const { data } = await useApi(`/api/vacancy/${vacancyId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                })

                this.vacancy = this.vacancy.filter((r: any) => r.id !== vacancyId)

            } catch (e) {
                console.error('Ошибка удаления:', e)
            }
        },
    },

    getters: {
        isAuthenticated: (state): boolean => !!state.user,
        userRole: (state): UserType['userType'] | null => state.user?.userType || null
    }
})
