import { defineEventHandler, getRouterParam, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

const RESUME_FILE = path.resolve('assets/staticData/resume.json')

export default defineEventHandler(async (event) => {
    const idParam = getRouterParam(event, 'id')

    try {
        const resumeRaw = await fs.readFile(RESUME_FILE, 'utf-8')
        const parsed = JSON.parse(resumeRaw)

        let resumes: any[] = []

        if (Array.isArray(parsed)) {
            resumes = parsed
        } else if (parsed.data && Array.isArray(parsed.data)) {
            resumes = parsed.data
        } else {
            throw new Error('Invalid resume file structure')
        }

        const updatedResumes = resumes.filter((r: any) => String(r.id) !== String(idParam))

        const newData = Array.isArray(parsed)
            ? updatedResumes
            : { data: updatedResumes }

        await fs.writeFile(RESUME_FILE, JSON.stringify(newData, null, 2), 'utf-8')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete resume:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to delete resume'
        })
    }
})
