import { data } from "./vacancy.json";
import { vacancyTransformToCard } from "./vacancyTransformToCard";
import type { IVacancy, IVacancyCardSmall } from "~/types";

export const vacancy_main: IVacancyCardSmall[] = vacancyTransformToCard(data as IVacancy[], 'small');
