import { IVacancy } from "../../../types/vacancy";

export interface AdminVacancyTableProps {
    onEdit: (vacancy: IVacancy) => void;
}

export interface AdminVacancyFormProps {
    vacancy: IVacancy;
    closeForm: (vacancy: IVacancy) => void;
    openForm: boolean;
}