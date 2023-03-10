import { ICandidate } from "../../../types/candidate";

export interface AdminCandidateFiltersProps {
    onAddNew: (candidate: ICandidate) => void;
}

export interface AdminCandidateTableProps {
    onEdit: (candidate: ICandidate) => void;
}

export interface AdminCandidateFormProps {
    candidate: ICandidate;
    closeForm: (candidate: ICandidate) => void;
    openForm: boolean;
}