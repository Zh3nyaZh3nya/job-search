import fs from 'fs'
import path from 'path'
import { defineEventHandler, readBody, createError } from 'h3'
import jwt from 'jsonwebtoken'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
    // Получаем JWT из cookie
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

    const newVacancy = await readBody(event)
    newVacancy.userEmail = user.email

    const filePath = path.resolve('assets/staticData/vacancy.json')

    let vacancies = { data: [] }
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        vacancies = JSON.parse(fileContent)
    } catch (e) {
        console.warn('vacancy.json не найден или пуст, создаю новый файл...')
    }

    vacancies.data.push(newVacancy)

    fs.writeFileSync(filePath, JSON.stringify(vacancies, null, 2), 'utf-8')

    return {
        success: true,
        total: vacancies.data.length,
        user: user.email
    }
})
