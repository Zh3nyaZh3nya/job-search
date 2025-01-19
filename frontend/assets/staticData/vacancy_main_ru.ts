import { vacancy_ru } from "./vacancy_ru";
import { vacancyTransformToCardSmall } from "./vacancyTransformToCardSmall";
import type { IVacancyCardSmall } from "~/types";

export const vacancy_main_ru: IVacancyCardSmall[] = vacancyTransformToCardSmall(vacancy_ru);
