import { defineEventHandler, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
import path from 'path'

const VACANCY_FILE = path.resolve('assets/staticData/vacancy.json')

export default defineEventHandler(async (event) => {
    try {
        const { id } = event.context.params || {}

        if (!id || typeof id !== 'string') {
            throw createError({
                statusCode: 400,
                statusMessage: 'vacancy ID is required in URL'
            })
        }

        const vacancyRaw = await fs.readFile(VACANCY_FILE, 'utf-8')
        const parsed = JSON.parse(vacancyRaw)

        const vacancy = parsed.data.find((item: any) => item.id === id)

        if (!vacancy) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Resume not found'
            })
        }

        return {
            success: true,
            vacancy,
        }
    } catch (error: any) {
        console.error('Failed to load vacancy by id:', error)
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Unable to load vacancy',
        })
    }
})
