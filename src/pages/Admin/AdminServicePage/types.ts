import { ICompanyService } from "../../../types/companyService";

export interface AdminServiceFormProps {
    closeDrawer: () => void;
    openServiceForm: boolean;
}

export interface AdminServiceTableProps {
    openEditForm: () => void;
}