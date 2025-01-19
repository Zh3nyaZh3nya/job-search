import { vacancy_kk } from "./vacancy_kk";
import { vacancyTransformToCardSmall } from "./vacancyTransformToCardSmall";
import type { IVacancyCardSmall } from "~/types";

export const vacancy_main_kk: IVacancyCardSmall[] = vacancyTransformToCardSmall(vacancy_kk);
