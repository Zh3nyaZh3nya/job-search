import { data } from "./vacancy.json";
import { vacancyTransformToCard } from "./vacancyTransformToCard";
import type { IVacancy, IVacancyCard } from "~/types";

export const vacancy_card: IVacancyCard[] = vacancyTransformToCard(data as IVacancy[], "usually")