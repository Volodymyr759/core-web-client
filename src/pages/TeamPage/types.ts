import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IEmployee } from "../../types/employee";

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	employee: IEmployee;
}