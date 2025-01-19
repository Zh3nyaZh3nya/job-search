import { resume_kk } from "./resume_kk";
import { resumeTransformToCard } from "./resumeTransformToCard";
import type { IResumeCard } from "~/types";

export const resume_card_kk: IResumeCard[] = resumeTransformToCard(resume_kk, "usually")