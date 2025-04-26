import fs from 'fs'
import path from 'path'
import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    // Получаем токен из cookie
    const token = event.node.req.headers.cookie
        ?.split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1]

    if (!token) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized (no token)' })
    }

    let user
    try {
        const config = useRuntimeConfig()
        user = jwt.verify(token, config.JWT_SECRET)
    } catch (err) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
    }

    const newResume = await readBody(event)
    newResume.userEmail = user.email // ← привязываем к пользователю

    const filePath = path.resolve('assets/staticData/resume.json')

    let resumes = { data: [] }
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        resumes = JSON.parse(fileContent)
    } catch (e) {
        console.warn('resume.json не найден или пуст, создаю новый файл...')
    }

    resumes.data.push(newResume)

    fs.writeFileSync(filePath, JSON.stringify(resumes, null, 2), 'utf-8')

    return {
        success: true,
        total: resumes.data.length,
        user: user.email
    }
})
