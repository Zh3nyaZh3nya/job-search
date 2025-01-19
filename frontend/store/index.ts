import { vacancy_ru } from "assets/staticData/vacancy_ru";
import { vacancy_kk } from "assets/staticData/vacancy_kk";
import { vacancy_main_ru } from "assets/staticData/vacancy_main_ru";
import { vacancy_main_kk } from "assets/staticData/vacancy_main_kk";
import { WorkSchedule, EducationLevel, EmploymentType, IVacancyCardSmall } from "~/types";
import type { IVacancy } from "~/types";

interface RootState {
    vacancy: IVacancy[]
    vacancy_main: IVacancyCardSmall[]
}

export const useStore = defineStore({
    id: 'index',
    state: (): RootState => ({
        vacancy: vacancy_ru as IVacancy[],
        vacancy_main: vacancy_main_ru as IVacancyCardSmall[]
    }),
    actions: {
        updateStateLocale(locale: string): void {
            switch (locale) {
                case "kk":
                    this.vacancy = vacancy_kk as IVacancy[];
                    this.vacancy_main = vacancy_main_kk as IVacancyCardSmall[]
                    break;
                default:
                    this.vacancy = vacancy_ru as IVacancy[];
                    this.vacancy_main = vacancy_main_ru as IVacancyCardSmall[]
                    break;
            }
        }
    },
    getters: {
        GET_VACANCY_MAIN: (state: RootState): IVacancyCardSmall[] => {
            return state.vacancy_main
        }
    }
})