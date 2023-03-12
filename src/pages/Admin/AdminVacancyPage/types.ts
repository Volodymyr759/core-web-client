import { IVacancy } from "../../../types/vacancy";

export interface AdminVacancyTableProps {
    onEdit: (vacancy: IVacancy) => void;
}

export interface AdminVacancyFormProps {
    vacancy: IVacancy;
    closeForm: () => void;
}

export interface AdminVacancyFiltersProps {
    onAddNew: () => void;
}