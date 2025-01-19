import { vacancy_ru } from "./vacancy_ru";
import { vacancyTransformToCard } from "./vacancyTransformToCard";
import type { IVacancyCardSmall } from "~/types";

export const vacancy_main_ru: IVacancyCardSmall[] = vacancyTransformToCard(vacancy_ru, 'small');
