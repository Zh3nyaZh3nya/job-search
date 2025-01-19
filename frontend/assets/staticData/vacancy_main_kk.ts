import { vacancy_kk } from "./vacancy_kk";
import { vacancyTransformToCard } from "./vacancyTransformToCard";
import type { IVacancyCardSmall } from "~/types";

export const vacancy_main_kk: IVacancyCardSmall[] = vacancyTransformToCard(vacancy_kk, 'small');
