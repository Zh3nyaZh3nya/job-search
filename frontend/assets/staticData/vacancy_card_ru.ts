import { vacancy_ru } from "./vacancy_ru";
import { vacancyTransformToCard } from "./vacancyTransformToCard";
import type { IVacancyCard } from "~/types";

export const vacancy_card_ru: IVacancyCard[] = vacancyTransformToCard(vacancy_ru, "usually")