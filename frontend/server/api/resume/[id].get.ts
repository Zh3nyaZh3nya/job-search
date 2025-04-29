import { defineEventHandler, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
import path from 'path'

const RESUME_FILE = path.resolve('assets/staticData/resume.json')

export default defineEventHandler(async (event) => {
    try {
        const { id } = event.context.params || {}

        if (!id || typeof id !== 'string') {
            throw createError({
                statusCode: 400,
                statusMessage: 'Resume ID is required in URL'
            })
        }

        const resumeRaw = await fs.readFile(RESUME_FILE, 'utf-8')
        const parsed = JSON.parse(resumeRaw)

        const resume = parsed.data.find((item: any) => item.id === id)

        if (!resume) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Resume not found'
            })
        }

        return {
            success: true,
            resume,
        }
    } catch (error: any) {
        console.error('Failed to load resume by id:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Unable to load resume',
        })
    }
})
