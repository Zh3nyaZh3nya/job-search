import { defineEventHandler, readBody, setCookie, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
import path from 'path'
// @ts-ignore
import bcrypt from 'bcrypt'
// @ts-ignore
import jwt from 'jsonwebtoken'

const USERS_FILE = path.resolve('assets/staticData/users.json')
const JWT_SECRET = 'd9f72e3a1a62b72914a6e6c238f60f267b9d8c191ef7b23829dc65552e9272d0'

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event)

    if (!email || !password) {
        throw createError({ statusCode: 400, statusMessage: 'Email and password required' })
    }

    const usersRaw = await fs.readFile(USERS_FILE, 'utf-8')
    const users = JSON.parse(usersRaw)

    const user = users.find((u: any) => u.email === email)
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' })

    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 3600
    })

    const { passwordHash, ...publicUser } = user

    return { success: true, user: publicUser }
})