import { setCookie, defineEventHandler, readBody, getQuery, createError } from 'h3'
import { promises as fs } from 'fs'
// @ts-ignore
import path from 'path'
// @ts-ignore
import bcrypt from 'bcrypt'
// @ts-ignore
import jwt from 'jsonwebtoken'

const USERS_FILE = path.resolve('assets/staticData/users.json')
const JWT_SECRET = 'd9f72e3a1a62b72914a6e6c238f60f267b9d8c191ef7b23829dc65552e9272d0'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const userType = query.type // "member" or "employer"

    if (userType !== 'member' && userType !== 'employer') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Query param "type" must be either "member" or "employer"',
        })
    }

    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required',
        })
    }

    const usersRaw = await fs.readFile(USERS_FILE, 'utf-8')
    const users = JSON.parse(usersRaw)

    const exists = users.find((u: any) => u.email === email)
    if (exists) {
        throw createError({ statusCode: 409, statusMessage: 'User already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    let newUser: any = {
        email,
        passwordHash,
        notifications: [],
    }

    if (userType === 'member') {
        const { name, last_name, gender, age } = body
        if (!name || !last_name || !gender || age == null) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing member fields: name, last_name, gender, age',
            })
        }

        newUser = {
            ...newUser,
            id_user: new Date(),
            name,
            userType,
            last_name,
            gender,
            age,
        }
    } else if (userType === 'employer') {
        const { company, address } = body
        if (!company || !address) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing employer fields: company, address',
            })
        }

        newUser = {
            ...newUser,
            id_user: new Date(),
            userType,
            company,
            address,
        }
    }

    users.push(newUser)
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))

    const token = jwt.sign(
        { email: newUser.email, type: userType },
        JWT_SECRET,
        { expiresIn: '1h' }
    )

    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        maxAge: 3600,
    })

    return {
        success: true,
        message: `User of type "${userType}" registered and authorized successfully`,
        token,
        user: newUser
    }
})