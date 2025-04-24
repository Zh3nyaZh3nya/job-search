import { data } from "./resume.json";
import { resumeTransformToCard } from "./resumeTransformToCard"
import type { IResume, IResumeCardSmall } from "~/types";

export const resume_main: IResumeCardSmall[] = resumeTransformToCard(data as IResume[], "small");
