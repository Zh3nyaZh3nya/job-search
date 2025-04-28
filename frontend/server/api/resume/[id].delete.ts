import { defineEventHandler, getRouterParam, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

const RESUME_FILE = path.resolve('assets/staticData/resume.json')

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'))

    try {
        const resumeRaw = await fs.readFile(RESUME_FILE, 'utf-8')
        const parsed = JSON.parse(resumeRaw)
        const resumes = Array.isArray(parsed) ? parsed : parsed.data

        const updatedResumes = resumes.filter((r: any) => r.id !== id)

        await fs.writeFile(RESUME_FILE, JSON.stringify({ data: updatedResumes }, null, 2))

        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete resume:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to delete resume'
        })
    }
})
