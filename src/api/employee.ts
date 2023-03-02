import axios from 'axios';
import { IEmployee } from '../types/employee';
import { OrderType } from '../types/common/orderType';
import { ISearchResult } from '../types/common/searchResult';

/**
 * Get list of services
 * @param limit<number> Page size
 * @param page<number> Current page
 * @param search<string> Search text
 * @param sortField<string> Field name for sorting
 * @param order<OrderType> Sort direction: 0 - Ascending or 1 - Descending, 2 - None
 * @returns<ISearchResult> SearchResult: List of Employees and pagination options
 */
export async function getEmployeesAxios(limit: number, page: number, search: string, sortField: string, order: OrderType): Promise<ISearchResult<IEmployee>> {
    return (await axios.get(`/employee/get?limit=${limit}&page=${page}&search=${search}&sortfield=${sortField}&order=${order}`)).data;
}

