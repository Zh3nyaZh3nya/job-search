import type { IResume, IResumeCard, IResumeCardSmall } from "~/types";

export function resumeTransformToCard(
    resumes: IResume[],
    type: "small"
): IResumeCardSmall[];
export function resumeTransformToCard(
    resumes: IResume[],
    type: "usually"
): IResumeCard[];

export function resumeTransformToCard(
    resumes: IResume[],
    type: "small" | "usually"
): IResumeCardSmall[] | IResumeCard[] {
    if (type === "small") {
        return resumes.map((resume: IResume) => ({
            id: resume.id,
            slug: resume.slug,
            title: resume.title,
            from_salary: resume.from_salary,
            currency: resume.currency,
            work_experience: resume.work_experience,
            avatar: resume.avatar,
            education_level: resume.education_level,
        })).slice(0, 4) as IResumeCardSmall[];
    } else {
        return resumes.map((resume: IResume) => ({
            id: resume.id,
            slug: resume.slug,
            title: resume.title,
            from_salary: resume.from_salary,
            currency: resume.currency,
            work_experience: resume.work_experience,
            avatar: resume.avatar,
            education_level: resume.education_level,
            category: resume.category,
            date_publish: resume.date_publish,
            city: resume.info_resume.city,
            to_salary: resume.to_salary,
        })) as IResumeCard[];
    }
}
