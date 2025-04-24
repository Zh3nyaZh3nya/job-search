import fs from 'fs';
import path from 'path';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const newVacancy = await readBody(event);

    const filePath = path.resolve('assets/staticData/vacancy.json');

    // Читаем текущие данные
    let vacancies = [];
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        vacancies = JSON.parse(fileContent);
    } catch (e) {
        console.warn('resume.json не найден или пуст, создаю новый файл...');
    }

    // Добавляем новый объект
    vacancies.data.push(newVacancy);

    // Записываем обратно
    fs.writeFileSync(filePath, JSON.stringify(vacancies, null, 2), 'utf-8');

    return {
        success: true,
        total: vacancies.length
    };
});
