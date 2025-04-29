import { defineEventHandler, getRouterParam, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

const VACANCY_FILE = path.resolve('assets/staticData/vacancy.json')

export default defineEventHandler(async (event) => {
    const idParam = getRouterParam(event, 'id')

    try {
        const vacancyRaw = await fs.readFile(VACANCY_FILE, 'utf-8')
        const parsed = JSON.parse(vacancyRaw)

        let vacancies: any[] = []

        if (Array.isArray(parsed)) {
            vacancies = parsed
        } else if (parsed.data && Array.isArray(parsed.data)) {
            vacancies = parsed.data
        } else {
            throw new Error('Invalid resume file structure')
        }

        const updatedVacancies = vacancies.filter((r: any) => String(r.id) !== String(idParam))

        const newData = Array.isArray(parsed)
            ? updatedVacancies
            : { data: updatedVacancies }

        await fs.writeFile(VACANCY_FILE, JSON.stringify(newData, null, 2), 'utf-8')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete vacancy:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to delete vacancy'
        })
    }
})
