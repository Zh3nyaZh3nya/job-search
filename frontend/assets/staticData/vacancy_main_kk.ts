import { vacancy_kk } from "./vacancy_kk";
import { transformToCardSmall } from "./transformToCardSmall";
import type { IVacancyCardSmall } from "~/types";

export const vacancy_main_kk: IVacancyCardSmall[] = transformToCardSmall(vacancy_kk);
