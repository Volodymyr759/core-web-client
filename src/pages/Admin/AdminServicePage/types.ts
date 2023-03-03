import { ICompanyService } from "../../../types/companyService";

export interface AdminServiceFormProps {
    service: ICompanyService;
    closeForm: (service: ICompanyService) => void;
    openServiceForm: boolean;
}

export interface AdminServiceTableProps {
    onEdit: (service: ICompanyService) => void;
}