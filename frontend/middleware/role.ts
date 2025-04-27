import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware(async (to) => {
    const auth = useAuthStore()

    if (!auth.loaded) {
        await auth.fetchUser()
    }

    const roleRoutes = {
        '/member': 'member',
        '/employer': 'employer',
    } as const

    const cleanPath = getCleanPath(to.path)

    const requiredRoleEntry = Object.entries(roleRoutes).find(([prefix]) => cleanPath.startsWith(prefix))
    const requiredRole = requiredRoleEntry?.[1]

    if (requiredRole) {
        if (!auth.isAuthenticated) {
            return navigateTo('/', { redirectCode: 301 })
        }

        if (auth.userRole !== requiredRole) {
            return navigateTo('/', { redirectCode: 301 })
        }
    }
})

function getCleanPath(path: string): string {
    const parts = path.split('/')
    if (parts.length > 2 && ['kk', 'ru'].includes(parts[1])) {
        return '/' + parts.slice(2).join('/')
    }
    return path
}
