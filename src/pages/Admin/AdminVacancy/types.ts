import { ICandidateDto } from "../../../types/candidate";
import { IVacancy } from "../../../types/vacancy";

export interface AdminVacancyTableProps {
    onEdit: (vacancy: IVacancy) => void;
    onShowCandidates: (vacancy: IVacancy) => void;
}

export interface AdminVacancyFormProps {
    vacancy: IVacancy;
    closeForm: () => void;
}

export interface AdminVacancyFiltersProps {
    onAddNew: () => void;
}

export interface AdmoinVacancyCandidatesProps {
    vacancyCandidates: ICandidateDto[];
    closeForm: () => void;
}