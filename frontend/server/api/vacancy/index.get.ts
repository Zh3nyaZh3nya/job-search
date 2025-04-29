import { defineEventHandler, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
import path from 'path'

const VACANCY_FILE = path.resolve('assets/staticData/vacancy.json')

export default defineEventHandler(async (event) => {
    try {

        const vacancyRaw = await fs.readFile(VACANCY_FILE, 'utf-8')
        const parsed = JSON.parse(vacancyRaw)

        const vacancy = parsed.data.filter((item: any) => item.active)

        return {
            success: true,
            vacancy: vacancy
        }
    } catch (error: any) {
        console.error('Failed to load vacancy:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to load vacancy data'
        })
    }
})
