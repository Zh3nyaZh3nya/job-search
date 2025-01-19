import { resume_ru } from "./resume_ru";
import { resumeTransformToCard } from "./resumeTransformToCard"
import type { IResumeCardSmall } from "~/types";

export const resume_main_ru: IResumeCardSmall[] = resumeTransformToCard(resume_ru, "small");
