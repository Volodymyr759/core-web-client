import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IEmployee } from "../../types/employee";

export interface EmployeeListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    employees: IEmployee[];
}
