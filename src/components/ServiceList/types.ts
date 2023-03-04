import { ICompanyService } from "../../types/companyService";

export interface ServiceListProps {
    services: ICompanyService[];
}

export interface ServiceCardProps {
    service: ICompanyService;
}