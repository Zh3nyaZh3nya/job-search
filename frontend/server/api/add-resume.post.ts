import fs from 'fs';
import path from 'path';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const newResume = await readBody(event);

    const filePath = path.resolve('assets/staticData/resume.json');

    // Читаем текущие данные
    let resumes = [];
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        resumes = JSON.parse(fileContent);
    } catch (e) {
        console.warn('resume.json не найден или пуст, создаю новый файл...');
    }

    // Добавляем новый объект
    resumes.data.push(newResume);

    // Записываем обратно
    fs.writeFileSync(filePath, JSON.stringify(resumes, null, 2), 'utf-8');

    return {
        success: true,
        total: resumes.length
    };
});
