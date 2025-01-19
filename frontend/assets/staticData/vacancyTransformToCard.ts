import type { IVacancy, IVacancyCard, IVacancyCardSmall } from "~/types";

export function vacancyTransformToCard(
    vacancies: IVacancy[],
    type: "small" | "usually"
): IVacancyCardSmall[] | IVacancyCard[] {
    return vacancies.map((vacancy: IVacancy) => {
        const baseCard = {
            id: vacancy.id,
            slug: vacancy.slug,
            title: vacancy.title,
            post: vacancy.post,
            category: vacancy.category,
            from_salary: vacancy.from_salary,
            currency: vacancy.currency,
        };

        if (type === "small") {
            return {
                ...baseCard,
                job_format: vacancy.info_vacancy.job_format,
                education: vacancy.info_vacancy.education,
            } as IVacancyCardSmall;
        } else {
            return {
                ...baseCard,
                company: vacancy.company,
                date_publish: vacancy.date_publish,
                to_salary: vacancy.to_salary,
                city: vacancy.city,
                address: vacancy.address,
                work_experience: vacancy.info_vacancy.work_experience,
                job_format: vacancy.info_vacancy.job_format,
                education_level: vacancy.info_vacancy.education,
            } as IVacancyCard;
        }
    }).slice(0, type === "small" ? 3 : vacancies.length);
}
