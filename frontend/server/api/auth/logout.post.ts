import { defineEventHandler, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
    setCookie(event, 'auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 0, // кука истекает сразу
    })

    return {
        success: true,
        message: 'Successfully logged out'
    }
})
