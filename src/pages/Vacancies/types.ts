import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IVacancy, OfficeNameIdDto, VacancyTitleDto } from "../../types/vacancy";

export interface VacanciesFiltersProps {
	offices: OfficeNameIdDto[];
}

export interface VacancyCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	vacancy: IVacancy;
}

export interface VacancyApplyFormProps {
	vacancyId: number;
	closeDrawer: () => void;
}
