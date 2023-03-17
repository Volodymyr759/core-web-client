import { ICandidate } from "../../../types/candidate";

export interface AdminCandidateFiltersProps {
    onAddNew: () => void;
}

export interface AdminCandidateTableProps {
    onEdit: (candidate: ICandidate) => void;
}

export interface AdminCandidateFormProps {
    candidate: ICandidate;
    closeForm: () => void;
}