import { DetailedHTMLProps, HTMLAttributes } from "react";
import { ICandidate } from "../../types/candidate";
import { IVacancy, OfficeNameIdDto } from "../../types/vacancy";

export interface VacanciesFiltersProps {
	offices: OfficeNameIdDto[];
}

export interface VacancyCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	vacancy: IVacancy;
}

export interface VacancyApplyFormProps {
	candidate: ICandidate;
	closeForm: (candidate: ICandidate) => void;
	openServiceForm: boolean;
}
