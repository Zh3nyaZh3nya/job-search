export function generateRandomId(prefix: 'VC' | 'RM' = 'RM', length: number = 14): string {
    const chars: 'abcdef0123456789' = 'abcdef0123456789'
    let randomPart: string = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        randomPart += chars[randomIndex]
    }

    return `${prefix}${randomPart}`
}
