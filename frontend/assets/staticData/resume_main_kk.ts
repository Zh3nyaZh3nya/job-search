import { resume_kk } from "./resume_kk";
import { resumeTransformToCard } from "./resumeTransformToCard"
import type { IResumeCardSmall } from "~/types";

export const resume_main_kk: IResumeCardSmall[] = resumeTransformToCard(resume_kk, "small");
