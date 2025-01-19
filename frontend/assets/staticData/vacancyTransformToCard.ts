import type { IVacancy, IVacancyCard, IVacancyCardSmall } from "~/types";

export function vacancyTransformToCard(
    vacancies: IVacancy[],
    type: "small"
): IVacancyCardSmall[];
export function vacancyTransformToCard(
    vacancies: IVacancy[],
    type: "usually"
): IVacancyCard[];

export function vacancyTransformToCard(
    vacancies: IVacancy[],
    type: "small" | "usually"
): IVacancyCardSmall[] | IVacancyCard[] {
    if (type === "small") {
        return vacancies.map((vacancy: IVacancy) => ({
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
    } else {
        return vacancies.map((vacancy: IVacancy) => ({
            id: vacancy.id,
            slug: vacancy.slug,
            title: vacancy.title,
            post: vacancy.post,
            category: vacancy.category,
            from_salary: vacancy.from_salary,
            currency: vacancy.currency,
            company: vacancy.company,
            date_publish: vacancy.date_publish,
            to_salary: vacancy.to_salary,
            city: vacancy.city,
            address: vacancy.address,
            work_experience: vacancy.info_vacancy.work_experience,
            job_format: vacancy.info_vacancy.job_format,
            education_level: vacancy.info_vacancy.education,
        }));
    }
}