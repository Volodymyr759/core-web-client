import axios from 'axios';
import { CompanyServiceStatus, ICompanyService } from '../types/companyService';
import { ISearchResult } from '../types/searchResult';
import { SortOrder } from '../types/sortOrder';

/**
 * Get list of services
 * @param limit<number> page size
 * @param page<number> current page
 * @param companyServiceStatus<CompanyServiceStatus> Possible values: 0 - Active, 1 - Disabled, 2 - All
 * @param order<SortOrder> Sort direction (ascending / descending)
 */
export async function getServicesAxios(limit: number, page: number, companyServiceStatus: CompanyServiceStatus, order: SortOrder): Promise<ISearchResult<ICompanyService>> {
    return (await axios.get(`/companyservice/get?limit=${limit}&page=${page}&companyServiceStatus=${companyServiceStatus}&order=${order}`)).data;
}

/**
 * Get's the object of service specified by identifier
 * @param id<string> identifier
 */
export async function getServiceByIdAxios(id: number): Promise<ICompanyService> {
    return (await axios.get(`/companyservice/getbyid/${id.toString()}`)).data;
}

/**
 * Creates a new company's service
 * @param service<ICompanyService> object of type ICompanyService
 * @returns<void> void
 */
export async function createServiceAxios(service: ICompanyService): Promise<void> {
    return (await axios.post("/companyservice/create", service)).data;
}