import type { IResume, IResumeCardSmall } from "~/types";

export function resumeTransformToCardSmall(resumes: IResume[]): IResumeCardSmall[] {
    return resumes.map((resume: IResume) :IResumeCardSmall => ({
        id: resume.id,
        slug: resume.slug,
        title: resume.title,
        from_salary: resume.from_salary,
        currency: resume.currency,
        work_experience: resume.work_experience,
        avatar: resume.avatar,
        education_level: resume.education_level
    })).slice(0, 4);
}