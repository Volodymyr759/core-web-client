import axios from 'axios';
import { CompanyServiceStatus, ICompanyService } from '../types/companyService';
import { ISearchResult } from '../types/common/searchResult';
import { OrderType } from '../types/common/orderType';

/**
 * Get list of services
 * @param limit<number> Page size
 * @param page<number> Current page
 * @param companyServiceStatus<CompanyServiceStatus> Possible values: 0 - Active, 1 - Disabled, 2 - All
 * @param order<OrderType> Sort direction (0 - Ascending / 1 - Descending / 2 - None)
 */
export async function getServicesAxios(limit: number, page: number, companyServiceStatus: CompanyServiceStatus, order: OrderType): Promise<ISearchResult<ICompanyService>> {
    return (await axios.get(`/companyservice/get?limit=${limit}&page=${page}&companyServiceStatus=${companyServiceStatus}&order=${order}`)).data;
}

/**
 * Get's the object of service specified by identifier
 * @param id<string> Identifier
 * @returns<ICompanyService> Object of service
 */
export async function getServiceByIdAxios(id: number): Promise<ICompanyService> {
    return (await axios.get(`/companyservice/get/${id.toString()}`)).data;
}

/**
 * @param id<string> Service identifier
 * @param isActive<boolean> Service status
 */
export async function updateServiceIsActiveStatusAxios(id: number, isActive: boolean): Promise<void> {
    await axios.patch(`/companyservice/partialserviceupdate/${id}`, [{ op: "replace", path: "/isactive", value: isActive }]);
}

/**
 * Creates a new company's service
 * @param service<ICompanyService> Object of type ICompanyService
 * @returns<ICompanyService> Created service object
 */
export async function createServiceAxios(service: ICompanyService): Promise<ICompanyService> {
    return (await axios.post("/companyservice/create", service)).data;
}

/**
 * Updates company's service
 * @param service<ICompanyService> Object of type ICompanyService
 * @returns<ICompanyService> Updated service object
 */
export async function updateServiceAxios(service: ICompanyService): Promise<ICompanyService> {
    return (await axios.put("/companyservice/update", service)).data;
}

/**
 * Delete's the object of service specified by identifier
 * @param id<string> Identifier
 */
export async function removeServiceAxios(id: number): Promise<void> {
    return await axios.delete(`/companyservice/delete/${id.toString()}`);
}