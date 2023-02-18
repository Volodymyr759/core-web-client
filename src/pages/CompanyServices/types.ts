import { ICompanyService } from "../../types/companyService";

export interface ServiceListProps {
    allowLoadMore: boolean;
}

export interface ServiceCardProps {
    companyService: ICompanyService;
}