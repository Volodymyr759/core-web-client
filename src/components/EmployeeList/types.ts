import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IEmployee } from "../../types/employee";

export interface EmployeeListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    employees: IEmployee[];
}

export interface EmployeeCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	employee: IEmployee;
}