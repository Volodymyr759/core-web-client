import { ICompanyService } from "../../../types/companyService";

export interface AdminServiceFormProps {
    currentService: ICompanyService;
    closeDrawer: () => void;
}