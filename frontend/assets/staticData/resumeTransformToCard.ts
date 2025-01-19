import type { IResume, IResumeCard, IResumeCardSmall } from "~/types";

export function resumeTransformToCard(
    resumes: IResume[],
    type: "small" | "usually"
): IResumeCardSmall[] | IResumeCard[] {
    return resumes.map((resume: IResume): IResumeCardSmall | IResumeCard => {
        const baseCard = {
            id: resume.id,
            slug: resume.slug,
            title: resume.title,
            from_salary: resume.from_salary,
            currency: resume.currency,
            work_experience: resume.work_experience,
            avatar: resume.avatar,
            education_level: resume.education_level,
        };

        if (type === "small") {
            return baseCard as IResumeCardSmall;
        } else {
            return {
                ...baseCard,
                category: resume.category,
                date_publish: resume.date_publish,
                city: resume.info_resume.city,
                to_salary: resume.to_salary
            } as IResumeCard;
        }
    }).slice(0, type === "small" ? 4 : resumes.length);
}
