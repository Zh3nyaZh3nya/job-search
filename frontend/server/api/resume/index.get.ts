import { defineEventHandler, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
import path from 'path'

const RESUME_FILE = path.resolve('assets/staticData/resume.json')

export default defineEventHandler(async (event) => {
    try {

        const resumeRaw = await fs.readFile(RESUME_FILE, 'utf-8')
        const parsed = JSON.parse(resumeRaw)

        const resume = parsed.data.filter((item: any) => item.active)

        return {
            success: true,
            resume: resume
        }
    } catch (error: any) {
        console.error('Failed to load resume:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to load resume data'
        })
    }
})
