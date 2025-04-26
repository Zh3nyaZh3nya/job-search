// server/api/me.ts
import { defineEventHandler, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
import path from 'path'

const USERS_FILE = path.resolve('assets/staticData/users.json')

export default defineEventHandler(async (event) => {
    const userFromContext = event.context.user

    if (!userFromContext || !userFromContext.email) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const usersRaw = await fs.readFile(USERS_FILE, 'utf-8')
    const users = JSON.parse(usersRaw)

    const user = users.find((u: any) => u.email === userFromContext.email)

    if (!user) {
        throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    const { passwordHash, ...safeUser } = user

    return { user: safeUser }
})
