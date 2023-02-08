import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IVacancy } from "../../types/vacancy";

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	vacancy: IVacancy;
}

export interface OfficeNameIdDto {
	id: number;
	name: string;
}