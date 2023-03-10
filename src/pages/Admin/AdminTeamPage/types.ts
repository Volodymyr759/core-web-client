import { IEmployee } from "../../../types/employee";

export interface AdminEmployeeTableProps {
    onEdit: (employee: IEmployee) => void;
}

export interface AdminEmployeeFormProps {
    employee: IEmployee;
    closeForm: (service: IEmployee) => void;
    openForm: boolean;
}