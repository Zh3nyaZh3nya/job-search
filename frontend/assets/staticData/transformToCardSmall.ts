import { IVacancy, IVacancyCardSmall } from "~/types";

export function transformToCardSmall(vacancies: IVacancy[]): IVacancyCardSmall[] {
    return vacancies.map((vacancy: IVacancy) :IVacancyCardSmall => ({
        id: vacancy.id,
        slug: vacancy.slug,
        title: vacancy.title,
        post: vacancy.post,
        category: vacancy.category,
        from_salary: vacancy.from_salary,
        currency: vacancy.currency,
        job_format: vacancy.info_vacancy.job_format,
        education: vacancy.info_vacancy.education,
    })).slice(0, 3);
}