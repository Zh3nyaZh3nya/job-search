import { resume_ru } from "./resume_ru";
import { resumeTransformToCardSmall } from "./resumeTransformToCardSmall"
import type { IResumeCardSmall } from "~/types";

export const resume_main_ru: IResumeCardSmall[] = resumeTransformToCardSmall(resume_ru);
