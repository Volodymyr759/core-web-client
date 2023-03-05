import { IVacancy } from "../../../types/vacancy";

export interface AdminVacancyTableProps {
    onEdit: (vacancy: IVacancy) => void;
}