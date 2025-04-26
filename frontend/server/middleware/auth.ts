import { defineEventHandler, getCookie } from 'h3'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'd9f72e3a1a62b72914a6e6c238f60f267b9d8c191ef7b23829dc65552e9272d0'

export default defineEventHandler((event) => {
    const token = getCookie(event, 'auth_token')
    if (!token) return

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        event.context.user = decoded
    } catch {
    }
})
