export function slugify(text: string): string {
    return text
        .toString()
        .normalize('NFKD')                 // нормализует юникод (убирает ударения)
        .replace(/[\u0300-\u036F]/g, '')    // удаляет диакритические знаки
        .replace(/[^a-zA-Z0-9а-яА-Я\s-]/g, '') // убирает лишние символы (оставляет буквы, цифры, дефисы)
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')               // пробелы в дефисы
        .replace(/-+/g, '-')                // несколько дефисов в один
}
