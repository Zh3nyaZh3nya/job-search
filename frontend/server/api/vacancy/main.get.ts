import { defineEventHandler, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
import path from 'path'
// @ts-ignore
import { vacancyTransformToCard } from "assets/staticData/vacancyTransformToCard";

const VACANCY_FILE = path.resolve('assets/staticData/vacancy.json')

export default defineEventHandler(async (event) => {
    try {
        const vacancyRaw = await fs.readFile(VACANCY_FILE, 'utf-8')
        const parsed = JSON.parse(vacancyRaw)

        const vacancy = parsed.data.filter((item: any) => item.active)

        const vacancyResumes = [...vacancy]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)

        const vacancyMainPage = vacancyTransformToCard(vacancyResumes, 'small')

        return {
            success: true,
            data: vacancyMainPage,
        }
    } catch (error: any) {
        console.error('Failed to load vacancy:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Unable to load vacancy data'
        })
    }
})
