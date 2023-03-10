import { ICompanyService } from "../../../types/companyService";

export interface AdminServiceFiltersProps {
    onAddNew: () => void;
}

export interface AdminServiceFormProps {
    service: ICompanyService;
    closeForm: () => void;
}

export interface AdminServiceTableProps {
    onEdit: (service: ICompanyService) => void;
}