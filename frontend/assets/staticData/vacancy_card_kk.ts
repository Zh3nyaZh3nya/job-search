import { vacancy_kk } from "./vacancy_kk";
import { vacancyTransformToCard } from "./vacancyTransformToCard";
import type { IVacancyCard } from "~/types";

export const vacancy_card_kk: IVacancyCard[] = vacancyTransformToCard(vacancy_kk, "usually")