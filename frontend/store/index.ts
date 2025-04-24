import { staticData } from "assets/staticData";
import { defineStore } from "pinia";
import {
    Category, City, Currency, EducationLevel,
    EmploymentType, WorkExperience, WorkSchedule
} from "~/types";
import type {
    IVacancy, IVacancyCardSmall, IResume, IResumeCardSmall,
    IVacancyCard, IResumeCard
} from "~/types";

interface RootState {
    vacancy: IVacancy[]
    vacancy_main: IVacancyCardSmall[]
    vacancy_card: IVacancyCard[]
    resume: IResume[]
    resume_main: IResumeCardSmall[]
    resume_card: IResumeCard[]
    filters: {
        city: City | null
        work_schedule: WorkSchedule[] | null
        employment: EmploymentType[] | null
        education_level: EducationLevel[] | null
        category: Category[] | null
        currency: Currency[] | null
        work_experience: WorkExperience[] | null
    }
}

export const useStore = defineStore("index", {
    state: (): RootState => ({
        vacancy: staticData.vacancy,
        vacancy_main: staticData.vacancyMain,
        vacancy_card: staticData.vacancyCard,
        resume: staticData.resume,
        resume_main: staticData.resumeMain,
        resume_card: staticData.resumeCard,
        filters: {
            city: null,
            work_schedule: null,
            employment: null,
            education_level: null,
            category: null,
            currency: null,
            work_experience: null,
        }
    }),
    actions: {
        updateStateLocale(locale: string): void {
            this.vacancy = staticData.vacancy;
            this.vacancy_main = staticData.vacancyMain;
            this.vacancy_card = staticData.vacancyCard;
            this.resume = staticData.resume;
            this.resume_main = staticData.resumeMain;
            this.resume_card = staticData.resumeCard;
        },
    },
    getters: {
        GET_VACANCY: (state: RootState): IVacancy[] => {
            return state.vacancy;
        },
        GET_VACANCY_PAGE(state): (id: number) => IVacancy | undefined {
            return (id: number) => state.vacancy.find((vacancy) => vacancy.id === id);
        },
        GET_VACANCY_CARD(state): IVacancyCard[] {
            const {
                city,
                work_schedule,
                employment,
                education_level,
                category,
                currency,
                work_experience
            } = state.filters;

            const isEmpty = (value: any) =>
                value === null || value === undefined || (Array.isArray(value) && value.length === 0);

            const noFiltersApplied =
                isEmpty(city) &&
                isEmpty(work_schedule) &&
                isEmpty(employment) &&
                isEmpty(education_level) &&
                isEmpty(category) &&
                isEmpty(currency) &&
                isEmpty(work_experience);

            if (noFiltersApplied) {
                return state.vacancy_card;
            }

            const filteredVacancies = state.vacancy.filter((item: IVacancy) => {
                const matchesCity = city ? item.city === city : true;
                const matchesWorkSchedule = work_schedule?.length
                    ? work_schedule.includes(item.info_vacancy.type_employment)
                    : true;
                const matchesEducation = education_level?.length ? education_level.includes(item.info_vacancy.education) : true;
                const matchesCategory = category?.length ? category.includes(item.category) : true;
                const matchesCurrency = currency?.length ? currency.includes(item.currency) : true;
                const matchesWorkExperience = work_experience?.length
                    ? work_experience.includes(item.info_vacancy.work_experience)
                    : true;

                return (
                    matchesCity &&
                    matchesWorkSchedule &&
                    matchesEducation &&
                    matchesCategory &&
                    matchesCurrency &&
                    matchesWorkExperience
                );
            });

            const filteredIds = new Set(filteredVacancies.map(v => v.id));

            return state.vacancy_card.filter(card => filteredIds.has(card.id));
        },
        GET_VACANCY_MAIN(state): IVacancyCardSmall[] {
            return state.vacancy_main;
        },
        GET_RESUME(state): IResume[] {
            return state.resume;
        },
        GET_RESUME_MAIN(state): IResumeCardSmall[] {
            return state.resume_main;
        },
        GET_RESUME_CARD(state): IResumeCard[] {
            const {
                city,
                work_schedule,
                employment,
                education_level,
                category,
                currency,
                work_experience
            } = state.filters;

            const isEmpty = (value: any) =>
                value === null || value === undefined || (Array.isArray(value) && value.length === 0);

            const noFiltersApplied =
                isEmpty(city) &&
                isEmpty(work_schedule) &&
                isEmpty(employment) &&
                isEmpty(education_level) &&
                isEmpty(category) &&
                isEmpty(currency) &&
                isEmpty(work_experience);

            if (noFiltersApplied) {
                return state.resume_card;
            }

            const filteredResumes = state.resume.filter((item: IResume) => {
                const matchesCity = city ? item.city === city : true;
                const matchesWorkSchedule = work_schedule?.length
                    ? item.info_resume?.conditions?.some(c => work_schedule.includes(c)) ?? false
                    : true;
                const matchesEducation = education_level?.length ? education_level.includes(item.education_level) : true;
                const matchesCategory = category?.length ? category.includes(item.category) : true;
                const matchesCurrency = currency?.length ? currency.includes(item.currency) : true;

                return (
                    matchesCity &&
                    matchesWorkSchedule &&
                    matchesEducation &&
                    matchesCategory &&
                    matchesCurrency
                );
            });

            const filteredIds = new Set(filteredResumes.map(r => r.id));

            return state.resume_card.filter(card => filteredIds.has(card.id));
        },
        GET_RESUME_PAGE(state): (id: number) => IResume | undefined {
            return (id: number) => state.resume.find((resume) => resume.id === id);
        },
        GET_SEARCH_RESULT: (state: RootState) => (type: 'job' | 'members', search: string): IResume[] | IVacancy[] | undefined => {
            const lowerSearch = search.toLowerCase();

            if (type === 'job') {
                return state.vacancy?.filter((vacancy: IVacancy) => {
                    return (
                        vacancy.title?.toLowerCase().includes(lowerSearch) ||
                        vacancy.post?.toLowerCase().includes(lowerSearch) ||
                        vacancy.company?.toLowerCase().includes(lowerSearch)
                    );
                });
            }

            if (type === 'members') {
                return state.resume?.filter((resume: IResume) => {
                    return (
                        resume.title?.toLowerCase().includes(lowerSearch)
                    );
                });
            }

            return undefined;
        },
    },
});
