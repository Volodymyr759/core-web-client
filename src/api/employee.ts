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

/**
 * Creates a new employee
 * @param service<IEmployee> object of type IEmployee
 * @returns<IEmployee> created employee object
 */
export async function createEmployeeAxios(employee: IEmployee): Promise<IEmployee> {
    return (await axios.post("/employee/create", employee)).data;
}

/**
 * Updates employee
 * @param service<IEmployee> object of type IEmployee
 * @returns<IEmployee> updated employee object
 */
export async function updateEmployeeAxios(employee: IEmployee): Promise<IEmployee> {
    return (await axios.put("/employee/update", employee)).data;
}

/**
 * Delete's the employee object specified by identifier
 * @param id<string> identifier
 */
export async function removeEmployeeAxios(id: number): Promise<void> {
    return await axios.delete(`/employee/delete/${id.toString()}`);
}

