import { defineStore } from "pinia";
import {
    Category, City, Currency, EducationLevel,
    EmploymentType, WorkExperience, WorkSchedule
} from "~/types";
import { useApi } from "~/composables/useApi";
import { resumeTransformToCard } from "~/assets/staticData/resumeTransformToCard";
import { vacancyTransformToCard } from "~/assets/staticData/vacancyTransformToCard";
import type {
    IVacancy, IVacancyCardSmall, IResume,
    IVacancyCard, IResumeCard
} from "~/types";

interface RootState {
    vacancy: IVacancy[]
    vacancy_card: IVacancyCard[]
    resume: IResume[]
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
        vacancy: [],
        vacancy_card: [],
        resume: [],
        resume_card: [],
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
        async fetchResume() {
            try {
                const { data } = await useApi<{ resume: { data: IResume[] } }>('/api/resume', { method: 'GET', credentials: 'include' })
                const { resume } = data?.value

                this.resume = resume
                this.resume_card = resumeTransformToCard(resume, 'usually')
            } catch (e) {
                console.error(e)
                this.resume = []
                this.resume_card = []
            }
        },
        async editResume(data: IResume) {
            try {
                await useApi('/api/resume/edit', {
                    method: 'POST',
                    body: data
                })
            } catch (e) {
                console.log(e)
            }
        },
        async createResume(data: IResume) {
            try {
                await useApi('/api/resume/create', {
                    method: 'POST',
                    body: data
                })
            } catch (e) {
                console.log(e)
            }
        },
        async fetchVacancy() {
            try {
                const { data } = await useApi<{ resume: { data: IVacancy[] } }>('/api/vacancy', { method: 'GET', credentials: 'include' })
                const { vacancy } = data?.value

                this.vacancy = vacancy
                this.vacancy_card = vacancyTransformToCard(vacancy, 'usually')
            } catch (e) {
                console.error(e)
                this.vacancy = []
                this.vacancy_card = []
            }
        },
        async editVacancy(data: IVacancy) {
            try {
                await useApi('/api/vacancy/edit', {
                    method: 'POST',
                    body: data
                })
            } catch (e) {
                console.log(e)
            }
        },
        async createVacancy(data: IVacancy) {
            try {
                await useApi('/api/vacancy/create', {
                    method: 'POST',
                    body: data
                })
            } catch (e) {
                console.log(e)
            }
        },
    },
    getters: {
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
                const matchesCity = city ? item.info_resume.city === city : true;
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
