import axios from 'axios';
import { ICompanyService } from '../types/companyService';
import { ISearchResult } from '../types/searchResult';
import { SortOrder } from '../types/sortOrder';

/**
 * Get list of services
 * @param limit<number> page size
 * @param page<number> current page
 * @param order<SortOrder> Sort direction (ascending / descending)
 */
export async function getServicesAxios(limit: number, page: number, order: SortOrder): Promise<ISearchResult<ICompanyService>> {
    return (
        await axios.get(`/companyservice/get?limit=${limit}&page=${page}&order=${order}`)).data;
}

/**
 * Get's the object of service specified by identifier
 * @param id<string> identifier
 */
export async function getServiceByIdAxios(id: number): Promise<ICompanyService> {
    return (await axios.get(`/companyservice/getbyid/${id.toString()}`)).data;
}