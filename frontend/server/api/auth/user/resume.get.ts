import { defineEventHandler, getCookie, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
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

        let decoded: any
        try {
            decoded = jwt.verify(token, JWT_SECRET)
        } catch (error) {
            throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
        }

        const email = decoded.email
        if (!email) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid token payload' })
        }

        const resumeRaw = await fs.readFile(RESUME_FILE, 'utf-8')
        const resumes = JSON.parse(resumeRaw)

        const userResumes = resumes.data.filter((resume: any) => resume.email === email)

        if (!userResumes) {
            throw createError({ statusCode: 404, statusMessage: 'Resume not found' })
        }

        return {
            success: true,
            resume: userResumes
        }
    } catch (error: any) {
        console.error('Failed to load resume:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to load resume data'
        })
    }
})
