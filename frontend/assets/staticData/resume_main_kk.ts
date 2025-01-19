import { resume_kk } from "./resume_kk";
import { resumeTransformToCardSmall } from "./resumeTransformToCardSmall"
import type { IResumeCardSmall } from "~/types";

export const resume_main_kk: IResumeCardSmall[] = resumeTransformToCardSmall(resume_kk);
