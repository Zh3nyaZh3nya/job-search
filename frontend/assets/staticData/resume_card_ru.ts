import { resume_ru } from "./resume_ru";
import { resumeTransformToCard } from "./resumeTransformToCard";
import type { IResumeCard } from "~/types";

export const resume_card_ru: IResumeCard[] = resumeTransformToCard(resume_ru, "usually")