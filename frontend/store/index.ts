import { staticData } from "assets/staticData";
import { defineStore } from "pinia";
import type { IVacancy, IVacancyCardSmall, IResume, IResumeCardSmall, IVacancyCard, IResumeCard } from "~/types";

interface RootState {
    vacancy: IVacancy[]
    vacancy_main: IVacancyCardSmall[]
    vacancy_card: IVacancyCard[]
    resume: IResume[]
    resume_main: IResumeCardSmall[]
    resume_card: IResumeCard[]
}

export const useStore = defineStore("index", {
    state: (): RootState => ({
        vacancy: staticData.vacancy.ru,
        vacancy_main: staticData.vacancyMain.ru,
        vacancy_card: staticData.vacancyCard.ru,
        resume: staticData.resume.ru,
        resume_main: staticData.resumeMain.ru,
        resume_card: staticData.resumeCard.ru,
    }),
    actions: {
        updateStateLocale(locale: string): void {
            const lang: "kk" | "ru" = locale === "kk" ? "kk" : "ru";
            this.vacancy = staticData.vacancy[lang];
            this.vacancy_main = staticData.vacancyMain[lang];
            this.vacancy_card = staticData.vacancyCard[lang];
            this.resume = staticData.resume[lang];
            this.resume_main = staticData.resumeMain[lang];
            this.resume_card = staticData.resumeCard[lang];
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
            return state.vacancy_card;
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
            return state.resume_card;
        },
        GET_RESUME_PAGE(state): (id: number) => IResume {
            return (id: number) => state.resume[id];
        },
    },
});
