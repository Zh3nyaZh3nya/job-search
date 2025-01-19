import { defineStore } from "pinia";
import { vacancy_ru } from "assets/staticData/vacancy_ru";
import { vacancy_kk } from "assets/staticData/vacancy_kk";
import { vacancy_main_ru } from "assets/staticData/vacancy_main_ru";
import { vacancy_main_kk } from "assets/staticData/vacancy_main_kk";
import { resume_ru } from "assets/staticData/resume_ru";
import { resume_kk } from "assets/staticData/resume_kk";
import { resume_main_ru } from "assets/staticData/resume_main_ru";
import { resume_main_kk } from "assets/staticData/resume_main_kk";
import { vacancy_card_ru } from "assets/staticData/vacancy_card_ru";
import { vacancy_card_kk } from "assets/staticData/vacancy_card_kk";
import { WorkSchedule, EducationLevel, EmploymentType, } from "~/types";
import type { IVacancy, IVacancyCardSmall, IResume, IResumeCardSmall, IVacancyCard } from "~/types";

interface RootState {
    vacancy: IVacancy[]
    vacancy_main: IVacancyCardSmall[]
    vacancy_card: IVacancyCard[]
    resume: IResume[]
    resume_main: IResumeCardSmall[]
}

export const useStore = defineStore('index', {
    state: (): RootState => ({
        vacancy: vacancy_ru as IVacancy[],
        vacancy_main: vacancy_main_ru as IVacancyCardSmall[],
        vacancy_card: vacancy_card_ru as IVacancyCard[],
        resume: resume_ru as IResume[],
        resume_main: resume_main_ru as IResumeCardSmall[]
    }),
    actions: {
        updateStateLocale(locale: string): void {
            switch (locale) {
                case "kk":
                    this.vacancy = vacancy_kk as IVacancy[];
                    this.vacancy_main = vacancy_main_kk as IVacancyCardSmall[]
                    this.vacancy_card = vacancy_card_kk as IVacancyCard[]
                    this.resume = resume_kk as IResume[]
                    this.resume_main = resume_main_kk as IResumeCardSmall[]
                    break;
                default:
                    this.vacancy = vacancy_ru as IVacancy[];
                    this.vacancy_main = vacancy_main_ru as IVacancyCardSmall[]
                    this.vacancy_card = vacancy_card_ru as IVacancyCard[]
                    this.resume = resume_ru as IResume[]
                    this.resume_main = resume_main_ru as IResumeCardSmall[]
                    break;
            }
        }
    },
    getters: {
        GET_VACANCY: (state: RootState): IVacancy[] => {
            return state.vacancy
        },
        GET_RESUME: (state: RootState) : IResume[] => {
            return state.resume
        },
        GET_VACANCY_CARD: (state: RootState): IVacancyCard[] => {
            return state.vacancy_card
        },
        GET_VACANCY_MAIN: (state: RootState): IVacancyCardSmall[] => {
            return state.vacancy_main
        },
        GET_RESUME_MAIN: (state: RootState): IResumeCardSmall[] => {
            return state.resume_main
        }
    }
})