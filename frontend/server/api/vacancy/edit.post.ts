import { defineEventHandler, readBody, getCookie, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

const VACANCY_FILE = path.resolve('assets/staticData/vacancy.json')
const JWT_SECRET = 'd9f72e3a1a62b72914a6e6c238f60f267b9d8c191ef7b23829dc65552e9272d0'

export default defineEventHandler(async (event) => {
    try {
        const token = getCookie(event, 'auth_token')
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { email: string }
        const email = decoded.email
        if (!email) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid token payload' })
        }

        const body = await readBody(event)
        if (!body || typeof body !== 'object') {
            throw createError({ statusCode: 400, statusMessage: 'Invalid body' })
        }

        const vacancyRaw = await fs.readFile(VACANCY_FILE, 'utf-8')
        const parsed = JSON.parse(vacancyRaw)
        const vacancies = parsed.data

        const vacancyIndex = vacancies.findIndex((resume: any) => resume.email === email)

        if (vacancyIndex === -1) {
            throw createError({ statusCode: 404, statusMessage: 'Resume not found' })
        }

        vacancies[vacancyIndex] = {
            ...vacancies[vacancyIndex],
            ...body,
        }

        await fs.writeFile(VACANCY_FILE, JSON.stringify({ data: vacancies }, null, 2))

        return { success: true, resume: vacancies[vacancyIndex] }
    } catch (error: any) {
        console.error('Vacancy update error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to update Vacancy'
        })
    }
})
