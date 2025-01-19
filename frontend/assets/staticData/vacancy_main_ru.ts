import { vacancy_ru } from "./vacancy_ru";
import { transformToCardSmall } from "./transformToCardSmall";
import type { IVacancyCardSmall } from "~/types";

export const vacancy_main_ru: IVacancyCardSmall[] = transformToCardSmall(vacancy_ru);
