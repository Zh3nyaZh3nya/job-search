import { defineEventHandler, getQuery, createError } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const { type, search } = getQuery(event)

    if (!type || !search || typeof type !== 'string' || typeof search !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Query parameters "type" and "search" are required',
        })
    }

    const lowerSearch = search.toLowerCase()

    if (type === 'job') {
        const filePath = path.resolve('assets/staticData/vacancy.json')
        const raw = await fs.readFile(filePath, 'utf-8')
        const parsed = JSON.parse(raw)

        const result = parsed.data?.filter((vacancy: any) => {
            return (
                vacancy.title?.toLowerCase().includes(lowerSearch) ||
                vacancy.post?.toLowerCase().includes(lowerSearch) ||
                vacancy.company?.toLowerCase().includes(lowerSearch)
            )
        })

        return { success: true, type, result }
    }

    if (type === 'members') {
        const filePath = path.resolve('assets/staticData/resume.json')
        const raw = await fs.readFile(filePath, 'utf-8')
        const parsed = JSON.parse(raw)

        const result = parsed.data?.filter((resume: any) => {
            return resume.title?.toLowerCase().includes(lowerSearch)
        })

        return { success: true, type, result }
    }

    throw createError({
        statusCode: 400,
        statusMessage: 'Invalid type: must be "job" or "members"',
    })
})
