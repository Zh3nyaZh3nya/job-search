import { defineEventHandler, readBody, getCookie, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

const RESUME_FILE = path.resolve('assets/staticData/resume.json')
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

        const resumeRaw = await fs.readFile(RESUME_FILE, 'utf-8')
        const parsed = JSON.parse(resumeRaw)
        const resumes = parsed.data

        const resumeIndex = resumes.findIndex((resume: any) => resume.email === email)

        if (resumeIndex === -1) {
            throw createError({ statusCode: 404, statusMessage: 'Resume not found' })
        }

        resumes[resumeIndex] = {
            ...resumes[resumeIndex],
            ...body,
        }

        await fs.writeFile(RESUME_FILE, JSON.stringify({ data: resumes }, null, 2))

        return { success: true, resume: resumes[resumeIndex] }
    } catch (error: any) {
        console.error('Resume update error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to update resume'
        })
    }
})
