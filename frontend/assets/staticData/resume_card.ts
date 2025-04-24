import { data } from "./resume.json";
import { resumeTransformToCard } from "./resumeTransformToCard";
import type { IResume, IResumeCard } from "~/types";

export const resume_card: IResumeCard[] = resumeTransformToCard(data as IResume[], "usually")