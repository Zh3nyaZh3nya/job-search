import { data as vacancy } from "./vacancy.json";
import { vacancy_main } from "./vacancy_main";
import { vacancy_card } from "./vacancy_card";
import { data as resume } from "./resume.json";
import { resume_card } from "assets/staticData/resume_card";
import { resume_main } from "assets/staticData/resume_main";
import type { IResume, IResumeCard, IResumeCardSmall, IVacancy } from "~/types";

export const staticData = {
    vacancy: vacancy as IVacancy[],
    vacancyMain: vacancy_main,
    vacancyCard: vacancy_card,
    resume: resume as IResume[],
    resumeMain: resume_main as IResumeCardSmall[],
    resumeCard: resume_card as IResumeCard[],
};
