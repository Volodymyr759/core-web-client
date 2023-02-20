import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IVacancy } from "../../types/vacancy";

export interface VacancyCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	vacancy: IVacancy;
}

export interface VacancyApplyFormProps {
	vacancyId: number;
	closeDrawer: () => void;
}
